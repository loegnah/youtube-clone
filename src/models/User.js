import mongoose from "mongooes";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  location: { type: String },
});

const User = userSchema.model("User", userSchema);
export default User;
