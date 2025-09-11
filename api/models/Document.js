// Sequelize model for the 'document' table
// Represents a document related to a transaction and optionally a party

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Document = sequelize.define('Document', {
  document_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  transaction_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Foreign key to transaction',
  },
  party_id: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Foreign key to party (optional)',
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Type of document (e.g., contract, ID, etc.)',
  },
  file_url: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'URL or path to the file',
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Status of the document (e.g., pending, approved)',
  },
}, {
  tableName: 'document',
  timestamps: false, // We'll manage timestamps manually
});

module.exports = Document;
