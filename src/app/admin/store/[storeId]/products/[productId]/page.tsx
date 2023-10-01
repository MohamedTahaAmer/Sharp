import { db } from '@/lib/db';

import { ProductForm } from './components/product-form';
import { isUUID } from '@/lib/utils';
import { redirect } from 'next/navigation';
import type { Product } from '@prisma/client';

const ProductPage = async ({
	params,
}: {
	params: { productId: string; storeId: string };
}) => {
	if (!isUUID(params.storeId)) redirect('/');

	let product: Product | null = null;
	if (params.productId !== 'new') {
		if (!isUUID(params.productId)) redirect('/');

		product = await db.product.findUnique({
			where: {
				id: params.productId,
			},
		});
	}

	const categories = await db.category.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	const sizes = await db.size.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	const colors = await db.color.findMany({
		where: {
			storeId: params.storeId,
		},
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<ProductForm
					categories={categories}
					colors={colors}
					sizes={sizes}
					initialData={product}
				/>
			</div>
		</div>
	);
};

export default ProductPage;
