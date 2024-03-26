import mongoose, {  Model, Schema } from "mongoose";
import "dotenv/config";
import { Status, Transcoder } from "../transcoder.entities";



const transcoderSchema: Schema<Transcoder> = new mongoose.Schema(
  {
    fileName: {
      type: String,
    },
    status: {
        type: String,
        enum: ["Transcoding", "Subtitle generating", "Uploaded successfully", "Error occured"],
        default: Status.transcoding
    },
    videoUrl: {
        type: String
    },
    subtitleUrl: {
        type: String,
    },
    instructorId: {
        type:String,
        required: true
    }

  },
  {
    timestamps: true,
  }
);


const TranscoderModel: Model<Transcoder> = mongoose.model("Transcoder", transcoderSchema);
export default TranscoderModel;
