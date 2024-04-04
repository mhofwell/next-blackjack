'use server';
type PlayerData = {
    id: number;
    fn: string;
    ln: string;
};

type FormattedPlayerData = {
    id: number;
    fn: string;
    ln: string;
    goals: number;
    own_goals: number;
    net_goals: number;
};

export async function updatePlayersWithEplStats(players: PlayerData[]) {
    let formattedArray: FormattedPlayerData[] = [];

    const epl = await fetch(
        'https://fantasy.premierleague.com/api/bootstrap-static/'
    );

    const eplData = await epl.json();

    // for each player in the players array, find the player in the eplData and add the goal stats to the formattedArray

    players.forEach((player: PlayerData) => {
        const playerData = eplData.elements.find((element: { id: number }) => {
            return element.id === player.id;
        });

        if (playerData) {
            formattedArray.push({
                id: player.id,
                fn: player.fn,
                ln: player.ln,
                goals: playerData.goals_scored,
                own_goals: playerData.own_goals,
                net_goals: playerData.goals_scored - playerData.own_goals,
            });
        }
    });
    return formattedArray;
}
