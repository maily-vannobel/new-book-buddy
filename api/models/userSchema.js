const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    favorites: [{ type: mongoose.SchemaTypes.ObjectId, ref: "books" }],
    rewards: [{ type: mongoose.SchemaTypes.ObjectId, ref: "rewards" }],
});

const User = mongoose.model("users", userSchema);

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports = { User, loginSchema, registerSchema };