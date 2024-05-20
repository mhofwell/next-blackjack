import PoolEntryTableShared from '@/components/PoolEntryTableShared';

import Footer from '@/components/Footer';
export default function Page() {
    return (
        <div className="flex justify-center bg-no-repeat h-screen">
            <div className="flex flex-col ">
                <div className="w-full mt-5 dark:bg-gray-900 border bg-white border-gray-800 rounded-xl ">
                    <div className="mx-auto max-w-7xl p-5 ">
                        <PoolEntryTableShared />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}
