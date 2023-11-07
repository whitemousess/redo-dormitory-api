const express = require("express");
const router = express.Router();

const ServiceController = require('../controllers/Service.controller');

router.get('/get-all-service', ServiceController.getAllService);
router.get('/:id/get-service', ServiceController.getService);
router.post('/create-service', ServiceController.createService);

router.delete('/:id/delete', ServiceController.deleteService);
router.put('/:id/edit', ServiceController.editService);

module.exports = router;