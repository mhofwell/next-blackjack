const Query = {
    hello: async (parent: any, args: any, contextValue: any) => {
        const { greeting, prisma } = contextValue;
        console.log('in the Query');
        try {
            return greeting;
        } catch (error) {
            console.error(error);
        }
    },
};

export default Query;
