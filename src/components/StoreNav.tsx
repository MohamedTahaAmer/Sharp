import { db } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { UserAccountNav } from './UserAccountNav';
import StoreSwitcher from './StoreSwitcher';
import { MainNav } from './MainNav';
import { ThemeToggle } from './ThemeToggle';

const StoreNav = async () => {
	const { user } = (await getAuthSession())!;

	const stores = await db.store.findMany({
		where: {
			userId: user.id,
		},
	});

	return (
		<div className='border-b'>
			<div className='flex h-16 items-center px-4'>
				<StoreSwitcher items={stores} />
				<MainNav className='mx-6' />
				<div className='ml-auto flex items-center space-x-4'>
					<ThemeToggle />
					<UserAccountNav user={user} />
				</div>
			</div>
		</div>
	);
};

export default StoreNav;
