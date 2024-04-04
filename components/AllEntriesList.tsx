import EntryTable from './EntryTable';
import { Text } from './UI/text';

export default async function AllPlayersList() {
    return (
        <div className="p-5">
            <p className="text-xl">Entries</p>
            <Text className="mt-1">All of the entries in your pool</Text>
            <EntryTable />
        </div>
    );
}
