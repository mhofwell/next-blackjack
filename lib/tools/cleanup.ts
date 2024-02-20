import prisma from '../prisma/client';

const cleanUp: () => void = async () => {
    await prisma.user.deleteMany();
    console.log('Completed database cleanup.');
};

cleanUp();
