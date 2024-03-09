import PoolDataBanner from './PoolDataBanner';
import PlayerCard from './EntryCard';
import PoolSelector from './PoolSelector';
import AllEntriesList from './AllEntriesList';
import { getSelectorOptions } from '@/lib/actions/getSelectorOptions';
import { getSession } from '@/lib/auth/utils';
import { testUser } from '@/test/testdata';

export default async function PoolFrame() {
    // get the session
    const session = await getSession();

    // const id = session.cuid;
    const id = testUser;

    // Server action here to get the data for the PoolSelector.
    const optionsData = await getSelectorOptions(id);

    return (
        <div>
            <div>
                <h1 className="text-2xl font-semibold">Pool Manager</h1>
                {/* Pass in PoolSelector options. */}
                <PoolSelector options={optionsData.options} />
            </div>

            <div className="pt-5 w-full">
                {/* client component handle Selector state change with redux */}
                <PoolDataBanner />
            </div>
            <div className="flex">
                <div className="w-1/2 mt-5 mr-5">
                    {/* listen for state change for activeEntryCard and query the database for info. */}
                    <PlayerCard />
                </div>
                <div className="w-1/2 mt-5 ml-5">
                    {/* client component handle Selector state change with redux */}
                    <AllEntriesList />
                </div>
            </div>
        </div>
    );
}
