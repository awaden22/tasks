import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: function () {
        return !this.attachment;
      },
    },
    attachment: {
      type: [String],
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  {
    timestamps: true,
  },
);
export const MessageModel = mongoose.model("Message", messageSchema);
