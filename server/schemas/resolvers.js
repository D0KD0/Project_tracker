const { User  } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
const Project = require('../models/Project');
const Task = require('../models/Task');
const mongoose = require("mongoose");
const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('projects').populate({path: "projects", populate: {path: "members", model: "User"}});
        },
        user: async (parent, { email }) => {
            return User.findOne({ email }).populate('projects');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('projects').populate({path: "projects", populate: {path: "members", model: "User"}});
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        project: async (parent, {projectId}) => {
            return Project.findOne({_id: projectId}).populate({path: "members", model: "User"}).populate({path: "tasks", populate: {path: "assignees", model: "User"}});
        },
        projects: async () => {
            return Project.find().populate('tasks').populate({path: "members", model: "User"});
        },
    },

    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addProject: async (parent, {name, members, budget}, context) => {
            if (context.user) {
                console.log(members)
                members = members.map(member => {return mongoose.Types.ObjectId(member)})
                const project = await Project.create({name, members, budget});

                members.map(async (member)  =>  {
                    return await User.findOneAndUpdate(
                        {_id: member},
                        {$push: {projects: project._id}},
                        {new: true}
                    ).populate('projects').populate({path: "projects", populate: {path: "members", model: "User"}});
                })
                const user = await User.findOne(
                    {_id: context.user._id}
                ).populate('projects').populate({path: "projects", populate: {path: "members", model: "User"}});
                return user;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        removeProject: async (parent, {projectId}, context) => {
            if (context.user) {
                const project = await Project.findOneAndDelete({
                    _id: projectId,
                  });

                const user = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {projects: project._id}},
                    {new: true}
                );

                return user;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addTask: async (parent, {projectId, name, description, assignees, status, dueDate, impact, budget}, context) => {
            if (context.user) {
                assignees = assignees.map(assignee => {return mongoose.Types.ObjectId(assignee)})
                const task = await Task.create({name, description, assignees, status, dueDate, impact, budget});
                console.log(task)
                const project = await Project.findOneAndUpdate(
                    {_id: projectId},
                    {$push: {tasks: task._id}},
                    {new: true}
                ).populate('tasks').populate({path: "tasks", populate: {path: "assignees", model: "User"}});

                return project;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        removeTask: async (parent, {projectId, tasksId}, context) => {
            if (context.user) {
                const task = await Task.findOneAndDelete({
                    _id: tasksId,
                  });

                const project = await Project.findOneAndUpdate(
                    {_id: projectId},
                    {$pull: {tasks: task._id}},
                    {new: true}
                );

                return project;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
    }   
}

module.exports = resolvers;