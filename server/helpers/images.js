"use strict";
require("dotenv").config();

const Storage = require("@google-cloud/storage");

const CLOUD_BUCKET = process.env.CLOUD_BUCKET;

console.log(process.env.KEYFILE_PATH)

const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    keyFilename: process.env.KEYFILE_PATH
});

const bucket = storage.bucket(CLOUD_BUCKET);

const getPublicUrl = filename => {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
};

const Multer = require("multer"),

multer = Multer({
    storage: Multer.MemoryStorage,
        limits: {
            fileSize: 5 * 1024 * 1024
        }
})

const sendUploadToGCS = (req, res, next) => {

    console.log("FROM MIDDLEWARE, ", req.file)

    if (!req.file) {
        return next();
    }

    const gcsname = Date.now() + req.file.originalname;
    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on("error", err => {
        req.file.cloudStorageError = err;
        console.log(err)
        next(err);
    });

    stream.on("finish", () => {
        req.file.cloudStorageObject = gcsname;
        console.log("---- lalallaa-",)
        file.makePublic().then(() => {
            req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
            console.log("-----")
            next();
        });
    });

    stream.end(req.file.buffer);
};



module.exports = {
    getPublicUrl,
    sendUploadToGCS,
    multer
};
