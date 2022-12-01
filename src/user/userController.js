const { create } = require("./userModel");
const User = require("./userModel");
const jwt = require("jsonwebtoken");

exports.createUser = async (request, response) => {
  try {
    const newUser = await User.create(request.body);
    response.status(201).send({ user: newUser.username });
  } catch (error) {
    console.log(error);
    response.error(500).send({ error: error.message });
  }
};

exports.readUser = async (request, response) => {
  try {
    const users = await User.find({});
    response.status(201).send({ user: users });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

exports.updateUser = async (request, response) => {
  try {
    await User.updateOne(
      { username: request.body.username },
      { [request.body.key]: request.body.value }
    );
    response.status(200).send({ message: "updated" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

exports.deleteUser = async (request, response) => {
  try {
    await User.deleteOne({ username: request.body.username });
    response.status(200).send({ message: "deleted" });
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

exports.loginUser = async (request, response) => {
  try {
    if (request.authUser) {
      response.status(200).send({ username: request.authUser.username });
    } else {
      const user = await User.findOne({ username: request.body.username });
      const token = await jwt.sign({ _id: user._id }, process.env.SECRET);
      response.status(200).send({ username: user.username, token });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: error.message });
  }
};

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzg3N2JhMzM1Y2VhNjVlMDk2OTc1NGUiLCJpYXQiOjE2Njk4MjUwMjN9.vp3IQ5AZ5Xu1qodJf8adOD4zfW4o23cyw1zPPaCTd70"
