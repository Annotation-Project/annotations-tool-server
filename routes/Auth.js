import {Router} from "express";
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const router = Router();

router.post('/signup', async (req, res) => {
    const {name, email, password} = req.body;
    if (!name) res.status(400).send("Name is required!");
    if (!email) res.status(400).send("Email is required!");
    if (!password) res.status(400).send("Password is required!");
    if (await User.findOne({email: email})) res.status(400).send("User already exist! Please login.");

    User.create({
        name: name,
        email: email.toLowerCase(),
        password: await bcrypt.hash(password, await bcrypt.genSalt(10))
    }).then(user => {
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_TOKEN, { expiresIn: "10d" });
        res.status(200).json({token: token, user: user});
    }).catch(err => res.status(400).send(err.message));
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    if (!email) res.status(400).send("Email is required!");
    if (!password) res.status(400).send("Password is required!");

    User.findOne({email: email}).then(user => {
        bcrypt.compare(password, user.password).then(result => {
            if (result) {
                const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_TOKEN, { expiresIn: "10d" });
                res.status(200).json({token: token, user: user});
            } else res.status(400).send("Wrong password!")
        }).catch(err => res.status(400).send(err.message));
    }).catch(err => res.status(400).send("User not found! Please register."));
});

router.post('/token-login', async (req, res) => {
    const {token} = req.body;
    jwt.verify(token, process.env.JWT_TOKEN, (err, tokenDetails) => {
        if (err) res.status(440).send("Session Expired. Please Log In Again.");
        User.findById(tokenDetails.userId).then(user => {
            const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_TOKEN, { expiresIn: "10d" });
            res.status(200).json({token: token, user: user});
        }).catch(err => res.status(400).send(err.message));
    });
});

export default router;
