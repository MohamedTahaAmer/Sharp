import { db } from '@/lib/db';
import { BillboardForm } from './components/billboard-form';
import { isUUID } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { type Billboard } from '@prisma/client';

const BillboardPage = async ({
	params,
}: {
	params: { billboardId: string; storeId: string };
}) => {
	if (!isUUID(params.storeId)) redirect('/');

	let billboard: Billboard | null = null;
	if (params.billboardId !== 'new') {
		if (!isUUID(params.billboardId)) redirect('/');

		billboard = await db.billboard.findUnique({
			where: {
				// - although we can find the billboard by it's id, but we wanna make sure that the storeId part of the url is the parent store for that billboard
				id: params.billboardId,

				// - after removing the Image model from the scheme, this now gives an error, i think there is no need for that extra check, the billboardId will allways be unique
				// store: {
				// 	id: params.storeId,
				// },
			},
		});
	}

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<BillboardForm initialData={billboard} />
			</div>
		</div>
	);
};

export default BillboardPage;
