import { db } from '@/lib/db';

import { formatTimeToNow, isUUID } from '@/lib/utils';
import { getOrigin } from '@/lib/utils/serverOnly';
import { redirect } from 'next/navigation';
import { SizesClient } from './components/client';
import { SizeColumn } from './components/columns';

const SizesPage = async ({ params }: { params: { storeId: string } }) => {
	if (!isUUID(params.storeId)) redirect('/');

	const origin = getOrigin();
	const sizes = await db.size.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedSizes: SizeColumn[] = sizes.map((item) => ({
		id: item.id,
		name: item.name,
		value: item.value,
		createdAt: formatTimeToNow(item.createdAt),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SizesClient host={origin} data={formattedSizes} />
			</div>
		</div>
	);
};

export default SizesPage;
