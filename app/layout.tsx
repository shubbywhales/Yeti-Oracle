     1|import type { Metadata } from 'next';
     2|import type { ReactNode } from 'react';
     3|import './globals.css';
     4|import { Providers } from '@/components/providers';
     5|
     6|export const metadata: Metadata = {
     7|	title: 'Yeti Oracle',
     8|	description: 'Marketplace and prediction hub.',
     9|};
    10|
    11|export default function RootLayout({ children }: { children: ReactNode }) {
    12|	return (
    13|		<html lang="en">
    14|			<body className="min-h-screen bg-background text-foreground">
    15|				<Providers>{children}</Providers>
    16|			</body>
    17|		</html>
    18|	);
    19|}
    20|