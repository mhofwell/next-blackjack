'use client';
import Link from 'next/link';
import AnimatedButton from './AnimatedButton';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LogInSchema } from '@/lib/validator/schema';
import { useEffect, useState } from 'react';
import { logUserIn } from '@/lib/auth/login';
import { useAppDispatch } from '@/lib/store/hooks';
import { setAuthState } from '@/lib/store/slices/auth-slice';
import { useRouter } from 'next/navigation';
import { Avatar } from './UI/avatar';

type LoginCredentials = z.infer<typeof LogInSchema>;

type User = {
    id: string;
    username: string;
    avatar: string;
    email: string;
    team: string;
};

export default function ReactHookForm() {
    const [serverErrors, setServerErrors] = useState<string[]>([]);
    const [loading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginCredentials>({
        resolver: zodResolver(LogInSchema),
    });

    const router = useRouter();
    const dispatch = useAppDispatch();

    const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
        setIsLoading(true);

        const loginResponse = await logUserIn(data);

        // get the login response and set the authentication state in the application
        if (loginResponse === undefined) {
            setServerErrors([
                'An error occurred while trying to log you in. Please try again.',
            ]);
            setIsLoading(false);
            reset();
            return;
        } else if (loginResponse.status !== 200) {
            setServerErrors(loginResponse.errors);
            setIsLoading(false);
            reset();
        } else if (loginResponse.user !== null) {
            const payload: User = {
                username: loginResponse.user.username,
                id: loginResponse.user.id,
                avatar: loginResponse.user.avatar,
                email: loginResponse.user.email,
                team: loginResponse.user.team?.name || 'UFA',
            };
            dispatch(setAuthState(payload));
            router.push('/dashboard');
        }
    };

    useEffect(() => {
        if (serverErrors.length > 0) {
            // console.log('Server Errors', serverErrors);
            setServerErrors(serverErrors);
        }
        if (loading) {
            // console.log('Loading', loading);
            setIsLoading(true);
        }
    }, [serverErrors, loading]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen sm:mx-auto sm:w-full sm:max-w-sm">
            <Avatar
                className="mx-auto size-20 bg-gray-900"
                src={'/group2.png'}
            />
            <h2 className="mt-5 text-center text-gray-700 dark:text-white text-2xl font-semibold leading-9 tracking-tight ">
                Welcome Back to
            </h2>
            <h2 className="text-center text-2xl text-gray-700 dark:text-white font-semibold leading-9 tracking-tight ">
                Premiere League Blackjack
            </h2>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                        >
                            Email address
                        </label>
                        <div className="mt-2 ">
                            <input
                                id="email"
                                placeholder="jurgen@klopp.com"
                                autoComplete="email"
                                className="block w-full dark:autofill:shadow-[inset_0_0_0px_1000px_rgb(55,65,81)] rounded-md border-0 py-1.5 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                {...register('email')}
                            />
                            {errors.email?.message && (
                                <p className="text-sm text-red-400">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white "
                            >
                                Password
                            </label>
                            <div className="text-sm"></div>
                        </div>
                        <p className="text-xs text-gray-500 italic">
                            A minimum of 8 characters is required.
                        </p>

                        <div className="mt-2">
                            <input
                                id="password"
                                type="password"
                                placeholder="********"
                                autoComplete="current-password"
                                className="block w-full dark:hover:bg-gray-700 hover:bg-gray-100 rounded-md border-0 py-1.5 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 dark:bg-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                {...register('password')}
                            />
                            {errors.password?.message && (
                                <p className="text-sm text-red-400">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="pt-5">
                        <AnimatedButton loading={loading} text={'Log In'} />
                    </div>
                </form>
                {serverErrors.map((error, index) => (
                    <p key={index} className="text-sm pt-2 text-red-400">
                        {error}
                    </p>
                ))}
                <div>
                    <div className="relative mt-10">
                        <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                        ></div>
                        <div className="relative mb-1 flex justify-center text-sm font-light leading-6">
                            <span className=" text-gray-900 w-auto dark:text-white ">
                                Or continue with
                            </span>
                        </div>
                        <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="mt-2 grid grid-cols-1 mx-20 py-5 gap-4">
                        <a
                            href="#"
                            className="flex w-full items-center justify-center gap-3 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus-visible:ring-transparent"
                        >
                            <svg
                                className="h-5 w-5"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                    fill="#EA4335"
                                />
                                <path
                                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                    fill="#34A853"
                                />
                            </svg>
                            <span className="text-sm font-semibold leading-6">
                                Google
                            </span>
                        </a>
                    </div>
                    <p className="mt-5 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link
                            href="/signup"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Sign-up here.
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
