'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Category } from '@/types';
import NavSwitcher from './NavSwitcher';

interface MainNavProps {
	data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
	const pathname = usePathname();

	const routes = data.map((route) => ({
		href: `/category/${route.id}`,
		label: route.name,
		active: pathname === `/category/${route.id}`,
	}));

	return (
		<nav className='w-full'>
			<div className='mx-6 hidden items-center space-x-4 sm:flex lg:space-x-6'>
				{routes.map((route) => (
					<Link
						key={route.href}
						href={route.href ?? '/'}
						className={cn(
							'text-xl font-medium transition-colors hover:text-foreground',
							route.active
								? 'font-bold text-foreground underline decoration-foreground underline-offset-[6px]'
								: 'text-foreground',
						)}
					>
						{route.label}
					</Link>
				))}
			</div>
			<div className='flex items-center justify-end sm:hidden'>
				<NavSwitcher items={routes} />
			</div>
		</nav>
	);
};

export default MainNav;
