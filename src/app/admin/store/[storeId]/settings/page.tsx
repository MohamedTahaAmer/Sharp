import { db } from '@/lib/db';
import { getOrigin, getUserId } from '@/lib/utils/serverOnly';
import { isUUID } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { SettingsForm } from './components/settings-form';

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {
	if (!isUUID(params.storeId)) redirect('/');

	const origin = getOrigin();

	const userId = await getUserId();

	const store = await db.store.findFirst({
		where: {
			id: params.storeId,
			userId,
		},
	});

	if (!store) {
		redirect('/');
	}

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SettingsForm host={origin as string} initialData={store} />
			</div>
		</div>
	);
};

export default SettingsPage;
