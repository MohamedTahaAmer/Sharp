import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/toaster';
import { ModalProvider } from '@/providers/modal-provider';
import { ReactNode } from 'react';

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
