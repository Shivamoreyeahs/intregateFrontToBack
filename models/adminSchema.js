const mongoose = require("mongoose");
const Joi = require("joi");
require("dotenv").config();

// define the user schema
const adminSchema = new mongoose.Schema(
  {
    adminName: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    adminEmail: {
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
    }
   
  },
  { timestamps: true }
);

// create the User model
const Admin = mongoose.model("Admin", adminSchema);

// define the Joi validation schema for user registration
const adminRegisterSchema = Joi.object(
  {
    adminName: Joi.string().min(3).max(50).required(),
    adminEmail: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
    confirmPassword: Joi.string()
      .valid(Joi.ref("password"))
      .messages({ "any.only": "password does not match" })
      .required(),
      // confirm_password:Joi.string().equal(Joi.ref('password')).messages({'any.only': 'password does not match' }).required(),
  },
  adminSchema.set("timestamps", true)
);


module.exports = { Admin, adminRegisterSchema}; 
