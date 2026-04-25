import express from "express";
import authRouter from "./Modules/Auth/auth.controller.js";

import { SERVER_PORT } from "../config/config.service.js";
import { globalErrorResponse } from "./Common/Response/response.js";
import { testDBConnection } from "./DB/connection.js";
import userRouter from "./Modules/user/user.controller.js";
import path from "path";
import cors from "cors";
import { testRedisConnection } from "./DB/redis.connection.js";

async function bootstrap() {
  const app = express();
  const port = SERVER_PORT;

  await testDBConnection();
  await testRedisConnection();

  app.use(cors());
  app.use(express.json());
  app.use("/uploads", express.static(path.resolve("./uploads")));
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use(globalErrorResponse);
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}

export default bootstrap;
