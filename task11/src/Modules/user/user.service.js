import { ENYCRPTION_KEY } from "../../../config/config.service.js";
import { TokenEnums } from "../../Common/Enums/token.enums.js";
import { decrptionData } from "../../Common/Security/encrpt.js";
import {
  generateSignature,
  getSignature,
} from "../../Common/Security/token.js";

import * as DBRepo from "../../DB/db.respository.js";
import UserModel from "../../DB/Models/User.model.js";
export async function renewToken(userDate) {
  const { accessSignature } = getSignature(userDate.role);
  const newAccess = generateSignature({ sub: userDate._id }, accessSignature, {
    audience: [userDate.role, TokenEnums.Access],
    expiresIn: 15 * 60,
  });
  return newAccess;
}
export async function uploadProfilePic(userId, file) {
  const result = await DBRepo.updateOne({
    model: UserModel,
    filter: {
      _id: userId,
    },
    data: {
      profilePic: file.finalPath,
    },
  });
  return result;
}
export async function uploadCoverPic(userId, files) {
  const finalPath = files.map((file) => {
    return file.finalPath;
  });

  const result = await DBRepo.updateOne({
    model: UserModel,
    filter: {
      _id: userId,
    },
    data: {
      coverPics: finalPath,
    },
  });
  return result;
}
export async function getAnotherUserProfile(profileID) {
  const result = await DBRepo.findById(
    UserModel,
    profileID,
    "-password -role -confirmPassword -__v -updatedAt -createdAt",
  );
 result.phone= decrptionData(result.phone,ENYCRPTION_KEY)
  return result
}
