const express = require("express");
const router = express.Router();

const {verifyToken} = require("../middleware/CheckLogin")
const ContractController = require('../controllers/Contract.controller')

router.get('/get-contracts',ContractController.getContract);
router.get('/get-contract-student',verifyToken,ContractController.getContractStudent);
router.get('/get-liquidation',ContractController.getLiquidation);

router.put('/:id/delete-contracts',ContractController.deleteContract);
router.put('/create-contracts',ContractController.createContract);
router.put('/:id/liquidation-contracts',ContractController.liquidationContract);

module.exports = router;