const AuthRouter = require("./Auth");
const StudentRouter = require("./Student");
const BillEWRouter = require("./BillEW");
const BillRoomRouter = require("./BillRoom");
const BillServiceRouter = require("./BillService");
const RoomRouter = require("./Room");
const ServiceRouter = require("./Service");
const ContractRouter = require("./Contract");
const ReportRouter = require("./Report");
const PaymentRouter = require("./Payment");

function route(app) {
  app.use("/api/auth", AuthRouter);
  app.use("/api/student", StudentRouter);
  app.use("/api/rooms", RoomRouter);
  app.use("/api/services", ServiceRouter);
  app.use("/api/contract", ContractRouter);
  app.use("/api/report", ReportRouter);
  app.use("/api/bill-electric-water", BillEWRouter);
  app.use("/api/bill-service", BillServiceRouter);
  app.use("/api/bill-room", BillRoomRouter);

  app.use("/api/payment", PaymentRouter);

  app.use("/", function (req, res, next) {
    res.send({ Error: "NOT FOUND" });
  });
}

module.exports = route;
