import EntryTable from './EntryTable';
import { Text } from './UI/text';

export default async function AllPlayersList() {
  
    return (
        <div className=" border border-gray-800 p-5 rounded-xl">
            <div className="mb-3">
                <p className="text-xl">Entries</p>
                <Text className="mt-1">All of the entries in your pool</Text>
            </div>
            <EntryTable />
        </div>
    );
}
