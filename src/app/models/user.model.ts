import mongoose, { Schema } from "mongoose";
import validator from "validator";
const userSchema = new Schema({
  image: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
    required: true,
    minLength: [3, "first name must more than 2 chars"],
    maxLength: [8, "first name must less than 9 chars"],
    pattern: /^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/,
  },
  middleName: {
    type: String,
    required: true,
    minLength: [3, "middle name must more than 2 chars"],
    maxLength: [8, "middle name must less than 9 chars"],
    pattern: /^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/,
  },
  thirdName: {
    type: String,
    required: true,
    minLength: [3, "third must more than 2 chars"],
    maxLength: [8, "third must less than 9 chars"],
    pattern: /^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value: string) => {
      if (!validator.isEmail(value)) {
        throw "invalid email";
      }
    },
  },
  ssn: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: (value: number) => {
        return new String(value).length === 14;
      },
      message: ({ value: number }) => "ssn must be 14 digit",
    },
  },
  birthDate: {
    type: Date,
    required: true,
    validate: {
      validator: (value: Date) => {
        return value < new Date();
      },
      message: ({ value: number }) => "birth date must be older",
    },
  },
  address: {
    type: String,
    required: true,
    minLength: [10, "address must be more than 9 chars"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female"],
  },
});
export default mongoose.model("User", userSchema);
