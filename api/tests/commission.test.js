const request = require('supertest');
const app = require('../app');
const { Transaction, TransactionParty, Payment, Party, sequelize } = require('../models');

describe('Commission Distribution Logic', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true }); // Reset DB for test
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('One agent, no share_percentage: 50/50 split', async () => {
    // Create agency and agent
    await Party.create({ party_id: 'agency1', name: 'Agency', contact_info: {}, created_at: new Date(), updated_at: new Date() });
    await Party.create({ party_id: 'agent1', name: 'Agent', contact_info: {}, created_at: new Date(), updated_at: new Date() });
    // Create property
    await require('../models').Property.create({ property_id: 'prop1', address: '123 Main St', type: 'house', size: 100, price: 10000, created_at: new Date(), updated_at: new Date() });
    // Create transaction
    const transaction = await Transaction.create({ transaction_id: 'txn1', property_id: 'prop1', status: 'agreement', transaction_type: 'sale', price: 10000, commission_amount: 1000, created_at: new Date(), updated_at: new Date() });
    // Add TransactionParty records
    await TransactionParty.create({ id: 'tp1', transaction_id: 'txn1', role: 'agency', created_at: new Date(), party_id: 'agency1' });
    await TransactionParty.create({ id: 'tp2', transaction_id: 'txn1', role: 'listing_agent', created_at: new Date(), party_id: 'agent1' });
    // Update status to trigger commission
    await request(app).patch('/api/transactions/txn1/status').send({ status: 'title deed' });
    // Check payments
    const payments = await Payment.findAll({ where: { transaction_id: 'txn1' } });
    expect(payments.length).toBe(2);
    const agencyPayment = payments.find(p => p.party_id === 'agency1');
    const agentPayment = payments.find(p => p.party_id === 'agent1');
    expect(agencyPayment.amount).toBe(500);
    expect(agentPayment.amount).toBe(500);
  });

  test('Two agents, custom share_percentage', async () => {
    // Create parties
    await Party.create({ party_id: 'agency2', name: 'Agency2', contact_info: {}, created_at: new Date(), updated_at: new Date() });
    await Party.create({ party_id: 'agent2', name: 'Agent2', contact_info: {}, created_at: new Date(), updated_at: new Date() });
    await Party.create({ party_id: 'agent3', name: 'Agent3', contact_info: {}, created_at: new Date(), updated_at: new Date() });
    // Create property
    await require('../models').Property.create({ property_id: 'prop2', address: '456 Side St', type: 'apartment', size: 80, price: 20000, created_at: new Date(), updated_at: new Date() });
    // Create transaction
    const transaction = await Transaction.create({ transaction_id: 'txn2', property_id: 'prop2', status: 'agreement', transaction_type: 'sale', price: 20000, commission_amount: 2000, created_at: new Date(), updated_at: new Date() });
    // Add TransactionParty records
    await TransactionParty.create({ id: 'tp3', transaction_id: 'txn2', role: 'agency', created_at: new Date(), party_id: 'agency2' });
    await TransactionParty.create({ id: 'tp4', transaction_id: 'txn2', role: 'listing_agent', created_at: new Date(), party_id: 'agent2', share_percentage: 30 });
    await TransactionParty.create({ id: 'tp5', transaction_id: 'txn2', role: 'selling_agent', created_at: new Date(), party_id: 'agent3', share_percentage: 20 });
    // Update status to trigger commission
    await request(app).patch('/api/transactions/txn2/status').send({ status: 'title deed' });
    // Check payments
    const payments = await Payment.findAll({ where: { transaction_id: 'txn2' } });
    expect(payments.length).toBe(3);
    const agencyPayment = payments.find(p => p.party_id === 'agency2');
    const agent2Payment = payments.find(p => p.party_id === 'agent2');
    const agent3Payment = payments.find(p => p.party_id === 'agent3');
    expect(agencyPayment.amount).toBe(1000);
    expect(agent2Payment.amount).toBe(300); // 30% of 1000
    expect(agent3Payment.amount).toBe(200); // 20% of 1000
  });
});
