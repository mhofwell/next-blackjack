import { Avatar } from './UI/avatar';
import { Text } from './UI/text';
import { Badge } from './UI/badge';
import PlayerTable from './PlayerTable';

export default function PlayerCard() {
    return (
        <div className="border border-gray-800 p-5 rounded-xl">
            <div className="flex pb-5">
                <div className="flex">
                    <Avatar initials={'TH'} className="size-12" />
                    <div className="flex w-auto">
                        <div>
                            <h2 className="text-xl pl-5 pt-1">The Hof</h2>
                            <Text className="pl-5">Rank: 1</Text>
                        </div>
                        <div className="h-auto mt-1">
                            <Badge color="lime" className="ml-5">
                                ACTIVE
                            </Badge>
                            <Badge color="fuchsia" className="ml-2">
                                PAID
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            <PlayerTable />

            <div className="pt-10">
                <h3>Player Details</h3>
                <Text className="text-sm pt-2">
                    Email: michael.hofweller@gmail.com
                </Text>
                <Text className="">Club: Liverpool</Text>
            </div>
        </div>
    );
}
