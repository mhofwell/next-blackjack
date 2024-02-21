import { registerSchema } from './authSchema';
import vine, { errors } from '@vinejs/vine';

type SignUpData = {
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
};

type ValidationReturn = {
    validatedOutput: SignUpData | null;
    status: number;
    errorMessage: string[] | string | null;
};

// type Error = {
//     message: string;
// };

export default async function validateSignUpInput(input: SignUpData) {
    let result: ValidationReturn;

    try {
        const inputValidator = vine.compile(registerSchema);
        const output = await inputValidator.validate(input);

        console.log('Validated Form');

        result = {
            validatedOutput: output,
            status: 200,
            errorMessage: null,
        };

        return result;
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            result = {
                validatedOutput: null,
                status: 400,
                errorMessage: error.messages,
            };
            return result;
        }
        result = {
            validatedOutput: null,
            status: 500,
            errorMessage: 'Something went wrong.',
        };
        return result;
    }
}
