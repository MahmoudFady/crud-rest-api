import mongoose, { Schema } from "mongoose";
const urlSchema = new Schema({
  url: String, // users/:id
  methods: Array, // ['get' , 'post']
  parent: { type: Schema.Types.ObjectId, ref: "Url", default: null }, // users
  roles: Array, // ['admin' , 'hr']
  frontEndRole: Boolean,
  name: String,
  assetType: {
    type: String,
    enum: ["reset", "business"],
  },
});

export default mongoose.model("Url", urlSchema);
// name => app assets
