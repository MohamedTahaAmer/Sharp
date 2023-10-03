import Container from '@/components/ui/container';
import NoResults from '@/components/ui/no-results';
import ProductCard from '@/components/ui/product-card';

import { STORE_ID } from '@/config';
import { db } from '@/lib/db';
import { shuffleArray } from '@/lib/utils';
import Filter from './components/filter';
import MobileFilters from './components/mobile-filters';

export const revalidate = 0;

interface CategoryPageProps {
	params: {
		categoryId: string;
	};
	searchParams: {
		colorId: string;
		sizeId: string;
	};
}

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
	let products = await db.product.findMany({
		where: {
			storeId: STORE_ID,
			categoryId: params.categoryId,
			colorId: searchParams.colorId,
			sizeId: searchParams.sizeId,
			isArchived: false,
		},
		include: {
			category: {
				include: {
					billboard: true,
				},
			},
			color: true,
			size: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	if (!products.length) return null;

	products = shuffleArray(products);
	const sizes = await db.size.findMany({
		where: {
			storeId: STORE_ID,
		},
	});
	const colors = await db.color.findMany({
		where: {
			storeId: STORE_ID,
		},
	});

	return (
		<div className=' '>
			<Container>
				<div className='px-4 pb-24 pt-4 sm:px-6 lg:px-8'>
					<div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
						<div>
							<MobileFilters sizes={sizes} colors={colors} />
							<div className='hidden lg:block'>
								<Filter valueKey='sizeId' name='Sizes' data={sizes} />
								<Filter valueKey='colorId' name='Colors' data={colors} />
							</div>
						</div>
						<div className='mt-6 lg:col-span-4 lg:mt-0'>
							{products.length === 0 && <NoResults />}
							<div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
								{products.map((item) => (
									<ProductCard key={item.id} data={item} />
								))}
								{products.map((item) => (
									<ProductCard key={item.id} data={item} />
								))}
								{products.map((item) => (
									<ProductCard key={item.id} data={item} />
								))}
								{products.map((item) => (
									<ProductCard key={item.id} data={item} />
								))}
							</div>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

export default CategoryPage;
