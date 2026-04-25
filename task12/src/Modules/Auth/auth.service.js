import {
  badRequestException,
  conflictException,
  notFoundException,
} from "../../Common/Response/response.js";
import UserModel from "../../DB/Models/User.model.js";

import * as DBRepo from "../../DB/db.respository.js";
import CryptoJS from "crypto-js";

import { compareOperation, hashOperation } from "../../Common/Security/hash.js";
import { Client_Token_ID, ENYCRPTION_KEY } from "../../../config/config.service.js";
import { OAuth2Client } from "google-auth-library";

import {
  generateAceessTokenAndRefreshToken,

} from "../../Common/Security/token.js";
import { Provider } from "../../Common/Enums/enums.user.js";

export async function signup(bodydata) {
  const { email, password } = bodydata;
  const isEmail = await DBRepo.findOne(UserModel, { email });
  if (isEmail) {
    return conflictException("Email already exist");
  }
  bodydata.password = await hashOperation({ plainText: password });
  bodydata.phone = CryptoJS.AES.encrypt(
    bodydata.phone,
    ENYCRPTION_KEY,
  ).toString();
  const user = await DBRepo.create(UserModel, bodydata);
  return user;
}

export async function login(bodydata) {
  const { email, password } = bodydata;
  const user = await DBRepo.findOne(UserModel, { email });
  if (!user) {
    return notFoundException("invalid email");
  }
  const isPassword = await compareOperation({
    plainValue: password,
    hashValue: user.password,
  });
  if (!isPassword) {
    return notFoundException("invalid password");
  }
  return generateAceessTokenAndRefreshToken(user)
}
async function verifyGoogleToken(idToken) {
  const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({
    idToken,
    audience:
      Client_Token_ID,
  });
  const payload = ticket.getPayload();

  console.log(payload);
  return payload;
}
export async function loginWithGoogle(bodydata) {
  const { idToken } = bodydata;
  const payloadGoogleToken = await verifyGoogleToken(idToken);
  const user = await DBRepo.findOne(UserModel, {
    email: payloadGoogleToken.email,
    provider: Provider.Google,
  });
  if (!user) {
    return signupWithGoogle({idToken});
  }
  
  return { status: 200, result: await generateAceessTokenAndRefreshToken(user) };
}
export async function signupWithGoogle(bodyData) {
  const { idToken } = bodyData;
  const payloadGoogleToken = await verifyGoogleToken(idToken);
  if (!payloadGoogleToken.email_verified) {
    return badRequestException("Email must be verified");
  }
  const user = await DBRepo.findOne(UserModel, {
    email: payloadGoogleToken.email,
  });
  if (user) {
    if ((user.provider === Provider.System)) {
      return badRequestException("account already exist");
    }
    return{status:200,result:await loginWithGoogle({idToken})}
  }
  const newUser = await DBRepo.create(UserModel, {
    userName: payloadGoogleToken.name,
    email: payloadGoogleToken.email,
    provider: Provider.Google,
    confirmEmail: true,
    profilePic: payloadGoogleToken.picture,
  });

 
  return { status: 201, result: await generateAceessTokenAndRefreshToken(newUser) };
}
