import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: [{ type: String }],
  description: [{ type: String }],
  createdAt: [{ type: Date }],
  hashtags: [{ type: String }],
  meta: {
    views: [{ type: Number }],
    rating: [{ type: Number }],
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
