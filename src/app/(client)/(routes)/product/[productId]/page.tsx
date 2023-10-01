import Gallery from '@/components/Gallery';
import Info from '@/components/info';
import ProductList from '@/components/product-list';
import Container from '@/components/ui/container';
import getProduct from '@/lib/db/get-product';
import getProducts from '@/lib/db/get-products';

export const revalidate = 0;

interface ProductPageProps {
	params: {
		productId: string;
	};
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
	const product = await getProduct(params.productId);
	const suggestedProducts = await getProducts({
		categoryId: product?.category?.id,
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
