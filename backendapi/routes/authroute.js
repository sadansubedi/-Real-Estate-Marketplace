import express from 'express';
import {signin, Signup} from '../controllers/authcontroller.js'
const router = express.Router();
router.post('/signup',Signup)
router.post('/signin',signin)


export default router;