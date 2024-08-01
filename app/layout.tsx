import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import SessionWrapper from '@/components/SessionWrapper'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'zbyte Wallet SDK',
	description: 'zbyte Wallet SDK example using Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<SessionWrapper>
			<html lang="en">
				<body className={inter.className}>
					{children}
				</body>
			</html>
		</SessionWrapper>
	);
}
