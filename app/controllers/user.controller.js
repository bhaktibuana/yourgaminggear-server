const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = (req, res) => {
  const params = {
    name: req.body.name,
    email: req.body.email,
    password: passwordHash(req.body.password),
    address: req.body.address,
    phone_number: req.body.phone_number,
    image_url: "/profile_img/profile_default-1647184267.png",
  };

  userModel.create(
    [
      params.name,
      params.email,
      params.password,
      params.address,
      params.phone_number,
      params.image_url,
    ],
    (error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        res.status(200).json({
          message: "Registration success.",
        });
      }
    }
  );
};

const signinByEmail = (req, res) => {
  const params = {
    email: req.body.email,
    password: passwordHash(req.body.password),
  };

  userModel.selectByEmail([params.email, params.password], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length > 0) {
        if (results[0]["is_deleted"] === 1) {
          res.status(403).json({
            message: "Your account has been deleted.",
          });
        } else {
          const token = jwt.sign(
            {
              id: results[0]["id"],
              name: results[0]["name"],
              email: results[0]["email"],
              address: results[0]["address"],
              phone_number: results[0]["phone_number"],
              image_url: `${req.protocol}://${req.get("host")}${
                results[0]["image_url"]
              }`,
              join_date: results[0]["join_date"],
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "7d" }
          );

          res.status(200).json({
            message: "Sign in success.",
            access_token: token,
          });
        }
      } else {
        res.status(403).json({
          message: "Wrong email or password.",
        });
      }
    }
  });
};

const signinByPhoneNumber = (req, res) => {
  const params = {
    phone_number: req.body.phone_number,
    password: passwordHash(req.body.password),
  };

  userModel.selectByPhone(
    [params.phone_number, params.password],
    (error, results) => {
      if (error) {
        res.status(500).json(error);
      } else {
        if (results.length > 0) {
          if (results[0]["is_deleted"] === 1) {
            res.status(403).json({
              message: "Your account has been deleted.",
            });
          } else {
            const token = jwt.sign(
              {
                id: results[0]["id"],
                name: results[0]["name"],
                email: results[0]["email"],
                address: results[0]["address"],
                phone_number: results[0]["phone_number"],
                image_url: `${req.protocol}://${req.get("host")}${
                  results[0]["image_url"]
                }`,
                join_date: results[0]["join_date"],
              },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "7d" }
            );

            res.status(200).json({
              message: "Sign in success.",
              access_token: token,
            });
          }
        } else {
          res.status(403).json({
            message: "Wrong phone number or password.",
          });
        }
      }
    }
  );
};

const updateUserName = (req, res) => {
  const id = res.locals.payload.id;
  const name = req.body.name;

  userModel.updateName([name, id], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      getUserById(req, res, "Update name success.");
    }
  });
};

const updateUserEmail = (req, res) => {
  const id = res.locals.payload.id;
  const email = req.body.email;

  userModel.updateEmail([email, id], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      getUserById(req, res, "Update email success.");
    }
  });
};

const updateUserAddress = (req, res) => {
  const id = res.locals.payload.id;
  const address = req.body.address;

  userModel.updateAddress([address, id], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      getUserById(req, res, "Update address success.");
    }
  });
};

const updateUserPhone = (req, res) => {
  const id = res.locals.payload.id;
  const phone_number = req.body.phone_number;

  userModel.updatePhone([phone_number, id], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      getUserById(req, res, "Update phone number success.");
    }
  });
};

const updateUserImage = (req, res) => {
  const id = res.locals.payload.id;
  const image_url = "/profile_img/" + req.body.image_name;

  userModel.updateImage([image_url, id], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      getUserById(req, res, "Update image success.");
    }
  });
};

const updateUserPassword = (req, res) => {
  const id = res.locals.payload.id;
  const oldPassword = passwordHash(req.body.old_password);
  const password = passwordHash(req.body.password);

  userModel.updatePassword([password, id, oldPassword], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.affectedRows > 0) {
        getUserById(req, res, "Update password success.");
      } else {
        res.status(403).json({
          message: "Wrong old password.",
        });
      }
    }
  });
};

const softDeleteUser = (req, res) => {
  const id = res.locals.payload.id;
  const password = passwordHash(req.body.password);

  userModel.softDelete([id, password], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.affectedRows > 0) {
        res.status(200).json({
          message: "Soft delete success.",
        });
      } else {
        res.status(403).json({
          message: "Wrong password.",
        });
      }
    }
  });
};

const getUserById = (req, res, message) => {
  const id = res.locals.payload.id;

  userModel.selectById([id], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      const token = jwt.sign(
        {
          id: results[0]["id"],
          name: results[0]["name"],
          email: results[0]["email"],
          address: results[0]["address"],
          phone_number: results[0]["phone_number"],
          image_url: `${req.protocol}://${req.get("host")}${
            results[0]["image_url"]
          }`,
          join_date: results[0]["join_date"],
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );

      res.status(200).json({
        message,
        access_token: token,
      });
    }
  });
};

const passwordHash = (password) => {
  return crypto.createHash("sha256").update(password).digest("hex");
};

module.exports = {
  signup,
  signinByEmail,
  signinByPhoneNumber,
  updateUserName,
  updateUserEmail,
  updateUserAddress,
  updateUserPhone,
  updateUserImage,
  updateUserPassword,
  softDeleteUser,
};
