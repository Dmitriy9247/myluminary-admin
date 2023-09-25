import { S3 } from "aws-sdk";
const accessKeyId = "jumxzt4o5iprgrgmoztsbnenumcq";
const secretAccessKey = "jzvw6qlkckywznmpyi5xgnedtimfxmnkaqcjb7wrth6ghplrnwhxa";
const endpoint = "https://gateway.storjshare.io";

export const s3 = new S3({
  accessKeyId,
  secretAccessKey,
  endpoint,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
  connectTimeout: 0,
  httpOptions: { timeout: 0 }
});

export const storjImage = (bucket, object) => {
    const params = {
        Bucket: bucket,
        Key: object
    }
    const url = s3.getSignedUrl("getObject", params)
    return url
}
