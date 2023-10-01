import ProductList from '@/components/product-list';
import Billboard from '@/components/ui/billboard';
import Container from '@/components/ui/container';
import { BILLBOARD_ID, STORE_ID } from '@/config';
import { db } from '@/lib/db';
import { shuffleArray } from '@/lib/utils';

export const revalidate = 0;

const HomePage = async () => {
	const products = await await db.product.findMany({
		where: {
			storeId: STORE_ID,
			isFeatured: true,
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
	const billboard = await db.billboard.findUnique({
		where: { storeId: STORE_ID, id: BILLBOARD_ID },
	});

	if (!billboard) return null;

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
