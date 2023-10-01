'use client';
import { ThemeProvider } from '@/providers/theme-provider';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface LayoutProps {
	children: ReactNode;
}
const queryClient = new QueryClient();

const Providers = ({ children }: LayoutProps) => {
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider>
				<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
					{children}
				</ThemeProvider>
			</SessionProvider>
		</QueryClientProvider>
	);
};

export default Providers;
