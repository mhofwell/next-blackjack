type EntryStatus = {
    ACTIVE: number;
    BUST: number;
    INACTIVE: number;
    ELIMINATED: number;
};

type Entry = {
    id: string;
    goals: number;
    own_goals: number;
    net_goals: number;
    status: string;
    paid: boolean;
    user: {
        id: string;
        username: string;
    };
};

const entryStatus: EntryStatus = {
    ACTIVE: 1,
    BUST: 2,
    INACTIVE: 3,
    ELIMINATED: 4,
};

export function sortEntries(entries: Entry[]) {
    return entries.sort((a: Entry, b: Entry) => {
        // Sort by status first
        if (
            entryStatus[a.status as keyof EntryStatus] <
            entryStatus[b.status as keyof EntryStatus]
        ) {
            return -1;
        }
        if (
            entryStatus[a.status as keyof EntryStatus] >
            entryStatus[b.status as keyof EntryStatus]
        ) {
            return 1;
        }

        // If status is the same, sort by net_goals
        return b.net_goals - a.net_goals;
    });
}
