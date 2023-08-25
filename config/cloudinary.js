const cloudinary = require("cloudinary").v2;

// Empty config so that the file will only be on Memory.
// Since it should be saved/uploaded to Cloudinary,
// not to the machine where the server is running.
cloudinary.config();

module.exports = cloudinary;