// Controller for Document CRUD operations
const { Document } = require('../models');

// Create a new document
exports.createDocument = async (req, res) => {
  try {
    const document = await Document.create(req.body);
    res.status(201).json(document);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all documents
exports.getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll();
    res.json(documents);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single document by ID
exports.getDocumentById = async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id);
    if (!document) return res.status(404).json({ error: 'Document not found' });
    res.json(document);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a document
exports.updateDocument = async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id);
    if (!document) return res.status(404).json({ error: 'Document not found' });
    await document.update(req.body);
    res.json(document);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a document
exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByPk(req.params.id);
    if (!document) return res.status(404).json({ error: 'Document not found' });
    await document.destroy();
    res.json({ message: 'Document deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
