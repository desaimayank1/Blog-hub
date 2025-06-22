const { Router } = require("express");
const { S3Client, PutObjectCommand,DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { ensureAuth } = require("../middleware/auth");
const {ensureCreator} =require("../middleware/user");
require('dotenv').config()

const { v4: uuid } = require("uuid");
const bucket = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const getPresignedUrl = async (fileName, fileType) => {
  console.log(fileName, fileType);

  const uniqueFileName =
    fileName.split(".")[0] + "-" + uuid() + "." + fileType.split("/")[1];
  console.log(uniqueFileName);

  const command = new PutObjectCommand({
    Bucket: "learnflow-blogsite",
    Key: uniqueFileName,
    ContentType: fileType,
  });

  const url = await getSignedUrl(bucket, command, { expiresIn: 3600 });
  return {
    url,
    fileName: uniqueFileName,
  };
};

const deleteObjectFromS3 = async (fileName) => {
  const command = new DeleteObjectCommand({
    Bucket: "learnflow-blogsite",
    Key: fileName,
  });

  try {
    const data = await bucket.send(command);
    console.log("Successfully deleted object:", data);
    return data;
  } catch (error) {
    console.log("Error deleting object:", error);
    throw error;
  }
};


const router = new Router();

router.get("/presignedUrl", ensureAuth,ensureCreator, async (req, res) => {
  try {
    const { fileName, fileType } = req.query;
    if (!fileName || !fileType) {
      return res.status(500).send({
        error: "Something went wrong",
      });
    }

    const urlResponse = await getPresignedUrl(fileName, fileType);

    res.status(200).send(urlResponse);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Something went wrong",
    });
  }
});

router.delete("/deleteObject", ensureAuth, async (req, res) => {
  try {
    const { fileName } = req.body;
    console.log(fileName);
    if (!fileName) {
      return res.status(400).send({
        error: "File name is required",
      });
    }

    await deleteObjectFromS3(fileName);

    res.status(200).send({
      message: "File deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: "Something went wrong",
    });
  }
});

module.exports = router;
