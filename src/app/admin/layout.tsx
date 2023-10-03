import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<div className='container mx-auto h-fit min-h-screen max-w-[100rem]  antialiased'>
			{children}
		</div>
	);
}
