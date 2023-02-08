import mongoose from "mongoose";

const Project = mongoose.model('Project', mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    paragraph: {type: Array, required: true},
    namedEntityTags: {type: Object, required: true},
    eventEntityTags: {type: Object, required: true},
    namedEntityAppearances: {type: Array, required: true},
    eventEntityAppearances: {type: Array, required: true},
    filename: {type: String, required: true},
    namedEntities: {type: Object, required: false, default: {}},
    eventEntities: {type: Object, required: false, default: {}},
    relations: {type: Object, required: false, default: {}},
}, {minimize: false}));

export default Project;