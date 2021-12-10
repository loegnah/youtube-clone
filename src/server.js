import express from "express";
import morgan from "morgan";

import globalRouter from "./Router/globalRouter";
import userRouter from "./Router/userRouter";
import videoRouter from "./Router/videoRouter";

const PORT = 4000;
const app = express();
const logger = morgan("dev");

app.use(logger);
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

const handleListen = () => {
  console.log(`Server is Connected : http://localhost:${PORT}`);
};
app.listen(PORT, handleListen);
