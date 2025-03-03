// auth.validations.ts
import { z } from "zod";

const UserRegisterSchema = z.object({
    body: z.object({
        username: z.string().min(3).max(50),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.enum(['user', 'admin']).default('user'),
    })
});

const loginValidationSchema = z.object({
    body: z.object({
        username: z.string().min(3).max(20),
        password: z.string().min(6),
    })
});

const changePasswordValidationSchema = z.object({
    body: z.object({
        currentPassword: z.string().min(6),
        newPassword: z.string().min(6),
    })
});

export const AuthValidations = {
    UserRegisterSchema,
    loginValidationSchema,
    changePasswordValidationSchema
}