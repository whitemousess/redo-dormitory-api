const ReportModel = require("../models/Report.model");
const AuthModel = require("../models/Account.model");

module.exports = {
  createReport(req, res, next) {
    req.body.user_id = req.user.id;
    const report = new ReportModel(req.body);
    report
      .save()
      .then((report) => {
        AuthModel.findOneAndUpdate(
          { _id: req.user.id },
          { $push: { reports: { report_id: report._id } } },
          { new: true }
        ).then((auth) => {
          res.json({ data: report });
        });
      })
      .catch((error) => {
        res.json({ error: error });
      });
  },

  deleteReport(req, res, next) {
    ReportModel.findOneAndDelete({ _id: req.params.id })
      .then((report) => {
        AuthModel.findOneAndUpdate(
          {
            _id: report.user_id,
          },
          {
            $pull: { reports: { report_id: report._id } },
          },
          { new: true }
        ).then((account) => {
          res.json({ data: report });
        });
      })
      .catch((error) => {
        res.json({ error: error });
      });
  },

  successReport(req, res, next) {
    req.body.status = 1;
    ReportModel.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    })
      .then((report) => {
        res.json({ data: report });
      })
      .catch((err) => res.json({ error: err }));
  },

  getAllReport(req, res, next) {
    ReportModel.find()
      .then((report) => {
        res.json({ data: report });
      })
      .catch((err) => res.json(err));
  },

  getReportInStudent(req, res, next) {
    AuthModel.findById(req.user.id)
      .populate("reports.report_id")
      .then((user) => {
        res.json({ data: user.reports });
      })
      .catch((err) => {
        res.json({ data: err });
      });
  },
};
