import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
const handleDBOpen = () => {
  console.log("✅ Connected to DB");
};
const handleDBError = (error) => {
  console.log("❌ DB Error", Error);
};

db.on("error", handleDBError);
db.once("open", handleDBOpen);
