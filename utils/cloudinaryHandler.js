const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const { response } = require("express");

const streamUploadToPosts = (req) => {
    return streamUploader(req, "Posts");
};

const streamUploadToProfile = (req) => {
    return streamUploader(req, "Profiles");
};

const deleteUploadedImage = async (image_public_id) => {
    await cloudinary.uploader
        .destroy(image_public_id, {
            invalidate: true,
        })
        .then((response) => {
            if (response.result === "ok") {
                console.log(`\nImage was deleted.`);
            } else {
                console.log(`\n${response.result}`);
            }
        })
        .catch((error) => {
            console.log(`\nError in deleting the uploaded Image.`);
            throw error;
        });
};

function streamUploader(req, folderDestination) {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
        {
            folder: `Capstone/${folderDestination}`,
        },
        (error, result) => {
            if (result) {
            resolve(result);
            } else {
            reject(error);
            }
        });
        streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
}

module.exports = {
    streamUploadToPosts,
    streamUploadToProfile,
    deleteUploadedImage
};