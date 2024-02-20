import * as argon2 from 'argon2';
// hash a password using
export async function hashPassword(input: string) {
    try {
        const hashedPassword = await argon2.hash(input);
        return hashedPassword;
    } catch (err) {
        console.error(err);
        return null;
    }
}
