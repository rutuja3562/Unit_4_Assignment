const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../upload"));
  },
  filename: function (req, file, cb) {
    console.log({file})
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb)=> {
  

  if (file.minetype == "img/jpeg" || file.minetype == "img/png") {
    // To accept the file pass `true`, like so:
    cb(null, true);
  } else {
    cb(null, false);
  }
  // You can always pass an error if something goes wrong:
//   cb(new Error("I don't have a clue!"));
}

const options = {
  storage: storage,
  filefilter: fileFilter,
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
};

const uploads = multer(options);

module.exports = uploads;
