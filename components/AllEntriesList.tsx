import PlayerTable from './EntryTable';
import { Text } from './UI/text';

export default function AllPlayersList() {
    return (
        <div className=" border border-gray-800 p-5 rounded-xl">
            <div className="mb-3">
                <p className="text-xl">All Players</p>
                <Text className="mt-1">
                    Select a player to view their entry details
                </Text>
            </div>
            <PlayerTable />
        </div>
    );
}
