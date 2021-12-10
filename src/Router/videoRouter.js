import express from "express";

const videoRouter = express.Router();

const handleWatch = (req, res) => {
  return res.send("watch video");
};
videoRouter.get("/", (req, res) => {
  return res.send("video");
});
videoRouter.get("/watch", handleWatch);

export default videoRouter;
