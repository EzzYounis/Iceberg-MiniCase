// Sequelize model for the 'transaction' table
// Represents a property sale or rental transaction

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  transaction_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  property_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Foreign key to property',
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Current stage of the transaction',
  },
  transaction_type: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Type of transaction (sale, rental, etc.)',
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'Total price of the transaction',
  },
  commission_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    comment: 'Total commission for the transaction',
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'transaction',
  timestamps: false, // We'll manage timestamps manually
});

module.exports = Transaction;
