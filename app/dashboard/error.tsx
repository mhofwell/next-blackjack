'use client'; // Error components must be Client Components

import { ApolloError, GraphQLErrors } from '@apollo/client/errors';
import { useEffect } from 'react';

export default function ErrorComponent({
    error,
    reset,
}: {
    error: (Error & { digest?: string }) | GraphQLErrors | ApolloError;
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        // console.error(error);
    }, [error]);

    return (
        <div className="flex m-16 items-center justify-center ">
            <div role="status" className="pr-2">
                <h2>Something went wrong!</h2>
                {/* <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                >
                    Try again
                </button> */}
            </div>
        </div>
    );
}
