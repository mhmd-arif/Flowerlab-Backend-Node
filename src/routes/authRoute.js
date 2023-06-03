import express from 'express';
import * as controller from '../controllers/authController.js';
import * as auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', controller.signup);
router.post('/signin', controller.signin);
// router.post('/signout', auth.authenticate, controller.signout);

export default router;
