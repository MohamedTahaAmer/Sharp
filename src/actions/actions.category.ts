'use server';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { authErrors, generalErrors, storeErrors } from '@/lib/errorMessages';

interface CreateCategoryProps {
	storeId: string;
	name: string;
	billboardId: string;
}

export async function createCategory({
	storeId,
	name,
	billboardId,
}: CreateCategoryProps) {
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

		const category = await db.category.create({
			data: {
				storeId,
				name,
				billboardId,
			},
		});
		return category;
	} catch (err: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

interface UpdateCategoryProps {
	categoryId: string;
	storeId: string;
	name: string;
	billboardId: string;
}

export async function updateCategory({
	categoryId,
	storeId,
	name,
	billboardId,
}: UpdateCategoryProps) {
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

		const category = await db.category.update({
			where: {
				id: categoryId,
			},
			data: {
				name,
				billboardId,
			},
		});
		return category;
	} catch (err: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

interface DeleteCategoryProps {
	categoryId: string;
	storeId: string;
}

export async function deleteCategory({
	categoryId,
	storeId,
}: DeleteCategoryProps) {
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

		const category = await db.category.delete({
			where: {
				id: categoryId,
			},
		});
		return category;
	} catch (err: any) {
		throw new Error(generalErrors.deleteAllFirst);
	}
}
