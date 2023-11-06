const AuthRouter = require("./Auth");
const BillEWRouter = require("./BillEW");
const RoomRouter = require("./Room");
const ServiceRouter = require("./Service");
const ContractRouter = require("./Contract");
const ReportRouter = require("./Report");

function route(app) {
  app.use("/api/auth", AuthRouter);
  app.use("/api/rooms", BillEWRouter);
  app.use("/api/services", RoomRouter);
  app.use("/api/contract", ServiceRouter);
  app.use("/api/report", ReportRouter);
  app.use("/api/bill-electric-water", ContractRouter);

  app.use("/", function (req, res, next) {
    res.send({ Error: "NOT FOUND" });
  });
}

module.exports = route;
