const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// Create a new property
router.post('/', propertyController.createProperty);
// Get all properties
router.get('/', propertyController.getAllProperties);
// Get a property by ID
router.get('/:id', propertyController.getPropertyById);
// Update a property
router.put('/:id', propertyController.updateProperty);
// Delete a property
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;
