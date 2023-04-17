const express = require("express");

const { Admin, adminRegisterSchema } = require("../models/adminSchema");   //done


// handle user registration
const adminSignUp = async (req, res) => {
  try {
    // validate the user input
    const { error, value } = adminRegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // check if the email is already taken
    const existingAdmin = await Admin.findOne({ email: value.email });
    if (existingAdmin) {
      return res.status(400).send("Admin Email already registered");
    }

    const admin = new Admin({
        adminName: value.adminName,
        adminEmail: value.adminEmail,
        password: value.password
    });
  
    await admin.save();

    res.send(`Admin successfully registered`);
    
    // res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

const adminSignIn = async (req, res) => {
  try {
    const admin = await Admin.findOne({
        adminEmail: req.body.adminEmail,
      password: req.body.password,
    });
    res.send(`Admin successfully signed in Successfully`);
    console.log(admin);
  }catch (err) {
    res.status(400).send({
      error: "Create Admin first",
    });
  }
}



module.exports = { adminSignUp,adminSignIn };
