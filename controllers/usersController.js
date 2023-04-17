const express = require("express");

const { User, registerSchema } = require("../models/usersSchema");   //done


// handle user registration
const signUp = async (req, res) => {
  try {
    // validate the user input
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // check if the email is already taken
    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) {
      return res.status(400).send("Email already registered");
    }

    const user = new User({
      name: value.name,
      email: value.email,
      password: value.password,
      address: value.address,
      
    });
  
    await user.save();

    res.send(`User successfully registered`);
    // res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

const signIn = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    res.send(`User successfully signed in Successfully`);

  }catch (err) {
    res.status(400).send({
      error: "Create user first",
    });
  }
}



module.exports = { signUp ,signIn };
