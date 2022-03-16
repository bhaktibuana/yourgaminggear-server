const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const yup = require("yup");
require("dotenv").config();

const registerValidation = (req, res, next) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation,
    address: req.body.address,
    phone_number: validator.isMobilePhone(req.body.phone_number, "id-ID"),
  };

  const schema = yup.object().shape({
    name: yup.string().max(50).required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    password_confirmation: yup
      .string()
      .min(8)
      .matches(data.password, "password does not match")
      .required(),
    address: yup.string().max(255).required(),
    phone_number: yup
      .bool()
      .oneOf(
        [true],
        "invalid phone number format, please use Indonesian format"
      )
      .required(),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({
        message: err.errors,
      });
    });
};

const checkEmailExist = (req, res, next) => {
  const email = req.body.email;

  userModel.countEmail([email], (error, results) => {
    if (error) {
      throw new Error(error);
    } else {
      if (results[0].count === 0) {
        next();
      } else {
        res.status(400).json({
          message: "Email already exist! Use another email.",
        });
      }
    }
  });
};

const checkPhoneNumberExist = (req, res, next) => {
  const phone_number = req.body.phone_number;

  userModel.countPhone([phone_number], (error, results) => {
    if (error) {
      throw new Error(error);
    } else {
      if (results[0].count === 0) {
        next();
      } else {
        res.status(400).json({
          message: "Phone number already exist! Use another phone number.",
        });
      }
    }
  });
};

const loginEmailValidation = (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation,
  };

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    password_confirmation: yup
      .string()
      .min(8)
      .matches(data.password, "password does not match")
      .required(),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({
        message: err.errors,
      });
    });
};

const loginPhoneValidation = (req, res, next) => {
  const data = {
    phone_number: validator.isMobilePhone(req.body.phone_number, "id-ID"),
    password: req.body.password,
    password_confirmation: req.body.password_confirmation,
  };

  const schema = yup.object().shape({
    phone_number: yup
      .bool()
      .oneOf(
        [true],
        "invalid phone number format, please use Indonesian format"
      )
      .required(),
    password: yup.string().min(8).required(),
    password_confirmation: yup
      .string()
      .min(8)
      .matches(data.password, "password does not match")
      .required(),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({
        message: err.errors,
      });
    });
};

const updateNameValidation = (req, res, next) => {
  const data = {
    name: req.body.name,
  };

  const schema = yup.object().shape({
    name: yup.string().max(50).required(),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({
        message: err.errors,
      });
    });
};

const updateEmailValidation = (req, res, next) => {
  const data = {
    email: req.body.email,
  };

  const schema = yup.object().shape({
    email: yup.string().email().required(),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({
        message: err.errors,
      });
    });
};

const updateAddressValidation = (req, res, next) => {
  const data = {
    address: req.body.address,
  };

  const schema = yup.object().shape({
    address: yup.string().max(255).required(),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({
        message: err.errors,
      });
    });
};

const updatePhoneValidation = (req, res, next) => {
  const data = {
    phone_number: validator.isMobilePhone(req.body.phone_number, "id-ID"),
  };

  const schema = yup.object().shape({
    phone_number: yup
      .bool()
      .oneOf(
        [true],
        "invalid phone number format, please use Indonesian format"
      )
      .required(),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({
        message: err.errors,
      });
    });
};

const updatePasswordValidation = (req, res, next) => {
  const data = {
    old_password: req.body.old_password,
    password: req.body.password,
    password_confirmation: req.body.password_confirmation,
  };

  const schema = yup.object().shape({
    old_password: yup.string().min(8).required(),
    password: yup.string().min(8).required(),
    password_confirmation: yup
      .string()
      .min(8)
      .matches(data.password, "password does not match")
      .required(),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({
        message: err.errors,
      });
    });
};

const deleteProfileValidation = (req, res, next) => {
  const data = {
    password: req.body.password,
  };

  const schema = yup.object().shape({
    password: yup.string().min(8).required(),
  });

  schema
    .validate(data, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(400).json({
        message: err.errors,
      });
    });
};

module.exports = {
  registerValidation,
  checkEmailExist,
  checkPhoneNumberExist,
  loginEmailValidation,
  loginPhoneValidation,
  updateNameValidation,
  updateEmailValidation,
  updateAddressValidation,
  updatePhoneValidation,
  updatePasswordValidation,
  deleteProfileValidation,
};
