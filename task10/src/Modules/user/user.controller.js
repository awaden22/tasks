import express from "express";
import * as userSercice from "./user.service.js";
import { successResponse } from "../../Common/Response/response.js";
import { authentication } from "../../../middleware/authentication.middleware.js";

import { TokenEnums } from "../../Common/Enums/token.enums.js";
import { authorization } from "../../../middleware/authorization.middleware.js";
import { RoleEnums } from "../../Common/Enums/enums.user.js";

const userRouter = express.Router();

userRouter.get("/", authentication(),authorization([RoleEnums.Admin]),async (req, res) => {
  
  
  return successResponse({ res, statusCode: 201, data: req.user });
})
userRouter.post("/renewtoken",authentication(TokenEnums.Refresh),async(req,res)=>{
  const result= await userSercice.renewToken(req.user);
  return successResponse({ res, statusCode: 201, data: result });
})
export default userRouter;
