'use client';
import { usePathname } from 'next/navigation';
import EntryCardShared from './EntryCardShared';

export default function EntryComponent() {
    const pathname = usePathname();

    const parts = pathname.split('/');
    const rank = parts[2]; // 'Rank'
    const id = parts[3]; // 'Entry ID'

    return (
        <div className="w-full flex justify-center">
            <div className="border dark:bg-gray-900 bg-white dark:text-white text-black border-gray-800 p-5 rounded-xl w-full sm:w-2/3 mx-auto">
                <EntryCardShared id={id} rank={rank} />
            </div>
        </div>
    );
}
