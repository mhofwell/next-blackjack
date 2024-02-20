const Query = {
    hello: async (parent: any, args: any, contextValue: any) => {
        const { greeting, prisma } = contextValue;
        console.log('text');
        try {
            return greeting;
        } catch (error) {
            console.error(error);
        }
    },
};

export default Query;
