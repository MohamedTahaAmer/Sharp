import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';
import { ModalProvider } from '@/providers/modal-provider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Sharp',
	description: 'Profesional Suits Store',
	icons: '/icon.svg',
};

export default function RootLayout({
	children,
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
				<ModalProvider />
				<Providers>{children}</Providers>
				<Toaster />
			</body>
		</html>
	);
}
