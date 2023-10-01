import { type Size } from '@prisma/client';
import { SizeForm } from './components/size-form';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { isUUID } from '@/lib/utils';

const SizePage = async ({
	params,
}: {
	params: { sizeId: string; storeId: string };
}) => {
	if (!isUUID(params.storeId)) redirect('/');

	let size: Size | null = null;
	if (params.sizeId !== 'new') {
		if (!isUUID(params.sizeId)) redirect('/');

		size = await db.size.findUnique({
			where: {
				id: params.sizeId,
			},
		});
	}

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SizeForm initialData={size} />
			</div>
		</div>
	);
};

export default SizePage;
