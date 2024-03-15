const { PrismaClient } = require('@prisma/client');
import { fnln, picks, users } from './seed-data';

const prisma = new PrismaClient();

const defaultTeam = {
    id: 99,
    name: 'UFA',
    avatar: '',
};

async function main() {
    await prisma.team.deleteMany();
    await prisma.entry.deleteMany();
    await prisma.player.deleteMany();
    await prisma.pool.deleteMany();
    await prisma.user.deleteMany();
    // setup the players array
    console.log('Deleted all records in database.');

    let players = [];

    const res = await fetch(
        'https://fantasy.premierleague.com/api/bootstrap-static'
    );
    const eplData = await res.json();

    // filter players from the picks array.
    await eplData.elements.map((player) => {
        picks.forEach((pick) => {
            if (pick === player.second_name) {
                players.push({
                    id: player.id,
                    avatar: '',
                    fn: player.first_name,
                    ln: player.second_name,
                    teamId: player.team,
                });
            }
        });
    });

    await eplData.elements.map((player) => {
        // filter players from the fnln array.
        fnln.forEach((pick) => {
            if (
                pick.fn === player.first_name &&
                pick.ln === player.second_name
            ) {
                players.push({
                    id: player.id,
                    avatar: '',
                    fn: player.first_name,
                    ln: player.second_name,
                    teamId: player.team,
                });
            }
        });
    });

    // search for teams of players we have in the players array.
    const teamArray = await eplData.teams.map((team) => {
        return {
            id: team.id,
            name: team.name,
            avatar: '',
        };
    });

    // this is getting created twice, so we have to remove the duplicate.

    teamArray.push(defaultTeam);

    const dt = await prisma.team.create({
        data: defaultTeam,
    });

    console.log('default team', dt);

    // add team data to the player objects in the players array.
    players.map((player) => {
        teamArray.forEach((team) => {
            if (player.teamId === team.id) {
                player.team_name = team.name;
                player.team_logo = team.logo;
            }
        });
    });

    // insert players into our database.
    for (const player of players) {
        // we have to handle duplicate teams and not create a new one.
        const team = await prisma.team.findUnique({
            where: {
                id: player.teamId,
            },
        });

        let data = {};

        if (!team) {
            data = {
                id: player.id,
                avatar: player.avatar,
                fn: player.fn,
                ln: player.ln,
                team: {
                    create: {
                        id: player.teamId,
                        name: player.team_name,
                        avatar: '',
                    },
                },
            };
        } else if (team) {
            data = {
                id: player.id,
                avatar: player.avatar,
                fn: player.fn,
                ln: player.ln,
                team: {
                    connect: {
                        id: player.teamId,
                    },
                },
            };
        }

        const newPlayer = await prisma.player.create({
            data,
            select: {
                id: true,
                ln: true,
                team: { select: { name: true } },
            },
        });
        console.log(newPlayer);
    }

    //  create users in our database.
    for (const user of users) {
        const newUser = await prisma.user.create({
            data: {
                fn: user.fn,
                ln: user.ln,
                username: `${user.fn} ${user.ln}`,
                email: `${user.fn}@${user.ln}.com`.toLowerCase(),
                paid: 'YES',
                avatar: '',
                team: {
                    connect: {
                        id: defaultTeam.id,
                    },
                },
            },
            select: {
                username: true,
                id: true,
            },
        });
        console.log(newUser);
    }
    // Create pools attached to users.

    const teddyId = await prisma.user.findFirst({
        where: {
            fn: 'Teddy',
        },
        select: {
            id: true,
        },
    });
    console.log("Teddy's Id ", teddyId);

    const pools = await prisma.pool.createMany({
        data: [
            {
                name: 'CANADA',
                userId: teddyId.id,
                season: 2023,
                league: 'PL',
                fee: 15,
                gameweek: 29,
                treasury: 165.00,
                currency: 'CAD',
            },
            {
                name: 'UK',
                userId: teddyId.id,
                season: 2023,
                league: 'PL',
                fee: 15,
                gameweek: 29,
                treasury: 195.00,
                currency: 'GBP',
            },
        ],
    });

    console.log(pools);
    
    // Entries of users attached to pools

    for (const user of users) {
        let entryPicks = [];
        let p;

        const databaseUserId = await prisma.user.findFirst({
            where: {
                ln: user.ln,
                fn: user.fn,
            },
            select: {
                id: true,
            },
        });

        if (user.entry.p1) {
            p = { id: user.entry.p1 };
            entryPicks.push(p);
        }
        if (user.entry.p2) {
            p = { id: user.entry.p2 };
            entryPicks.push(p);
        }
        if (user.entry.p3) {
            p = { id: user.entry.p3 };
            entryPicks.push(p);
        }
        if (user.entry.p4) {
            p = { id: user.entry.p4 };
            entryPicks.push(p);
        }

        const userPool = user.entry.pool;

        console.log('User Pool', userPool);

        const poolId = await prisma.pool.findFirst({
            where: {
                name: userPool,
            },
            select: {
                id: true,
            },
        });

        console.log('Pool Id: ', poolId);

        // Entry data
        const data = {
            pool: {
                connect: {
                    id: poolId.id,
                },
            },
            user: {
                connect: { id: databaseUserId.id },
            },

            players: {
                connect: entryPicks,
            },
        };

        const newEntry = await prisma.entry.create({
            data,
            select: {
                id: true,
                players: {
                    select: {
                        fn: true,
                        ln: true,
                        team: true,
                    },
                },
            },
        });

        console.log(newEntry);
    }
}
main()
    .then(async () => {
        // await sortPools();
        // console.log('Sorted.');
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
