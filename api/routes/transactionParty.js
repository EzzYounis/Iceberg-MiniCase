const express = require('express');
const router = express.Router();
const transactionPartyController = require('../controllers/transactionPartyController');

// Create a new transaction party
router.post('/', transactionPartyController.createTransactionParty);
// Get all transaction parties
router.get('/', transactionPartyController.getAllTransactionParties);
// Get a transaction party by ID
router.get('/:id', transactionPartyController.getTransactionPartyById);
// Update a transaction party
router.put('/:id', transactionPartyController.updateTransactionParty);
// Delete a transaction party
router.delete('/:id', transactionPartyController.deleteTransactionParty);

module.exports = router;
