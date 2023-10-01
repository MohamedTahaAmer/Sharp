import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { getUserIdNotProtected } from '@/lib/utils/serverOnly';

export async function PATCH(
	req: Request,
	{ params }: { params: { storeId: string } },
) {
	try {
		const userId = await getUserIdNotProtected();
		const body = await req.json();

		const { name } = body;

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		const store = await db.store.updateMany({
			where: {
				id: params.storeId,
				userId,
			},
			data: {
				name,
			},
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log('[STORE_PATCH]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { storeId: string } },
) {
	try {
		const userId = await getUserIdNotProtected();

		if (!userId) {
			return new NextResponse('Unauthenticated', { status: 403 });
		}

		if (!params.storeId) {
			return new NextResponse('Store id is required', { status: 400 });
		}

		const store = await db.store.deleteMany({
			where: {
				id: params.storeId,
				userId,
			},
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log('[STORE_DELETE]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
