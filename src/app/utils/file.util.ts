import fs from "fs";
import { Request } from "express";
const createDir = (dirPath: string) => {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
};
const getUploadedFilePath = (req: Request, dir: string) =>
  req.protocol +
  "://" +
  req.get("host") +
  `/uploads/${dir}/` +
  req.file.filename;
export { createDir, getUploadedFilePath };
