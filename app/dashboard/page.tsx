import PoolFrame from '@/components/PoolFrame';
import Footer from '@/components/Footer';
import OverviewDataBanner from '../../components/OverviewDataBanner';
import { Metadata } from 'next';
import { getSession } from '@/lib/auth/utils';
import { redirect } from 'next/navigation';
import { Toaster } from 'react-hot-toast';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Dasbhoard',
};

export default async function Dashboard() {
    const session = await getSession();

    // change this to !auth where we get the session and check the db for the user's session.
    if (!session) {
        redirect('/login');
    }

    const id: string = session.cuid;

    return (
        <div className="h-screen">
            <section className="-mt-32">
                <div className="mx-auto max-w-7xl pb-12 lg:px-8 ">
                    <div className="rounded-lg bg-white dark:bg-gray-900 px-5 py-6 shadow sm:px-6">
                        <OverviewDataBanner id={id} />
                    </div>
                </div>

                <div className="mx-auto max-w-7xl pb-12 lg:px-8 ">
                    <div className="rounded-lg bg-white dark:bg-gray-900 px-5 py-6 shadow sm:px-6">
                        <div>
                            <PoolFrame />
                        </div>
                    </div>
                    <div className="w-full">
                        <Footer />
                    </div>
                    <Toaster
                        position="bottom-right"
                        reverseOrder={true}
                        toastOptions={{
                            success: {
                                icon: '🎉',
                                className: 'text-sm',
                                style: {
                                    borderRadius: '10px',
                                    background: 'rgb(31, 41, 55)',
                                    color: 'rgb(190 242 100)',
                                },
                            },
                            loading: {
                                // icon: '',
                                className: 'text-sm',
                                style: {
                                    borderRadius: '10px',
                                    background: 'rgb(31, 41, 55)',
                                    color: 'rgb(167 139 250)',
                                },
                            },
                            error: {
                                className: 'text-sm',
                                icon: '🤷‍♂️',
                                style: {
                                    borderRadius: '10px',
                                    background: 'rgb(31, 41, 55)',
                                    color: 'rgb(248 113 113)',
                                },
                            },
                        }}
                    />
                </div>
            </section>
        </div>
    );
}
