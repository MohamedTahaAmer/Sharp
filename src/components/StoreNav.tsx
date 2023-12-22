import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { MainNav } from './MainNav';
import StoreSwitcher from './StoreSwitcher';
import { UserAccountNav } from './UserAccountNav';
import ThemeToggle from './ThemeToggle';

const StoreNav = async () => {
	const session = await getAuthSession();
	if (!session) {
		return null;
	}
	let user = session.user;

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
