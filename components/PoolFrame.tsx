'use server';
import PoolSelector from './PoolSelector';
import ErrorComponent from '@/app/dashboard/error';
import { getSession } from '@/lib/auth/utils';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import PoolData from './PoolData';
export default async function PoolFrame() {
    // get the session
    const session = await getSession();

    // get the user id
    const id: string = session.cuid;

    return (
        <div>
            <ErrorBoundary errorComponent={ErrorComponent}>
                <>
                    <h1 className="text-2xl dark:text-white text-gray-800 font-semibold">Pool Manager</h1>
                    <PoolSelector id={id} />
                    <PoolData />
                </>
            </ErrorBoundary>
        </div>
    );
}
