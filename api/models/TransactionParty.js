// Sequelize model for the 'transaction_party' table
// Links a party (agent, agency, etc.) to a transaction with a specific role and share

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TransactionParty = sequelize.define('TransactionParty', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  transaction_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Foreign key to transaction',
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Role in the transaction (e.g., listing_agent, selling_agent, agency)',
  },
  share_percentage: {
    type: DataTypes.NUMBER,
    allowNull: true,
    comment: 'Percentage of commission for this party',
  },
  party_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Foreign key to party',
  },
}, {
  tableName: 'transaction_party',
});

module.exports = TransactionParty;
