// auth.route.ts
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidations } from './auth.validation';
import checkJwt from '../../middlewares/checkJwt';

const router = express.Router();

router.post('/register', validateRequest(AuthValidations.UserRegisterSchema), AuthController.registerUser);
router.post('/login', validateRequest(AuthValidations.loginValidationSchema), AuthController.loginUser);
router.post('/change-password', checkJwt, validateRequest(AuthValidations.changePasswordValidationSchema), AuthController.changePassword
);

export const AuthRoutes = router;