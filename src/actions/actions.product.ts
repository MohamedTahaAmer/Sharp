'use server';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { authErrors, generalErrors, storeErrors } from '@/lib/errorMessages';
import { productValidatorType } from '@/lib/validators/product';

interface CreateProductProps extends productValidatorType {
	storeId: string;
}

export async function createProduct({ storeId, ...data }: CreateProductProps) {
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

		const product = await db.product.create({
			data: {
				storeId,
				...data,
			},
		});

		return product;
	} catch (err: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

interface UpdateProductProps extends productValidatorType {
	productId: string;
	storeId: string;
}

export async function updateProduct({
	productId,
	storeId,
	...data
}: UpdateProductProps) {
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

		const product = await db.product.update({
			where: {
				id: productId,
			},
			data: { ...data },
		});
		return product;
	} catch (err: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

interface DeleteProductProps {
	productId: string;
	storeId: string;
}

export async function deleteProduct({
	productId,
	storeId,
}: DeleteProductProps) {
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

		const product = await db.product.delete({
			where: {
				id: productId,
			},
		});
		return product;
	} catch (err: any) {
		throw new Error(generalErrors.deleteAllFirst);
	}
}
