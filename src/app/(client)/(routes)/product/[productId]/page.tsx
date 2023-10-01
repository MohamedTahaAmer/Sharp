import Gallery from '@/components/Gallery';
import Info from '@/components/info';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';
import { STORE_ID } from '@/config';
import { db } from '@/lib/db';

export const revalidate = 0;

interface ProductPageProps {
	params: {
		productId: string;
	};
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
	const product = await db.product.findUnique({
		where: {
			id: params.productId,
		},
		include: {
			category: {
				include: {
					billboard: true,
				},
			},
			size: true,
			color: true,
		},
	});
	const suggestedProducts = await db.product.findMany({
		where: {
			storeId: STORE_ID,
			categoryId: product?.category?.id,
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

	if (!product) {
		return null;
	}

	return (
		<div className=' '>
			<Container>
				<div className='mx-auto max-w-[70rem] px-4 py-10 sm:px-6 lg:px-8'>
					<div className='md:grid md:grid-cols-3 md:items-start md:gap-x-8'>
						<Gallery product={product} />
						<div className='col-span-1 mt-10 px-4 sm:mt-16 sm:px-0 md:mt-0'>
							<Info data={product} />
						</div>
					</div>
					<hr className='my-10' />
					<ProductList title='Related Items' items={suggestedProducts} />
				</div>
			</Container>
		</div>
	);
};

export default ProductPage;
