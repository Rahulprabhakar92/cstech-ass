const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const User = new Schema({
    email: String,
    password: String,
    agents: [{ type: ObjectId, ref: "Agent" }]
});

const Agent = new Schema({
    firstname: String,
    email: {type: String,required:true},
    mobileNumber:{type: String,required:true},
    password: String,
    tasks: [{ type: ObjectId, ref: "Task" }],
    createdBy: [{ type: ObjectId, ref: "User" }]
});

const Task = new Schema({
    FirstName: String,
    phone: Number,
    notes: String,
    assignedTo: [{ type: ObjectId, ref: "Agent" }]
});

const UserModel = mongoose.model('user', User);
const AgentModel = mongoose.model('agent', Agent);
const TaskModel = mongoose.model('task', Task);

const JWT_SECRET="SECRET"
const MONGODB_URL="mongodb+srv://gprahul100:Dellintel@4455@cluster0.6za9n.mongodb.net/"


module.exports = {
    UserModel,
    AgentModel,
    TaskModel,
    JWT_SECRET,
    MONGODB_URL
};