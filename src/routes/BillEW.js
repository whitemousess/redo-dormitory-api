const express = require("express");
const router = express.Router();

const BillEWController = require('../controllers/BillEW.controller');

router.get('/get-all-electric',BillEWController.getAllElectric)
router.get('/get-electric-room',BillEWController.getElectricRoom)
router.get('/get-one-electric',BillEWController.getOneElectric)

router.put('/:id/create-bill',BillEWController.createBill)
router.put('/delete-bill',BillEWController.deleteBill)
router.put('/edit-bill',BillEWController.editBill)

module.exports = router;