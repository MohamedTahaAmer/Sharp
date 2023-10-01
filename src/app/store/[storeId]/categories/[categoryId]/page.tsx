import { type Category } from '@prisma/client';
import { CategoryForm } from './components/category-form';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { isUUID } from '@/lib/utils';

const CategoryPage = async ({
	params,
}: {
	params: { categoryId: string; storeId: string };
}) => {
	if (!isUUID(params.storeId)) redirect('/');

	let category: Category | null = null;
	if (params.categoryId !== 'new') {
		if (!isUUID(params.categoryId)) redirect('/');

		category = await db.category.findUnique({
			where: {
				id: params.categoryId,
			},
		});
	}

	const billboards = await db.billboard.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<CategoryForm billboards={billboards} initialData={category} />
			</div>
		</div>
	);
};

export default CategoryPage;
