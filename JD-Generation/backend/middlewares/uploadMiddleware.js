const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("./s3Config");

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read", // or "private"
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const fileName = `resumes/${Date.now()}_${file.originalname}`;
      cb(null, fileName);
    }
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDFs are allowed"), false);
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = upload;
