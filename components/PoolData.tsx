'use server';
import PoolDataBanner from './PoolDataBanner';
import { Text } from './UI/text';
import PoolEntryTable from './PoolEntryTable';

export default async function PoolData() {
    return (
        <>
            <div className="pt-5 w-full">
                <div className="  py-5 border border-gray-800 rounded-xl">
                    <div className="mx-auto max-w-7xl px-5">
                        <PoolDataBanner />
                    </div>
                </div>
            </div>
            <div className="flex">
                <div className="w-full mt-5 min-h-[400px] dark:bg-gray-900 border bg-white border-gray-800 rounded-xl ">
                    <div className="mx-auto max-w-7xl p-5 ">
                        <p className="text-xl dark:text-white text-gray-800">
                            Entries
                        </p>
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
