import Link from 'next/link';

import MainNav from '@/components/main-nav';
import Container from '@/components/ui/container';
import NavbarActions from '@/components/navbar-actions';
import { ThemeToggle } from './ThemeToggle';
import { db } from '@/lib/db';
import { STORE_ID } from '@/config';

const Navbar = async () => {
	const categories = await db.category.findMany({
		where: { storeId: STORE_ID },
		include: { billboard: true },
	});

	return (
		<div className='border-b'>
			<Container>
				<div className='relative flex h-16 items-center px-4 sm:px-6 lg:px-8'>
					<Link href='/' className='ml-4 flex gap-x-2 lg:ml-0'>
						<p className='text-3xl font-bold'>SHARP</p>
					</Link>
					<MainNav data={categories} />
					<ThemeToggle />

					<NavbarActions />
				</div>
			</Container>
		</div>
	);
};

export default Navbar;
