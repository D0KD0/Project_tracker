const { Schema, model } = require('mongoose');


const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    budget:
    {
        type: Number,

    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
},
    // set this to use virtual below
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const Project = model('Project', projectSchema);

module.exports = Project;


