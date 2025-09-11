const express = require('express');
const router = express.Router();
const partyController = require('../controllers/partyController');

// Create a new party
router.post('/', partyController.createParty);
// Get all parties
router.get('/', partyController.getAllParties);
// Get a party by ID
router.get('/:id', partyController.getPartyById);
// Update a party
router.put('/:id', partyController.updateParty);
// Delete a party
router.delete('/:id', partyController.deleteParty);

module.exports = router;
