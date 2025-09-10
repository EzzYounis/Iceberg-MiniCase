// Sequelize model for the 'party' table
// Represents an agent, agency, or other stakeholder

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Party = sequelize.define('Party', {
  party_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_info: {
    type: DataTypes.JSON,
    allowNull: false,
    comment: 'Contact details as JSON (phone, email, etc.)',
  },
  bank_account: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Bank account number or IBAN',
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
  tableName: 'party',
  timestamps: false, // We'll manage timestamps manually
});

module.exports = Party;
