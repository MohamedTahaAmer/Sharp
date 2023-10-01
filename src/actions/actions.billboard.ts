'use server';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { authErrors, generalErrors, storeErrors } from '@/lib/errorMessages';

interface CreateBillboardProps {
	storeId: string;
	label: string;
	imageUrl: string[];
}

export async function createBillboard({
	storeId,
	label,
	imageUrl,
}: CreateBillboardProps) {
	const { user } = (await getAuthSession())!;
	if (!user) throw new Error(authErrors.notSignedIn);

	try {
		const storeByUserId = await db.store.findFirst({
			where: {
				id: storeId,
				userId: user.id,
			},
		});

		if (!storeByUserId) {
			throw new Error(storeErrors.storeNotFound);
		}

		const billboard = await db.billboard.create({
			data: {
				label,
				imageUrl,
				storeId,
			},
		});
		return billboard;
	} catch (err: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

interface UpdateBillboardProps {
	billboardId: string;
	storeId: string;
	label: string;
	imageUrl: string[];
}

export async function updateBillboard({
	billboardId,
	storeId,
	label,
	imageUrl,
}: UpdateBillboardProps) {
	const { user } = (await getAuthSession())!;
	if (!user) throw new Error(authErrors.notSignedIn);

	try {
		const storeByUserId = await db.store.findFirst({
			where: {
				id: storeId,
				userId: user.id,
			},
		});

		if (!storeByUserId) {
			throw new Error(storeErrors.storeNotFound);
		}

		const billboard = await db.billboard.update({
			where: {
				id: billboardId,
			},
			data: {
				label,
				imageUrl,
			},
		});
		return billboard;
	} catch (err: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

interface DeleteBillboardProps {
	billboardId: string;
	storeId: string;
}

export async function deleteBillboard({
	billboardId,
	storeId,
}: DeleteBillboardProps) {
	const { user } = (await getAuthSession())!;
	if (!user) throw new Error(authErrors.notSignedIn);

	try {
		const storeByUserId = await db.store.findFirst({
			where: {
				id: storeId,
				userId: user.id,
			},
		});

		if (!storeByUserId) {
			throw new Error(storeErrors.storeNotFound);
		}

		const billboard = await db.billboard.delete({
			where: {
				id: billboardId,
			},
		});
		return billboard;
	} catch (err: any) {
		throw new Error(generalErrors.deleteAllFirst);
	}
}
