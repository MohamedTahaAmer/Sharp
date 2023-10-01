import Providers from '@/components/Providers';
import Navbar from '@/components/navbar';
import { ModalProvider } from '@/providers/modal-provider';
import ToastProvider from '@/providers/toast-provider';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
	icons: '/icon.svg',
	title: 'Store',
	description: 'Store - The place for all your purchases.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<Toaster />
			<ModalProvider />
			<Providers>
				<Navbar />
				<div>{children}</div>
			</Providers>
		</>
	);
}
