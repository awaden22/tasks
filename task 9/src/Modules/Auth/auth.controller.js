import express from "express";
import * as authSercice from "./auth.service.js";
import { successResponse } from "../../Common/Response/response.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const result = await authSercice.signup(req.body);
  return successResponse({ res, statusCode: 201, data: result });
});
authRouter.post("/login", async (req, res) => {
  const result = await authSercice.login(req.body);
  return successResponse({res ,  data: result });
});
export default authRouter;
