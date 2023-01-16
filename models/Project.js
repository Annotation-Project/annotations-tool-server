import mongoose from "mongoose";

const Project = mongoose.model('Project', mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    paragraph: {type: Array, required: true},
    tags: {type: Object, required: true},
    appearances: {type: Array, required: true},
    filename: {type: String, required: true},
    words: {type: Object, required: false, default: {}},
    relations: {type: Object, required: false, default: {}},
}, {minimize: false}));

export default Project;