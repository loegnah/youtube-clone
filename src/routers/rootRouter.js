import express from "express";
import { join, login } from "../controllers/userController";
import { home, searchVideo } from "../controllers/videoController";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.get("/join", join);
rootRouter.get("/login", login);
rootRouter.route("/search").get(searchVideo);

export default rootRouter;
