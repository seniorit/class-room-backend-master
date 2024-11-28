const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderName = req.baseUrl.split("/").pop();
    const dir = `public/img/${folderName}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    file.folderName = folderName;

    cb(null, dir);
  },
  filename: function (req, file, cb) { 
    const fileExtension = file.originalname.split(".").pop().toLowerCase();
    const newFileName = `${Date.now()}.${fileExtension}`;

    file.imgPath = `img/${file.folderName}/${newFileName}`;
    cb(null, newFileName);
  },
});

module.exports = storage;
