'use server';
import PoolDataBanner from './PoolDataBanner';
import EntryCard from './EntryCard';
import PoolSelector from './PoolSelector';
import AllEntriesList from './AllEntriesList';
import { getSession } from '@/lib/auth/utils';
import { Suspense } from 'react';
import SpinnerCentered from './UI/spinnerCentered';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import ErrorComponent from '@/app/dashboard/error';

export default async function PoolFrame() {
    // get the session
    const session = await getSession();

    // get the user id
    const id: string = session.cuid;

    return (
        <div>
            <ErrorBoundary errorComponent={ErrorComponent}>
                <div>
                    <h1 className="text-2xl font-semibold">Pool Manager</h1>
                    <PoolSelector id={id} />
                </div>
                <div className="pt-5 w-full">
                    <div className="bg-gray-900 py-5 border border-gray-800 rounded-xl">
                        <div className="mx-auto max-w-7xl">
                            <Suspense fallback={<SpinnerCentered />}>
                                <PoolDataBanner />
                            </Suspense>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div className="w-1/2 mt-5 mr-5 ">
                        <div className="border border-gray-800 p-5 rounded-xl min-h-96">
                            <EntryCard />
                        </div>
                    </div>
                    <div className="w-1/2 mt-5 ml-5 min-h-[600px]">
                        <AllEntriesList />
                    </div>
                </div>
            </ErrorBoundary>
        </div>
    );
}
