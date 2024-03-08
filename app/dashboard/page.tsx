import { Metadata } from 'next';
import PoolFrame from '@/components/PoolFrame';
import Footer from '@/components/Footer';
import OverviewDataBanner from '../../components/OverviewDataBanner';

export const metadata: Metadata = {
    title: 'Dasbhoard',
};

export default async function Dashboard() {
    return (
        <div className="h-screen">
            <section className="-mt-32">
                <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 ">
                    <div className="rounded-lg bg-white dark:bg-gray-900 px-5 py-6 shadow sm:px-6">
                        <OverviewDataBanner />
                    </div>
                </div>
                <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 ">
                    <div className="rounded-lg bg-white dark:bg-gray-900 px-5 py-6 shadow sm:px-6">
                        <div>
                            <PoolFrame />
                        </div>
                    </div>
                    <div className="w-full">
                        <Footer />
                    </div>
                </div>
            </section>
        </div>
    );
}
