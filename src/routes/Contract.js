const express = require("express");
const router = express.Router();

const {verifyToken, verifyTokenAndAdmin} = require("../middleware/CheckLogin")
const ContractController = require('../controllers/Contract.controller')

router.get('/get-contracts',verifyTokenAndAdmin,ContractController.getContract);
router.get('/get-contract-student',verifyToken,ContractController.getContractStudent);
router.get('/get-liquidation',verifyTokenAndAdmin,ContractController.getLiquidation);

router.get('/:id/delete-contracts',verifyTokenAndAdmin,ContractController.deleteContract);
router.put('/create-contracts',verifyTokenAndAdmin,ContractController.createContract);
router.get('/:id/liquidation-contracts',verifyTokenAndAdmin,ContractController.liquidationContract);

module.exports = router;