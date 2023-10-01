import { type Color } from '@prisma/client';
import { ColorForm } from './components/color-form';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import { isUUID } from '@/lib/utils';

const ColorPage = async ({
	params,
}: {
	params: { colorId: string; storeId: string };
}) => {
	if (!isUUID(params.storeId)) redirect('/admin');

	let color: Color | null = null;
	if (params.colorId !== 'new') {
		if (!isUUID(params.colorId)) redirect('/admin');

		color = await db.color.findUnique({
			where: {
				id: params.colorId,
			},
		});
	}

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<ColorForm initialData={color} />
			</div>
		</div>
	);
};

export default ColorPage;
