// category.route.ts
import express from 'express';
import { CategoryConstroller } from './category.controller';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidations } from './category.validation';
import { isAdmin, isAuthenticated } from '../../middlewares/authMiddleware';

const router = express.Router();

router.post('/categories', isAuthenticated, isAdmin, validateRequest(CategoryValidations.CategoryValidationSchema), CategoryConstroller.createCategory);
router.get('/categories', CategoryConstroller.getAllCategories);

export const CategoryRoutes = router;