import { UserNameForm } from '@/components/UserNameForm';
import { getAuthSession } from '@/lib/auth';

export const metadata = {
	title: 'Settings',
	description: 'Manage account and website settings.',
};

export default async function SettingsPage() {
	// - this "!" tells  ts that we are sure that we are sure that we will get the user, as this route will be protected using the middleware
	const { user } = (await getAuthSession())!;

	return (
		<div className='mx-auto max-w-4xl py-12'>
			<div className='grid items-start gap-8'>
				<h1 className='text-3xl font-bold md:text-4xl'>Settings</h1>

				<div className='grid gap-10'>
					<UserNameForm
						user={{
							id: user.id,
							username: user.username || '',
						}}
					/>
				</div>
			</div>
		</div>
	);
}
