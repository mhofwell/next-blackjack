import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { NextRequest, NextResponse } from 'next/server';
import Query from '@/lib/graphql/resolvers/Query';
import Mutation from '@/lib/graphql/resolvers/Mutation';
import Subscription from '@/lib/graphql/resolvers/Subscription';
import typeDefs from '@/lib/graphql/typedefs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import prisma from '../prisma/client';

const schema = makeExecutableSchema({
    resolvers: {
        Query,
        Mutation,
        // Subscription,
    },
    typeDefs,
});

const server = new ApolloServer({ schema });

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async (req, res) => ({
        prisma: prisma,
        greeting: 'hey',
        req,
        res,
    }),
});

export default handler;
