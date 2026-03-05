import mongoose from "mongoose";

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
      require: true,
    },
    DOB: Date,
    phone: String,
    Gender: {
      type: String,
      enums: ["male", "female"],
      default: "male",
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
export const UserModel = mongoose.model("user", userSchema);
export default UserModel;