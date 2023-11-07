const ServiceModel = require("../models/Service.model");

module.exports = {
  getAllService(req, res, next) {
    const { page, per_page, q } = req.query;
    let objWhere = {};
    if (q) objWhere.name = new RegExp(q, "i");

    ServiceModel.find(objWhere)
      .then((data) => {
        if (data.length === 0)
          return res.json({ message: "No service yet" });
        const currentPage = parseInt(page) || 1;
        const dataPerPage = parseInt(per_page) || data.length;
        const startIndex = (currentPage - 1) * dataPerPage;
        const endIndex = startIndex + dataPerPage;
        const totalItems = data.length;

        const totalPages = Math.ceil(totalItems / dataPerPage);
        const items = data.slice(startIndex, endIndex);
        res.json({
          data: items,
          currentPage,
          totalPages,
        });
      })
      .catch((err) => console.log(err));
  },

  getService(req, res, next) {
    ServiceModel.findOne({ _id: req.params.id })
      .then((service) => res.json({ data: service }))
      .catch((err) => console.log(err));
  },

  createService(req, res, next) {
    const service = new ServiceModel(req.body);
    service
      .save()
      .then((service) => res.json({ data: service }))
      .catch((err) => console.log(err));
  },

  deleteService(req, res, next) {
    ServiceModel.findOneAndDelete({ _id: req.params.id })
      .then((service) => res.json({ data: service }))
      .catch((err) => console.log(err));
  },

  editService(req, res, next) {
    ServiceModel.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then((service) => res.json({ data: service }))
      .catch((err) => console.log(err));
  },
};
