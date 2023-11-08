const AuthModel = require("../models/Account.model");

module.exports = {
  getStudentManager(req, res, next) {
    const { page, per_page, q } = req.query;
    let objWhere = {};
    objWhere.role = false;

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
};
