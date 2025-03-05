// routes / index.ts
import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { ProductRoutes } from "../modules/Product/product.route";

const router = Router();
const moduleRoutes = [
    {
        path: '/',
        route: ProductRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes
    },
]
moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;