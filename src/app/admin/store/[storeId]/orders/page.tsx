import { db } from '@/lib/db';
import { formatTimeToNow, formatter, isUUID } from '@/lib/utils';

import { OrderClient } from './components/client';
import { OrderColumn } from './components/columns';
import { redirect } from 'next/navigation';

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
	if (!isUUID(params.storeId)) redirect('/');

	const orders = await db.order.findMany({
		where: {
			storeId: params.storeId,
		},
		include: {
			orderItems: {
				include: {
					product: true,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	const formattedOrders: OrderColumn[] = orders.map((item) => ({
		id: item.id,
		phone: item.phone,
		address: item.address,
		products: item.orderItems
			.map((orderItem) => orderItem.product.name)
			.join(', '),
		totalPrice: formatter.format(
			item.orderItems.reduce((total, item) => {
				return total + Number(item.product.price);
			}, 0),
		),
		isPaid: item.isPaid,
		createdAt: formatTimeToNow(item.createdAt),
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<OrderClient data={formattedOrders} />
			</div>
		</div>
	);
};

export default OrdersPage;