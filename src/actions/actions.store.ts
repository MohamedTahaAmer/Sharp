'use server';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { authErrors, generalErrors } from '@/lib/errorMessages';

export async function createStore(name: string) {
	const { user } = (await getAuthSession())!;
	if (!user) throw new Error(authErrors.notSignedIn);

	try {
		const store = db.store.create({
			data: {
				name,
				userId: user.id,
			},
		});
		return store;
	} catch (err: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

export async function updateStore({
	storeId,
	newName,
}: {
	storeId: string;
	newName: string;
}) {
	const { user } = (await getAuthSession())!;
	if (!user) throw new Error(authErrors.notSignedIn);

	try {
		const store = await db.store.update({
			where: {
				id: storeId,
				userId: user.id,
			},
			data: {
				name: newName,
			},
		});
		return store
	} catch (err: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

export async function deleteStore(storeId: string) {
	const { user } = (await getAuthSession())!;
	if (!user) throw new Error(authErrors.notSignedIn);

	try {
		const store = await db.store.deleteMany({
			where: {
				id: storeId,
				userId: user.id,
			},
		});
		return store
	} catch (err: any) {
		throw new Error(generalErrors.deleteAllFirst);
	}
}
