// Sequelize model for the 'payment' table
// Represents a payment related to a transaction and a party

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
  payment_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  amount: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Type of payment (e.g., commission, earnest money, etc.)',
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Status of the payment (e.g., pending, completed)',
  },
  payment_date: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: 'Date the payment was made',
  },
  transaction_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Foreign key to transaction',
  },
  party_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Foreign key to party',
  },
}, {
  tableName: 'payment',
  timestamps: false, // We'll manage timestamps manually
});

module.exports = Payment;
