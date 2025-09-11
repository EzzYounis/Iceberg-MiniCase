// Controller for Party CRUD operations
const { Party } = require('../models');

// Create a new party
exports.createParty = async (req, res) => {
  try {
    const party = await Party.create(req.body);
    res.status(201).json(party);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all parties
exports.getAllParties = async (req, res) => {
  try {
    const parties = await Party.findAll();
    res.json(parties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single party by ID
exports.getPartyById = async (req, res) => {
  try {
    const party = await Party.findByPk(req.params.id);
    if (!party) return res.status(404).json({ error: 'Party not found' });
    res.json(party);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a party
exports.updateParty = async (req, res) => {
  try {
    const party = await Party.findByPk(req.params.id);
    if (!party) return res.status(404).json({ error: 'Party not found' });
    await party.update(req.body);
    res.json(party);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a party
exports.deleteParty = async (req, res) => {
  try {
    const party = await Party.findByPk(req.params.id);
    if (!party) return res.status(404).json({ error: 'Party not found' });
    await party.destroy();
    res.json({ message: 'Party deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
