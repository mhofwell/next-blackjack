'use server';
import PoolDataBanner from './PoolDataBanner';
import { Text } from './UI/text';
import PoolEntryTable from './PoolEntryTable';

export default async function PoolData() {
    return (
        <>
            <div className="pt-5 w-full">
                <div className="bg-gray-900 py-5 border border-gray-800 rounded-xl">
                    <div className="mx-auto max-w-7xl">
                        <PoolDataBanner />
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="w-full mt-5 min-h-[600px] bg-gray-900 border border-gray-800 rounded-xl ">
                    <div className="mx-auto max-w-7xl p-5">
                        <p className="text-xl">Entries</p>
                        <Text className="mt-1 pb-5">
                            All of the entries in your pool. Select an entry to
                            learn more.
                        </Text>
                        <PoolEntryTable />
                    </div>
                </div>
            </div>
        </>
    );
}
