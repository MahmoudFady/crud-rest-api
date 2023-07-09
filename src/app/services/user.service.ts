import path from "path";
import userModel from "../models/user.model";
import ApiError from "../utils/error.util";
import fs from "fs";
const updateImage = async (id: string, imagePath: string) => {
  const data = await userModel
    .findByIdAndUpdate(
      id,
      {
        $set: { image: imagePath },
      },
      { new: true }
    )
    .select("image");
  if (!data) throw new ApiError("user does not exist", 404);
  fs.unlinkSync(
    path.join(__dirname, "../../uploads/users", path.basename(data.image))
  );
  return data;
};
export { updateImage };
