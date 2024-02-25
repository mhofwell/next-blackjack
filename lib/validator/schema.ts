import { z } from 'zod';

export const SignUpSchema = z
    .object({
        username: z
            .string()
            .min(2, { message: 'Username must be greater than 1 character.' })
            .max(20, { message: 'Your username cannot exceed 20 characters.' }),
        email: z.string().email({ message: 'Please use a valid email.' }),
        password: z
            .string()
            .min(8, {
                message: 'Your password must have at least 8 characters.',
            })
            .max(30, { message: 'Password must be less than 30 characters' }),
        password_confirmation: z
            .string()
            .min(8, {
                message: 'Your password must have at least 8 characters.',
            })
            .max(30, { message: 'Password must be less than 30 characters' }),
    })
    .refine(
        (data) => data.password === data.password_confirmation,

        {
            message: 'Passwords must match.',
            path: ['password_confirmation'],
        }
    );
