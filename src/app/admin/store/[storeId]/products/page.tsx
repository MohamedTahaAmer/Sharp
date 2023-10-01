import { db } from '@/lib/db';
import { formatTimeToNow, formatter, isUUID } from '@/lib/utils';

import { ProductsClient } from './components/client';
import { ProductColumn } from './components/columns';
import { getOrigin } from '@/lib/utils/serverOnly';
import { redirect } from 'next/navigation';

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
	if (!isUUID(params.storeId)) redirect('/');

	const origin = getOrigin();

	const products = await db.product.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			category: true,
			size: true,
			color: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedProducts: ProductColumn[] = products.map((item) => ({
		id: item.id,
		name: item.name,
		isFeatured: item.isFeatured,
		isArchived: item.isArchived,
		price: formatter.format(item.price),
		category: item.category.name,
		size: item.size.name,
		color: item.color.value,
		createdAt: formatTimeToNow(item.createdAt),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<ProductsClient host={origin} data={formattedProducts} />
			</div>
		</div>
	);
};

export default ProductsPage;
