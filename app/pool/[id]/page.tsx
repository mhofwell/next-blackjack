import PoolEntryTableShared from '@/components/PoolEntryTableShared';

import Footer from '@/components/Footer';
export default function Page() {
    return (
        <div className="flex justify-center bg-no-repeat h-screen">
            <div className="flex flex-col ">
                <div className="w-full mt-5 dark:bg-gray-900 border bg-white border-gray-800 rounded-xl ">
                    <div className="mx-auto max-w-7xl p-5 ">
                        {/* <p className="text-xl dark:text-white text-gray-800">
                        Entries
                        </p>
                        <Text className="mt-1 pb-5" />
                        All of the entries in your pool. Select an entry to learn
                    more. */}
                        <PoolEntryTableShared />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
