import express from "express";

const userRouter = express.Router();

const handleHome = (req, res) => {
  return res.send("user");
};

userRouter.get("/", handleHome);

export default userRouter;
