// product.route.ts
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidations } from './product.validation';
import { isAdmin, isAuthenticated } from '../../middlewares/authMiddleware';
import { ProductConstroller } from './product.controller';

const router = express.Router();

router.post('/products', isAuthenticated, isAdmin, validateRequest(ProductValidations.CreateProductValidationSchema), ProductConstroller.createProducts);
router.get('/products', ProductConstroller.getAllProducts);
router.get('/products/:id', ProductConstroller.getProductById);
router.delete('/products/:id', isAuthenticated, isAdmin, ProductConstroller.deleteProduct);
router.put('/products/:id', isAuthenticated, isAdmin, validateRequest(ProductValidations.UpdateProductValidationSchema), ProductConstroller.updateProduct);


export const ProductRoutes = router;