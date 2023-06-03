import express from 'express';
import * as controller from '../controllers/flowersController.js';
import * as auth from '../middlewares/auth.js';

const router = express.Router();

// Get all flowers
router.get('/', controller.findAll);

// Get specific flower by id
router.get('/:id', controller.findById);

// create flower
router.post('/', auth.authenticate, controller.create);

// update flower
router.put('/:id', auth.authenticate, controller.updateById);

// delete flower
router.delete('/:id', auth.authenticate, controller.deleteById);

export default router;
