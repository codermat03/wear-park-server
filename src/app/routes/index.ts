// routes / index.ts
import { Router } from "express";
import { CategoryRoutes } from "../modules/Product/category.route";
import { AuthRoutes } from "../modules/Auth/auth.route";

const router = Router();
const moduleRoutes = [
    {
        path: '/api',
        route: CategoryRoutes
    },
    {
        path: '/api/auth',
        route: AuthRoutes
    },
]
moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;