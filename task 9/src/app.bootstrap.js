import express from "express";
import authRouter from "./Modules/Auth/auth.controller.js";

import {  SERVER_PORT } from "../config/config.service.js";
import { globalErrorResponse } from "./Common/Response/response.js";
import { testDBConnection } from "./DB/connection.js";

async function bootstrap() {
  const app = express();
  const port = SERVER_PORT;
  
  await testDBConnection();       // 1️⃣ نتأكد إن الـ DB شغالة
  app.use(express.json());        // 2️⃣ Middleware لتحويل JSON من body

  app.use("/auth", authRouter);   // 3️⃣ الراوتر

  app.use(globalErrorResponse);   // 4️⃣ Middleware العام للأخطاء

  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}

export default bootstrap;
