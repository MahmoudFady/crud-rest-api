import mongoose from "mongoose";

export default class DbConnectionFactory {
  static connect(uri: string) {
    return mongoose.connect(uri);
  }
}
