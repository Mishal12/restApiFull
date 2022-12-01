const { Router } = require("express");
const userRouter = Router();
const {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("./userController");

const { hashing, comparePass, tokenCheck } = require("../middleware");

userRouter.post("/createUser", hashing, createUser);
userRouter.post("/loginUser", tokenCheck, comparePass, loginUser);
userRouter.get("/readUser", readUser);
userRouter.put("/updateUser", updateUser);
userRouter.delete("/deleteUser", deleteUser);

module.exports = userRouter;
