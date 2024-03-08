import PoolDataBanner from './PoolDataBanner';
import PlayerCard from './EntryCard';
import PoolSelector from './PoolSelector';
import AllEntriesList from './AllEntriesList';
import { getClient } from '@/lib/apollo/client';
import gql from 'graphql-tag';

type PoolOptions = {
    id: string;
    name: string;
};

const options: PoolOptions[] = [
    {
        id: '1',
        name: 'Pool 1',
    },
    {
        id: '2',
        name: 'Pool 2',
    },
    {
        id: '3',
        name: 'Pool 3',
    },
];

export default async function PoolFrame() {
    // get options for Pool Selector from server
    const variables = {
        input: {
            id: '1',
        },
    };

    // const query = gql`
    //     query GetPoolNames {
    //         getPoolNames {
    //             id
    //             name
    //         }
    //     }
    // `;

    // const { data } = await getClient().query({
    //     query: query,
    //     variables: variables,
    // });

    // console.log(data);

    // const options: PoolOptions[] = data.getPoolNames;

    return (
        <div>
            <h1 className="text-2xl font-semibold">Pool Manager</h1>
            <PoolSelector options={options} />
            <div className="pt-5 w-full">
                <PoolDataBanner />
            </div>
            <div className="flex">
                <div className="w-1/2 mt-5 mr-5">
                    <PlayerCard />
                </div>
                <div className="w-1/2 mt-5 ml-5">
                    <AllEntriesList />
                </div>
            </div>
        </div>
    );
}
