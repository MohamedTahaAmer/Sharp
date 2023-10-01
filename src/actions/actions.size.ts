'use server';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { authErrors, generalErrors, storeErrors } from '@/lib/errorMessages';

interface CreateSizeProps {
	storeId: string;
	name: string;
	value: string;
}

export async function createSize({ storeId, name, value }: CreateSizeProps) {
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

		const size = await db.size.create({
			data: {
				storeId,
				name,
				value,
			},
		});
		return size;
	} catch (err: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

interface UpdateSizeProps {
	sizeId: string;
	storeId: string;
	name: string;
	value: string;
}

export async function updateSize({
	sizeId,
	storeId,
	name,
	value,
}: UpdateSizeProps) {
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

		const size = await db.size.update({
			where: {
				id: sizeId,
			},
			data: {
				name,
				value,
			},
		});
		return size;
	} catch (err: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

interface DeleteSizeProps {
	sizeId: string;
	storeId: string;
}

export async function deleteSize({ sizeId, storeId }: DeleteSizeProps) {
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

		const size = await db.size.delete({
			where: {
				id: sizeId,
			},
		});
		return size;
	} catch (err: any) {
		throw new Error(generalErrors.deleteAllFirst);
	}
}
