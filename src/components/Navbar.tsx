import Link from 'next/link';

import MainNav from '@/components/main-nav';
import Container from '@/components/ui/container';
import NavbarActions from '@/components/navbar-actions';
import { db } from '@/lib/db';
import { STORE_ID } from '@/config';
import ThemeToggle from './ThemeToggle';
import Image from 'next/image';

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
						<p className='hidden text-3xl font-bold md:block'>SHARP</p>
						<div className='relative aspect-square w-10 overflow-hidden rounded-full md:hidden '>
							<Image
								src='/icon.svg'
								alt='profile'
								fill
								sizes='100px'
								className=' '
							/>
						</div>
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
