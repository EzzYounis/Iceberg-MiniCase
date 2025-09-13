// Centralizes and initializes all models and their associations

const Party = require('./Party');
const Property = require('./Property');
const Transaction = require('./Transaction');
const TransactionParty = require('./TransactionParty');
const Payment = require('./Payment');
const sequelize = require('../config/database');

// Associations
// Property 1<-->N Transaction
Property.hasMany(Transaction, { foreignKey: 'property_id' });
Transaction.belongsTo(Property, { foreignKey: 'property_id' });

// Transaction 1<-->N TransactionParty
Transaction.hasMany(TransactionParty, { foreignKey: 'transaction_id' });
TransactionParty.belongsTo(Transaction, { foreignKey: 'transaction_id' });

// Party 1<-->N TransactionParty
Party.hasMany(TransactionParty, { foreignKey: 'party_id' });
TransactionParty.belongsTo(Party, { foreignKey: 'party_id' });

// Transaction 1<-->N Payment
Transaction.hasMany(Payment, { foreignKey: 'transaction_id' });
Payment.belongsTo(Transaction, { foreignKey: 'transaction_id' });

// Party 1<-->N Payment
Party.hasMany(Payment, { foreignKey: 'party_id' });
Payment.belongsTo(Party, { foreignKey: 'party_id' });


module.exports = {
  Party,
  Property,
  Transaction,
  TransactionParty,
  Payment,
  sequelize
};
