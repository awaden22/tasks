import { TokenEnums } from "../../Common/Enums/token.enums.js";
import { generateSignature, getSignature } from "../../Common/Security/token.js";

export async function renewToken(userDate) {
  const {accessSignature}= getSignature(userDate.role)
  const newAccess = generateSignature({ sub: userDate._id }, accessSignature, {
    audience: [userDate.role, TokenEnums.Access],
    expiresIn: 15 * 60,
  });
  return newAccess;
}
