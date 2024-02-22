import { registerSchema } from './authSchema';
import vine, { errors } from '@vinejs/vine';

type SignUpData = {
    username: FormDataEntryValue | null;
    email: FormDataEntryValue | null;
    password: FormDataEntryValue | null;
    password_confirmation: FormDataEntryValue | null;
};

type ValidationReturn = {
    validatedOutput: SignUpData | null;
    status: number;
    error: string[];
};

// type Error = {
//     message: string;
// };

export default async function validateSignUpInput(input: SignUpData) {
    let result: ValidationReturn = {
        validatedOutput: null,
        status: 0,
        error: [],
    };

    try {
        const inputValidator = vine.compile(registerSchema);
        const output = await inputValidator.validate(input);

        console.log('Validated Form');

        result.validatedOutput = output;
        result.status = 200;

        return result;
    } catch (error) {
        if (error instanceof errors.E_VALIDATION_ERROR) {
            result.status = 400;
            result.error = error.messages;
            return result;
        }
        result.status = 500;
        result.error = ['Something went wrong.'];

        return result;
    }
}
