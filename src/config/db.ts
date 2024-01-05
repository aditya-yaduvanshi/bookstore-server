import mongoose from "mongoose";

const DB_URI = process.env.DB_URI || "";

const connectDb = () => {
  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log("Database connection established!");
    })
    .catch((err) => {
      console.log("Database connection failed: ", err);
      console.log("Exiting!");
      process.exit(1);
    });
};

export default connectDb;
