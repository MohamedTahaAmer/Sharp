'use server';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { authErrors, generalErrors, storeErrors } from '@/lib/errorMessages';

interface CreateColorProps {
	storeId: string;
	name: string;
	value: string;
}

export async function createColor({ storeId, name, value }: CreateColorProps) {
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

		const color = await db.color.create({
			data: {
				storeId,
				name,
				value,
			},
		});
		return color;
	} catch (err: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

interface UpdateColorProps {
	colorId: string;
	storeId: string;
	name: string;
	value: string;
}

export async function updateColor({
	colorId,
	storeId,
	name,
	value,
}: UpdateColorProps) {
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

		const color = await db.color.update({
			where: {
				id: colorId,
			},
			data: {
				name,
				value,
			},
		});
		return color;
	} catch (err: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

interface DeleteColorProps {
	colorId: string;
	storeId: string;
}

export async function deleteColor({ colorId, storeId }: DeleteColorProps) {
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

		const color = await db.color.delete({
			where: {
				id: colorId,
			},
		});
		return color;
	} catch (err: any) {
		throw new Error(generalErrors.deleteAllFirst);
	}
}
