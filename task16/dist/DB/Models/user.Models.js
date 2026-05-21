import { Schema, model, connect } from 'mongoose';
import { GenderEnum, ProivderEnum, RoleEnum } from '../../common/enums/user.enums.js';
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: function () {
            return this.Provide == ProivderEnum.System;
        },
    },
    confirmEmail: {
        type: Boolean,
        default: false,
    },
    age: Number,
    gender: {
        type: Number,
        enum: GenderEnum,
        default: GenderEnum.Male,
    },
    profilePics: String,
    coverPics: [String],
    Provide: {
        type: Number,
        enum: ProivderEnum,
        default: ProivderEnum.System,
    },
    phone: String,
    role: {
        type: Number,
        enum: RoleEnum,
        default: RoleEnum.User,
    },
    changeCreditTime: Date,
});
const userModel = model('User', userSchema);
export default userModel;
