import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ModalProvider } from '@/providers/modal-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

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
		<html
			lang='en'
			className={cn(
				'bg-background text-slate-900 antialiased',
				inter.className,
			)}
		>
			<body>
				<div className='container mx-auto h-fit min-h-screen max-w-[100rem]  antialiased'>
					<ModalProvider />
					<Providers>
						{authModal}
						{children}
					</Providers>
					<Toaster />
				</div>
			</body>
		</html>
	);
}
