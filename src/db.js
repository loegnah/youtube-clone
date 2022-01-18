import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube");

const db = mongoose.connection;
const handleDBOpen = () => {
  console.log("✅ Connected to DB");
};
const handleDBError = (error) => {
  console.log("❌ DB Error", Error);
};

db.on("error", handleDBError);
db.once("open", handleDBOpen);
