import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional for Google users
  provider: { type: String, required: true }, // 'credentials' or 'google'
  providerId: { type: String }, // only for Google
  role: {type: String, default: "user", required: true},
  image: { type: String },      // optional profile picture
}, { timestamps: true });


export default mongoose.models.User || mongoose.model("User", UserSchema);;