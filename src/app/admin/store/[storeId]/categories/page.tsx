
import { db } from '@/lib/db';
import { formatTimeToNow, isUUID } from '@/lib/utils';
import { getOrigin } from '@/lib/utils/serverOnly';
import { redirect } from 'next/navigation';
import { CategoriesClient } from './components/client';
import { CategoryColumn } from './components/columns';

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
	const origin = getOrigin();
	if (!isUUID(params.storeId)) redirect('/');
	const categories = await db.category.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			billboard: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedCategories: CategoryColumn[] = categories.map((item) => ({
		id: item.id,
		name: item.name,
		billboardLabel: item.billboard.label,
		createdAt: formatTimeToNow(item.createdAt),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<CategoriesClient host={origin} data={formattedCategories} />
			</div>
		</div>
	);
};

export default CategoriesPage;
