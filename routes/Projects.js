import {Router} from "express";
import Project from "../models/Project.js";
import jwt from "jsonwebtoken";

const router = Router();

router.post('/all', async (req, res) => {
    const {token} = req.body;
    jwt.verify(token, process.env.JWT_TOKEN, (err, tokenDetails) => {
        if (err) res.status(440).send("Session Expired. Please Log In Again.");
        Project.find({userId: tokenDetails.userId}).then(value => {
            res.status(200).json(value);
        }).catch(err => res.status(400).send(err.message));
    });
});

router.post('/add', async (req, res) => {
    const {token, project} = req.body;
    jwt.verify(token, process.env.JWT_TOKEN, (err, tokenDetails) => {
        if (err) res.status(440).send("Session Expired. Please Log In Again.");
        Project.create({...project, userId: tokenDetails.userId}).then(value => {
            res.status(200).json(value);
        }).catch(err => res.status(400).send(err.message));
    });
});

router.post('/:id', async (req, res) => {
    const {token} = req.body;
    jwt.verify(token, process.env.JWT_TOKEN, (err) => {
        if (err) res.status(440).send("Session Expired. Please Log In Again.");
        Project.findById(req.params.id).then(value => {
            res.status(200).json(value);
        }).catch(err => res.status(400).send(err.message));
    });
});

router.patch('/update/:id', async (req, res) => {
    const {token, project} = req.body;
    jwt.verify(token, process.env.JWT_TOKEN, (err) => {
        if (err) res.status(440).send("Session Expired. Please Log In Again.");
        Project.findByIdAndUpdate(req.params.id, project, {new: true}).then(value => {
            res.status(200).json(value);
        }).catch(err => res.status(400).send(err.message));
    });
});

router.delete('/delete/:id', async (req, res) => {
    const {token} = req.body;
    jwt.verify(token, process.env.JWT_TOKEN, (err) => {
        if (err) res.status(440).send("Session Expired. Please Log In Again.");
        Project.findByIdAndDelete(req.params.id).then(value => {
            res.status(200).json(value);
        }).catch(err => res.status(400).send(err.message));
    });
});

export default router;
