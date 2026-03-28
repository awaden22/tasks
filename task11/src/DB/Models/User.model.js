import mongoose from "mongoose";
import {
  GenderEnums,
  Provider,
  RoleEnums,
} from "../../Common/Enums/enums.user.js";


const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: () => {
        this.provider == Provider.System;
      },
    },
    
    provider: {
      type: String,
      enums: Object.values(Provider),
      default: Provider.System,
    },

    DOB: Date,
    phone: String,
    profilePic: String,
    coverPics:[String],
    Gender: {
      type: String,
      enums: Object.values(GenderEnums),
      default: GenderEnums.Male,
    },
    role: {
      type: String,
      enums: Object.values(RoleEnums),
      default: RoleEnums.User,
    },
    confirmPassword: {
      type: String,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
export const UserModel = mongoose.model("user", userSchema);
export default UserModel;
