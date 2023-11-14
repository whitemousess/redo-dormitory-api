const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const cloudinary = require("../config/db/cloudinary");

const AuthModel = require("../models/Account.model");

module.exports = {
  // get all user
  getAllUsers(req, res, next) {
    const { page, per_page, q } = req.query;
    let objWhere = {};
    objWhere.role = true;

    if (q) objWhere.username = new RegExp(q, "i");

    AuthModel.find(objWhere)
      .then((data) => {
        const currentPage = parseInt(page) || 1;
        const dataPerPage = parseInt(per_page) || data.length;
        const startIndex = (currentPage - 1) * dataPerPage;
        const endIndex = startIndex + dataPerPage;
        const totalItems = data.length;

        const totalPages = Math.ceil(totalItems / dataPerPage);
        const items = data.slice(startIndex, endIndex);

        res.json({ data: items, currentPage, totalPages });
      })
      .catch((error) => res.json({ error: error }));
  },

  //   create user
  createUser(req, res, next) {
    const { username } = req.body;
    if (!username) {
      AuthModel.findOne({})
        .sort({ user_id: -1 })
        .then((data) => {
          let nextUserId = 20000;
          if (data && data.user_id >= 20000) {
            nextUserId = data.user_id + 1;
          }
          if (!req.file) {
            req.body.avatarUrl = null;
          } else {
            req.body.avatarUrl = req.file.path;
          }
          const handlePassword = CryptoJS.AES.encrypt(
            (req.body.password = "sv" + nextUserId),
            process.env.ACCESS_TOKEN
          ).toString();
          // Xử lý dữ liệu req.body
          req.body.username = nextUserId;
          req.body.user_id = nextUserId;
          req.body.password = handlePassword;
          req.body.email = nextUserId + "@gmail.com";

          const account = new AuthModel(req.body);
          account
            .save()
            .then((account) => {
              res.json({ data: account });
            })
            .catch((error) => res.json({ error: error }));
        });
    } else {
      AuthModel.findOne({ username }).then((data) => {
        if (data) {
          return res.json({ error: "Username already exists" });
        } else {
          req.body.user_id = null;
          if (!req.file) {
            req.body.avatarUrl = null;
          } else {
            req.body.avatarUrl = req.file.path;
          }
          req.body.role = true;
          const handlePassword = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.ACCESS_TOKEN
          ).toString();
          req.body.password = handlePassword;
          const account = new AuthModel(req.body);
          account
            .save()
            .then((account) => {
              res.json({ data: account });
            })
            .catch((error) => res.json({ error: error }));
        }
      });
    }
  },

  login(req, res, next) {
    AuthModel.findOne({ username: req.body.username })
      .then((auth) => {
        if (!auth) {
          return res
            .status(404)
            .json({ message: "Invalid username or password" });
        } else {
          const hashedPassword = CryptoJS.AES.decrypt(
            auth.password,
            process.env.ACCESS_TOKEN
          ).toString(CryptoJS.enc.Utf8);

          if (hashedPassword !== req.body.password) {
            res.status(401).json({ message: "Invalid password" });
          } else {
            const accessToken = jwt.sign(
              {
                id: auth._id,
                isAdmin: auth.role,
              },
              process.env.ACCESS_TOKEN,
              { expiresIn: "3d" }
            );

            const { ...other } = auth._doc;
            res.status(200).json({ ...other, token: accessToken });
          }
        }
      })
      .catch((err) => {
        res.sendStatus(500);
      });
  },

  deleteUser(req, res, next) {
    AuthModel.findOneAndDelete({ _id: req.params.id }).then((data) => {
      if (data) {
        if (data.avatarUrl) {
          const image_id =
            "dormitory" +
            data.avatarUrl
              .split("/upload/")[1]
              .split("/dormitory")[1]
              .split(".")[0];
          cloudinary.uploader.destroy(image_id);
        }
        res.json({ data: data });
      } else {
        res.sendStatus(404);
      }
    });
  },

  getCurrent(req, res, next) {
    AuthModel.findById(req.user.id)
      .then((user) => {
        res.json({ data: user });
      })
      .catch(() =>
        res.status(404).json({ message: "Username or password incorrect" })
      );
  },

  getCurrentById(req, res, next) {
    AuthModel.findById({ _id: req.params.id }).then((user) => {
      res.json({ data: user });
    });
  },

  editCurrentUser(req, res, next) {
    AuthModel.findOne({ _id: req.user.id }).then((user) => {
      if (!req.file) {
        req.body.avatarUrl = user.avatarUrl;
      } else {
        if (user.avatarUrl) {
          const image_id =
            "dormitory" +
            user.avatarUrl
              .split("/upload/")[1]
              .split("/dormitory")[1]
              .split(".")[0];
          cloudinary.uploader.destroy(image_id);
        }
        req.body.avatarUrl = req.file.path;
      }

      if (req.body.password == user.password) {
        req.body.password = user.password;
      } else {
        const handlePassword = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.ACCESS_TOKEN
        ).toString();
        req.body.password = handlePassword;
      }

      AuthModel.findOneAndUpdate({ _id: req.user.id }, req.body)
        .then((student) => {
          res.json({ data: student });
        })
        .catch((err) => {
          res.json({ error: err });
        });
    });
  },

  editUser(req, res, next) {
    AuthModel.findOne({ _id: req.params.id }).then((user) => {
      if (!req.file) {
        req.body.avatarUrl = user.avatarUrl;
      } else {
        if (user.avatarUrl) {
          const image_id =
            "dormitory" +
            user.avatarUrl
              .split("/upload/")[1]
              .split("/dormitory")[1]
              .split(".")[0];
          cloudinary.uploader.destroy(image_id);
        }
        req.body.avatarUrl = req.file.path;
      }

      if (req.body.password == user.password) {
        req.body.password = user.password;
      } else {
        const handlePassword = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.ACCESS_TOKEN
        ).toString();
        req.body.password = handlePassword;
      }

      AuthModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
        .then((student) => {
          res.json({ data: student });
        })
        .catch((err) => {
          res.json({ error: err });
        });
    });
  },
};
