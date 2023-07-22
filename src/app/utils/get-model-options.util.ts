import { Model } from "mongoose";

export default <T extends Document | any>(model: Model<T>) => {
  const schemaPaths = model.schema.paths;
  const attributes = [];
  for (const path in schemaPaths) {
    if (
      schemaPaths.hasOwnProperty(path) &&
      path != "_id" &&
      path !== "__v" &&
      path !== "image"
    ) {
      attributes.push({
        name: path,
        type: schemaPaths[path].instance.toLocaleLowerCase(),
        options: model.schema.obj[path]?.options,
      });
    }
  }
  return attributes;
};
