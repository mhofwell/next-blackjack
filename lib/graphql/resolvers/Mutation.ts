import { hashPassword } from '@/lib/tools/password';

const Mutation = {
    signup: async (parent: any, args: any, contextValue: any) => {
        const { prisma } = contextValue;
        try {
            // get user information from args
            const { username, email, password } = args;

            const hash = hashPassword(password);

            console.log('hash', hash);

            const query = `mutation Mutation($input: updatePlayerInput!) {
                updatePlayer(input: $input) {
                    id
                    goals
                    own_goals
                    net_goals
                        }
                    }`;

            // const res = await fetch('', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         query: query,
            //         variables: variables,
            //     }),
            // });

            // const data = await res.json();
            // console.log(data);
            // return obj.data;

            // save user in database with prisma

            // get return value and send status 200.

            // (where req was made) if 200 then go to login page.
            console.log('Inside signup mutation.');
        } catch (error) {
            console.error(error);
        }
    },
};

export default Mutation;
