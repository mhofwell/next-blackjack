import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StoreProvider from '@/lib/store/StoreProvider';
import './globals.css';
import { ApolloWrapper } from '@/lib/apollo/ApolloWrapper';

export const dynamic = 'force-dynamic';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Premiere League Blackjack',
    description: 'Cards and football.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <ApolloWrapper>
                <StoreProvider>
                    <body className={inter.className}>{children}</body>
                </StoreProvider>
            </ApolloWrapper>
        </html>
    );
}
