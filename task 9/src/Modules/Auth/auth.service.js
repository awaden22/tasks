import { compare, hash } from "bcrypt";
import { conflictException, notFoundException } from "../../Common/Response/response.js";
import UserModel from "../../DB/Models/User.model.js";
import * as DBRepo from "../../DB/db.respository.js";

import { compareOperation, hashOperation } from "../../Common/Security/hash.js";

export async function signup(bodydata) {
  const { email, password } = bodydata;
  const isEmail = await DBRepo.findOne(UserModel, { email });
  if (isEmail) {
    return conflictException("Email already exist");
  }
  bodydata.password = await hashOperation({plainText:password})
  const user = await DBRepo.create(UserModel, bodydata);
  return user;
}

export async function login(bodydata) {
    const{email ,password } = bodydata
    const user = await DBRepo.findOne(UserModel ,{email})
    if(!user){
        return notFoundException ("invalid email")
    }
    const isPassword  = await compareOperation({plainValue:password ,hashValue:user.password})
    if(!isPassword){
        return notFoundException ("invalid password")
    }
    return "logged in successfully"
}