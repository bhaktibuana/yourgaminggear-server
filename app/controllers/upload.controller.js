const multer = require("multer");

const productImage = (req, res) => {
  const imageName = req.query.image_name;

  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./public/product_img");
    },
    filename: (req, file, callback) => {
      callback(null, imageName);
    },
  });

  const upload = multer({ storage }).single("image");

  upload(req, res, (error) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json({
        message: "Product image uploaded successfully.",
      });
    }
  });
};

const profileImage = (req, res) => {
  const imageName = req.query.image_name;

  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "./public/profile_img");
    },
    filename: (req, file, callback) => {
      callback(null, imageName);
    },
  });

  const upload = multer({ storage }).single("image");

  upload(req, res, (error) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.status(200).json({
        message: "Profile image uploaded successfully.",
      });
    }
  });
};

module.exports = {
  productImage,
  profileImage,
};
