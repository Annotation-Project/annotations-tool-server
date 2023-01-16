import express from "express";
import {config} from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import Auth from "./routes/Auth.js";
import Projects from "./routes/Projects.js";

config();
const app = express();

mongoose.connect(process.env.DB_URL, { useNewUrlParser:true, useUnifiedTopology: true }, (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log("Connected")
    }
})

app.use(cors());
app.use(express.json({limit: '500mb'}));
app.use(express.urlencoded({ extended: true }));

app.use('/auth', Auth);
app.use('/projects', Projects);

app.listen(process.env.PORT, () => {
    console.log('Server running on port ' + process.env.PORT)
});