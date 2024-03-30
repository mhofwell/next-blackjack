import type { Metadata } from 'next';
import StoreProvider from '@/lib/store/StoreProvider';
import './globals.css';
import { ApolloWrapper } from '@/lib/apollo/ApolloWrapper';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Premiere League Blackjack',
    description: 'Cards and football.',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <ApolloWrapper>
                <StoreProvider>
                    <body>{children}</body>
                </StoreProvider>
            </ApolloWrapper>
        </html>
    );
}
