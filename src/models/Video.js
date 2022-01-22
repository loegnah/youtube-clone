import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  hashtags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
});

videoSchema.static("formatHashtag", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => word.trim())
    .map((word) => {
      return word[0] === "#" ? word : `#${word}`;
    });
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
