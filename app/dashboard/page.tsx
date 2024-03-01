import { Metadata } from 'next';
import SummaryBanner from '../../components/SummaryBanner';
import PoolFrame from '@/components/PoolFrame';

export const metadata: Metadata = {
    title: 'Dasbhoard',
};

export default async function Home() {
    return (
        <div className="h-screen">
            <section className="-mt-32">
                <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 ">
                    <div className="rounded-lg bg-white dark:bg-gray-900 px-5 py-6 shadow sm:px-6">
                        <SummaryBanner />
                    </div>
                </div>
                <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 ">
                    <div className="rounded-lg bg-white dark:bg-gray-900 px-5 py-6 shadow sm:px-6">
                        <div>
                            <PoolFrame />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
