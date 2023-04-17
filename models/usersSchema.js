const mongoose = require("mongoose");
const Joi = require("joi");
require("dotenv").config();

// define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
    address: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

// create the User model
const User = mongoose.model("User", userSchema);

// define the Joi validation schema for user registration
const registerSchema = Joi.object(
  {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .messages({ "any.only": "password does not match" })
      .required(),
      // confirm_password:Joi.string().equal(Joi.ref('password')).messages({'any.only': 'password does not match' }).required(),
    address: Joi.string(),
    isVerified: Joi.boolean(),
  },
  userSchema.set("timestamps", true)
);


module.exports = { User, registerSchema}; 
