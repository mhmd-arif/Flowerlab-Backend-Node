import express from 'express';
import * as controller from '../controllers/usersController.js';
import * as auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', controller.findAll);

router.get('/:id', controller.findById);

router.put('/:id', auth.authenticate, controller.updateById);

export default router;
