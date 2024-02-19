const Mutation = {
    signup: async (parent: any, args: any, contextValue: any) => {
        const { prisma } = contextValue;
        try {
            console.log('Inside signup mutation.');
        } catch (error) {
            console.error(error);
        }
    },
};

export default Mutation;
