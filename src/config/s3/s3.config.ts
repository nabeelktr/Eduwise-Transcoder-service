
import { S3Client } from '@aws-sdk/client-s3';
import 'dotenv/config'


const bucketRegion = process.env.S3_BUCKET_REGION || "";
const accessKey = process.env.ACCESS_KEY_ID || "";
const secret = process.env.SECRET_ACCESS_KEY || "";

export const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secret,
  },
  region: bucketRegion,
});