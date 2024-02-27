import { z } from 'zod';
import { LogInSchema, SignUpSchema } from './schema';
import { ZodIssue } from 'zod';
type SignUpData = z.infer<typeof SignUpSchema>;

type ValidationResponse = {
    validatedOutput: SignUpData | null;
    status: number;
    error: ZodIssue[];
};

export async function validateSignUpInput(input: SignUpData) {
    console.log('validator input', input);
    const result = SignUpSchema.safeParse(input);
    let response: ValidationResponse = {
        validatedOutput: null,
        status: 0,
        error: [],
    };

    if (!result.success) {
        response.status = 400;
        response.error = result.error.issues;
        return response;
    }

    response.validatedOutput = result.data;
    response.status = 200;

    return response;
}

type LoginData = z.infer<typeof LogInSchema>;

export async function validateLoginInput(input: LoginData) {
    console.log('validator input', input);
    const result = SignUpSchema.safeParse(input);
    let response: ValidationResponse = {
        validatedOutput: null,
        status: 0,
        error: [],
    };

    if (!result.success) {
        response.status = 400;
        response.error = result.error.issues;
        return response;
    }

    response.validatedOutput = result.data;
    response.status = 200;

    return response;
}

// cant I just import this schema into the signUp Mutation and validate with Zod there?
