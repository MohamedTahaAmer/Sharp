import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { getUserIdNotProtected } from '@/lib/utils/serverOnly';

export async function POST(req: Request) {
	try {
		const userId = await getUserIdNotProtected();
		const body = await req.json();

		const { name } = body;

		if (!userId) {
			return new NextResponse('Unauthorized', { status: 403 });
		}

		if (!name) {
			return new NextResponse('Name is required', { status: 400 });
		}

		const store = await db.store.create({
			data: {
				name,
				userId,
			},
		});

		return NextResponse.json(store);
	} catch (error) {
		console.log('[STORES_POST]', error);
		return new NextResponse('Internal error', { status: 500 });
	}
}
