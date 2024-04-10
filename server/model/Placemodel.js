import mongoose, { Schema } from "mongoose";

export const PlaceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    images: { type: [String], required: true },
    link: { type: String },
    type: { type: String, required: true },
    bedrooms: Number,
    bathrooms: Number,
    livingRooms: Number,
    kitchens: Number,
    perks: [String],
    extrainfo: { type: String, required: false },
    userNumber: { type: String, required: true },
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
    rating: Number,
    likedBy: [{ type: Schema.Types.ObjectId, ref: "Users" }],
    owner: { type: Schema.Types.ObjectId, ref: "Users" },
    reviews: [
      {
        comment: { type: String },
        rating: { type: Number },
        userId: { type: Schema.Types.ObjectId, ref: "Users" },
        userName: String,
        userPhoto: String,
        createdAt: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Places", PlaceSchema);
