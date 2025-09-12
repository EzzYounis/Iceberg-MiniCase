// Controller for TransactionParty CRUD operations
const { TransactionParty } = require('../models');

// Create a new transaction party
exports.createTransactionParty = async (req, res) => {
  try {
    const transactionParty = await TransactionParty.create(req.body);
    res.status(201).json(transactionParty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all transaction parties
exports.getAllTransactionParties = async (req, res) => {
  try {
    const transactionParties = await TransactionParty.findAll();
    res.json(transactionParties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single transaction party by ID
exports.getTransactionPartyById = async (req, res) => {
  try {
    const transactionParty = await TransactionParty.findByPk(req.params.id);
    if (!transactionParty) return res.status(404).json({ error: 'TransactionParty not found' });
    res.json(transactionParty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a transaction party
exports.updateTransactionParty = async (req, res) => {
  try {
    const transactionParty = await TransactionParty.findByPk(req.params.id);
    if (!transactionParty) return res.status(404).json({ error: 'TransactionParty not found' });
    await transactionParty.update(req.body);
    res.json(transactionParty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a transaction party
exports.deleteTransactionParty = async (req, res) => {
  try {
    const transactionParty = await TransactionParty.findByPk(req.params.id);
    if (!transactionParty) return res.status(404).json({ error: 'TransactionParty not found' });
    await transactionParty.destroy();
    res.json({ message: 'TransactionParty deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
