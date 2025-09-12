const express = require('express');
const router = express.Router();
const documentController = require('../controllers/documentController');

// Create a new document
router.post('/', documentController.createDocument);
// Get all documents
router.get('/', documentController.getAllDocuments);
// Get a document by ID
router.get('/:id', documentController.getDocumentById);
// Update a document
router.put('/:id', documentController.updateDocument);
// Delete a document
router.delete('/:id', documentController.deleteDocument);

module.exports = router;
