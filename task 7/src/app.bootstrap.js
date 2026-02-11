import express from "express";


import { NODE_ENV, SERVER_PORT } from "../config/config.service.js";
import { testdbconnection } from "./DB/Modules/connection.js";
import { bookRouter } from "./Modules/books/book.controller.js";

import authorRouter from "./Modules/authors/author.controller.js";
import logRouter from "./Modules/logs/log.controller.js";

async function bootstrap() {
  const app = express();
  const port = SERVER_PORT;
  await testdbconnection();

  app.use(express.json());


  app.use("/collection", bookRouter)
  app.use("/author", authorRouter)
  app.use("/log", logRouter)

  app.use((error, req, res, next) => {
    return NODE_ENV == "dev"
      ? res.status(error.cause?.statusCode ?? 500).json({
          errMsg: error.message,
          error,
          stack: error.stack,
        })
      : res
          .status(error.cause?.statusCode ?? 500)
          .json({ errMsg: error.message || "something went wrong" });
  });

  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}

export default bootstrap;
