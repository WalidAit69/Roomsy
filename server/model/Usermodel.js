import mongoose, { Schema } from "mongoose";


export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide unique Email"],
      unique: [true, "Email Exist"],
    },
    password: {
      type: String,
      required: [true, "Please provide Password"],
      unique: false,
    },
    fullname: { type: String, required: true },
    phone: { type: String, required: true , unique: [true, "Number Exist"],},
    bio: { type: String, required: false },
    location: { type: String, required: true },
    profilepic: { type: String , required: false},
    job: { type: String, required: false },
    lang: { type: String, required: false },
    host: { type: Boolean },
    Superhost: { type: Boolean },
    likedPosts: [{ type: Schema.Types.ObjectId, ref: "Places" }],
  },
  { timestamps: true }
);

export default mongoose.model("Users", UserSchema);
