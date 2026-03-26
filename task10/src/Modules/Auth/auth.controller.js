import express from "express";
import * as authSercice from "./auth.service.js";
import { successResponse } from "../../Common/Response/response.js";
import { validation } from "./auth.validation.js";
import { loginSchema, signupSchema } from "../../../middleware/validation.middleware.js";
import upload from "../../Common/Multer/multer.config.js";

const authRouter = express.Router();

authRouter.post("/signup",upload.single("profilePic"),validation(signupSchema),async (req, res) => {
console.log(req.file);

  const result = await authSercice.signup(req.vbody);
  return successResponse({ res, statusCode: 201, data: result });
});
authRouter.post("/signup/gmail", async (req, res) => {
  const {status,result} = await authSercice.signupWithGoogle(req.body);
  return successResponse({ res, statusCode: status, data: result });
});
authRouter.post("/login",validation(loginSchema), async (req, res) => {
  const result = await authSercice.login(req.body);
  return successResponse({res ,  data: result });
});
export default authRouter;
