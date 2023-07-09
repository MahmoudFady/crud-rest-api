import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
  image: {
    type: String,
    default: "",
  },
  idImage: { type: Buffer },
  firstName: {
    type: String,
  },
  middleName: {
    type: String,
  },
  thirdName: {
    type: String,
  },
  email: {
    type: String,
    unique: [true, "email must be unique"],
  },
  ssn: {
    type: Number,
    unique: true,
  },
  birthDate: {
    type: Date,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
});
export default mongoose.model("User", userSchema);
