import "dotenv/config";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import * as fs from "fs";
import * as path from "path";
import ffmpeg from "fluent-ffmpeg";
import { s3 } from "../config/s3/s3.config";
import crypto from "crypto";

// Set ffmpeg path
ffmpeg.setFfmpegPath("/usr/local/bin/ffmpeg");

export interface S3Params {
  Bucket: string;
  Key: string;
  Body: any;
  ContentType: any;
}

export const FFmpegTranscoder = async (file: any) => {
  try {
    console.log("Starting script");
    console.time("req_time");

    const randomName = (bytes = 32) =>
      crypto.randomBytes(bytes).toString("hex");
    const fileName = randomName();
    const directoryPath = "./input/";
    const filePath = path.join(directoryPath, `${fileName}.mp4`);

    // ensure the directory exists
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    // saving the file 
    fs.writeFile(filePath, file, async (err) => {
      if (err) {
        console.error("Error saving file:", err);
        throw err;
      }
      console.log("File saved successfully:", filePath);

      try {
        await transcodeWithFFmpeg(fileName, filePath);
      } catch (error) {
        console.error("Error transcoding with FFmpeg:", error);
      }
    });
  } catch (e: any) {
    console.log(e);
  }
};

const transcodeWithFFmpeg = async (fileName: string, filePath: string) => {
  const directoryPath = `output/hls/${fileName}`;
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  // resolutions..
  const resolutions = [
    {
      resolution: "320x180",
      videoBitrate: "500k",
      audioBitrate: "64k",
    },
    {
      resolution: "854x480",
      videoBitrate: "1000k",
      audioBitrate: "128k",
    },
    {
      resolution: "1280x720",
      videoBitrate: "2500k",
      audioBitrate: "192k",
    },
  ];


  const variantPlaylists: { resolution: string; outputFileName: string }[] = [];

  for (const { resolution, videoBitrate, audioBitrate } of resolutions) {
    console.log(`HLS conversion starting for ${resolution}`);
    const outputFileName = `${fileName}_${resolution}.m3u8`;
    const segmentFileName = `${fileName}_${resolution}_%03d.ts`;

    await new Promise<void>((resolve, reject) => {
      ffmpeg(filePath)
        .outputOptions([
          `-c:v h264`,
          `-b:v ${videoBitrate}`,
          `-c:a aac`,
          `-b:a ${audioBitrate}`,
          `-vf scale=${resolution}`,
          `-f hls`,
          `-hls_time 10`,
          `-hls_list_size 0`,
          `-hls_segment_filename ${directoryPath}/${segmentFileName}`,
        ])
        .output(`${directoryPath}/${outputFileName}`)
        .on("end", () => resolve())
        .on("error", (err) => reject(err))
        .run();
    });
    const variantPlaylist = {
      resolution,
      outputFileName,
    };
    variantPlaylists.push(variantPlaylist);
    console.log(`HLS conversion done for ${resolution}`);
  }
  console.log(`HLS master m3u8 playlist generating`);

  let masterPlaylist = variantPlaylists
    .map((variantPlaylist) => {
      const { resolution, outputFileName } = variantPlaylist;
      const bandwidth =
        resolution === "320x180"
          ? 676800
          : resolution === "854x480"
          ? 1353600
          : 3230400;
      return `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${resolution}\n${outputFileName}`;
    })
    .join("\n");
  masterPlaylist = `#EXTM3U\n` + masterPlaylist;

  const masterPlaylistFileName = `${fileName}_master.m3u8`;

  const masterPlaylistPath = `output/hls/${masterPlaylistFileName}`;
  fs.writeFileSync(masterPlaylistPath, masterPlaylist);
  console.log(`HLS master m3u8 playlist generated`);


  console.log(`Deleting locally uploaded mp4 file`);
  fs.unlinkSync(filePath);
  console.log(`Deleted locally uploaded mp4 file`);
};
