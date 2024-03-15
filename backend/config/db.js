import mongoose from "mongoose";
import DB_NAME from "../constant.js";
const connectDB = () => {
  const connectionInstance = mongoose
    .connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
    .then((data) => {
      console.log(`Database connect on port ${process.env.MONGODB_URI}`);
    });
};

export default connectDB;
