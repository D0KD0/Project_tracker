const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        },
        creator:
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        assignee: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        status: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        dueDate: {
            type: Date,
        },
        impact: {
            type: String,
        },
        budget: {
            type: Number,
        }

    },
    // set this to use virtual below
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const Task = model('Task', taskSchema);

module.exports = Task;


