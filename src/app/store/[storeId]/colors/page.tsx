
import { db } from '@/lib/db';

import { formatTimeToNow, isUUID } from '@/lib/utils';
import { getOrigin } from '@/lib/utils/serverOnly';
import { redirect } from 'next/navigation';
import { ColorsClient } from './components/client';
import { ColorColumn } from './components/columns';

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
	if (!isUUID(params.storeId)) redirect('/');

	const origin = getOrigin();
	const colors = await db.color.findMany({
		where: {
			storeId: params.storeId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedColors: ColorColumn[] = colors.map((item) => ({
		id: item.id,
		name: item.name,
		value: item.value,
		createdAt: formatTimeToNow(item.createdAt),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<ColorsClient host={origin} data={formattedColors} />
			</div>
		</div>
	);
};

export default ColorsPage;
