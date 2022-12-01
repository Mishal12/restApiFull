const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../user/userModel");

exports.hashing = async (request, response, next) => {
  try {
    request.body.password = await bcrypt.hash(request.body.password, 10);
    next();
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
};

exports.comparePass = async (request, response, next) => {
  try {
    if (request.authUser) {
      next();
    } else {
      request.user = await User.findOne({ username: request.body.username });
      if (
        request.user &&
        (await bcrypt.compare(request.body.password, request.user.password))
      ) {
        console.log("username and password exits");
        next();
      } else {
        throw new Error("incorrect username or password");
      }
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
};

exports.tokenCheck = async (request, response, next) => {
  try {
    if (request.header("Authorization")) {
      const token = request.header("Authorization").replace("Bearer ", "");
      const decodedToken = await jwt.verify(token, process.env.SECRET);
      const user = await User.findById(decodedToken._id);
      request.authUser = user;
      console.log("token passed");
    } else {
      console.log("no headers passed");
    }
    next();
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
};
