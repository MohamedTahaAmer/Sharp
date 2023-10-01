import Navbar from '@/components/Navbar';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	icons: '/icon.svg',
	title: 'Store',
	description: 'Store - The place for all your purchases.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Navbar />
			<div>{children}</div>
		</>
	);
}
