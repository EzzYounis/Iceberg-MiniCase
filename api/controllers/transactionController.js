// Controller for Transaction CRUD operations
const { Transaction, TransactionParty, Payment, Party } = require('../models');
const { v4: uuidv4 } = require('uuid'); // For generating unique payment IDs

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    await transaction.update(req.body);
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    await transaction.destroy();
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update only the status (stage) of a transaction
exports.updateTransactionStatus = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    const { status } = req.body;
    if (!status) return res.status(400).json({ error: 'Status is required' });
    transaction.status = status;
    await transaction.save();

    // Commission distribution logic
    if (status === 'title deed' || status === 'completed') {
      const parties = await TransactionParty.findAll({ where: { transaction_id: transaction.transaction_id } });
      const agency = parties.find(p => p.role === 'agency');
      const agentParties = parties.filter(p => p.role === 'listing_agent' || p.role === 'selling_agent');
      const commission = transaction.commission_amount;
      const payments = [];
      // 50% to agency
      if (agency) {
        payments.push(await Payment.create({
          payment_id: uuidv4(),
          amount: commission * 0.5,
          type: 'commission',
          status: 'pending',
          payment_date: new Date(),
          transaction_id: transaction.transaction_id,
          party_id: agency.party_id,
        }));
      }
      // 50% to agent(s) - use share_percentage if set
      const agentPortion = commission * 0.5;
      let totalShare = agentParties.reduce((sum, p) => sum + (p.share_percentage || 0), 0);
      if (totalShare > 0) {
        // Use share_percentage for each agent
        for (const agent of agentParties) {
          if (agent.share_percentage) {
            payments.push(await Payment.create({
              payment_id: uuidv4(),
              amount: agentPortion * (agent.share_percentage / 100),
              type: 'commission',
              status: 'pending',
              payment_date: new Date(),
              transaction_id: transaction.transaction_id,
              party_id: agent.party_id,
            }));
          }
        }
      } else if (agentParties.length === 2 && agentParties[0].party_id !== agentParties[1].party_id) {
        // Split equally if two different agents
        for (const agent of agentParties) {
          payments.push(await Payment.create({
            payment_id: uuidv4(),
            amount: agentPortion / 2,
            type: 'commission',
            status: 'pending',
            payment_date: new Date(),
            transaction_id: transaction.transaction_id,
            party_id: agent.party_id,
          }));
        }
      } else if (agentParties.length === 1) {
        // Only one agent
        payments.push(await Payment.create({
          payment_id: uuidv4(),
          amount: agentPortion,
          type: 'commission',
          status: 'pending',
          payment_date: new Date(),
          transaction_id: transaction.transaction_id,
          party_id: agentParties[0].party_id,
        }));
      }
      res.json({ transaction, payments });
      return;
    }
    res.json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
