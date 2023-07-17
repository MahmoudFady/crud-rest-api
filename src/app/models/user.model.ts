import mongoose, { Schema } from "mongoose";
import * as modelValidation from "./validation";
const userSchema = new Schema({
  image: {
    type: String,
  },
  firstName: {
    type: String,
    options: modelValidation.stringValidation("first name"),
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
    options: modelValidation.stringValidation("user email"),
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
