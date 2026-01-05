const express = require('express');
const router = express.Router();
const controller = require('../controllers/transactionsController');

router.post('/deposit', controller.deposit);
router.post('/withdraw', controller.withdraw);
router.get('/:userId/balance', controller.getBalance);
router.get('/:userId/transactions', controller.getTransactions);

module.exports = router;
