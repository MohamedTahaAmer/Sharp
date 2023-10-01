import ProductList from '@/components/product-list';
import Billboard from '@/components/ui/billboard';
import Container from '@/components/ui/container';
import getBillboard from '@/lib/db/get-billboard';
import getProducts from '@/lib/db/get-products';
import { shuffleArray } from '@/lib/utils';

export const revalidate = 0;

const HomePage = async () => {
	const products = await getProducts({ isFeatured: true });
	const billboard = await getBillboard('4e67da8a-6a5f-4c8c-a76e-5f3eade7ba36');

	return (
		<Container>
			<div className='space-y-10 pb-10'>
				<Billboard data={billboard} />
				<div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
					<ProductList
						title='Featured Products'
						items={shuffleArray(products)}
					/>
				</div>
			</div>
		</Container>
	);
};

export default HomePage;
