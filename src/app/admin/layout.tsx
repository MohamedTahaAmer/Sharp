import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';
import { ModalProvider } from '@/providers/modal-provider';
import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'E-Commerce Dashboard',
	icons: '/icon.svg',
};

export default function RootLayout({
	children,
	authModal,
}: {
	children: ReactNode;
	authModal: ReactNode;
}) {
	return (
		<div className='container mx-auto h-fit min-h-screen max-w-[100rem]  antialiased'>
			<ModalProvider />
			<Providers>
				{authModal}
				{children}
			</Providers>
			<Toaster />
		</div>
	);
}
