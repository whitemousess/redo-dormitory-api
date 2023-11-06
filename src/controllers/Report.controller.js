const AuthModel = require("../models/Account.model");

module.exports = {
  createReport(req, res, next) {
    AuthModel.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { report: req.body } },
      { new: true }
    ).then((report) => {
      res.json({ data: report });
    });
  },

  deleteReport(req, res, next) {
    AuthModel.findOneAndUpdate(
      {
        _id: req.user.id,
      },
      {
        $pull: { report: { _id: req.params.id } },
      },
      { new: true }
    )
      .then((report) => {
        res.json({ data: report });
      })
      .catch((error) => {
        res.json({ error: error });
      });
  },

  successReport(req, res, next) {
    AuthModel.findOneAndUpdate(
      {
        _id: req.user.id,
        "report._id": req.params.id,
      },
      {
        $set: {
          "report.$.status": 1,
        },
      },
      { new: true }
    )
      .then((report) => {
        if (!report) {
          return res.status(404).json({ error: "Không tồn tại report" });
        }
        res.json({ data: report });
      })
      .catch((error) => {
        res.json({ error: error });
      });
  },

  async getAllReport(req, res, next) {
    const data = await AuthModel.find({});
    const reports = [];

    data.forEach((user) => {
      if (user.report && user.report.length > 0) {
        const userReports = {
          username: user.username,
          reports: user.report.map((report) => ({
            title: report.title,
            description: report.description,
            status: report.status,
          })),
        };
        reports.push(userReports);
      }
    });

    res.json({ data: reports });
  },
};
