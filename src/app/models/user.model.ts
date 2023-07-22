import mongoose, { Schema } from "mongoose";
import optionsGeneratorUtil from "../utils/options-genrator.util";
const userSchema = new Schema({
  image: {
    type: String,
    options: optionsGeneratorUtil("profile image", {
      placehoalder: "user image",
      controlType: "file",
    }),
  },
  firstName: {
    type: String,
    options: optionsGeneratorUtil("first name", {
      placehoalder: "ex : mahmoud",
      validation: {
        min: 5,
        max: 10,
      },
    }),
  },
  middleName: {
    type: String,
    options: optionsGeneratorUtil("middle name", {
      placehoalder: "ex : fady",
      validation: {
        min: 5,
        max: 10,
      },
    }),
  },
  thirdName: {
    type: String,
    options: optionsGeneratorUtil("third name", {
      placehoalder: "ex : ameen",
      validation: {
        min: 2,
        max: 10,
      },
    }),
  },
  email: {
    type: String,
    unique: true,
    options: optionsGeneratorUtil("user email", {
      placehoalder: "ex : xyz@ex.com",
      controlType: "email",
    }),
  },
  ssn: {
    type: Number,
    unique: true,
    validate: {
      validator: function (val: number) {
        return new String(val).length == 14;
      },
      message: ({ value }) => `${value} isn't valid!`,
    },
    options: optionsGeneratorUtil("national id", {
      placehoalder: "ex : 12345678912345",
      controlType: "number",
      validation: { length: 14 },
    }),
  },
  birthDate: {
    type: Date,
    options: optionsGeneratorUtil("birth date", {
      placehoalder: "ex : 20/5/2023",
      controlType: "date",
    }),
  },
  address: {
    type: String,
    options: optionsGeneratorUtil("address", {
      placehoalder: "ex : abasia , cairo , egypt",
      validation: { min: 8 },
    }),
  },
  gender: {
    type: String,
    options: optionsGeneratorUtil("gender", {
      placehoalder: "ex : male",
      controlType: "radio",
      values: ["male", "female"],
      validation: {
        valid: ["male", "female"],
      },
    }),
  },
});
export default mongoose.model("User", userSchema);
