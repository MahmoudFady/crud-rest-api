import mongoose, { Schema } from "mongoose";
import fieldGenratorBusiness from "../business/field-genrator.business";
const userSchema = new Schema({
  image: {
    type: String,
    options: fieldGenratorBusiness("profile image", {
      placehoalder: "",
      controlType: "file",
    }),
  },
  firstName: {
    type: String,
    options: fieldGenratorBusiness("first name", {
      placehoalder: "ex : mahmoud",
    }),
  },
  middleName: {
    type: String,
    options: fieldGenratorBusiness("middle name", {
      placehoalder: "ex : fady",
    }),
  },
  thirdName: {
    type: String,
    options: fieldGenratorBusiness("third name", {
      placehoalder: "ex : ameen",
    }),
  },
  email: {
    type: String,
    unique: [true, "email must be unique"],
    options: fieldGenratorBusiness("user email", {
      placehoalder: "ex : xyz@ex.com",
      controlType: "email",
    }),
  },
  ssn: {
    type: Number,
    unique: true,
    options: fieldGenratorBusiness("national id", {
      placehoalder: "ex : 12345678912345",
      controlType: "number",
      validation: { digitsCount: 14 },
    }),
  },
  birthDate: {
    type: Date,
    options: fieldGenratorBusiness("birth date", {
      placehoalder: "ex : 20/5/2023",
      controlType: "date",
    }),
  },
  address: {
    type: String,
    options: fieldGenratorBusiness("address", {
      placehoalder: "ex : abasia , cairo , egypt",
    }),
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    options: fieldGenratorBusiness("gender", {
      placehoalder: "ex : male",
      controlType: "radio",
      values: ["male", "female"],
    }),
  },
});
export default mongoose.model("User", userSchema);
