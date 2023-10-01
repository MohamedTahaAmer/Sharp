'use server';

import { getAuthSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { userErrors, authErrors, generalErrors } from '@/lib/errorMessages';

export async function getAuthedUser() {
	const { user } = (await getAuthSession())!;
	if (!user) throw new Error(authErrors.notSignedIn);
	try {
		const dbUser = await db.user.findFirst({
			where: {
				id: user.id,
			},
		});
		return dbUser;
	} catch (err: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}

export async function updateUsername(name: string) {
	const session = (await getAuthSession())!;
	const username = await db.user.findFirst({
		where: {
			username: name,
		},
	});

	if (username) throw new Error(userErrors.userNameIsToken);

	try {
		const dbUser = await db.user.update({
			where: {
				id: session.user.id,
			},
			data: {
				username: name,
			},
		});

		return dbUser;
	} catch (err: any) {
		throw new Error(generalErrors.someWentWrong);
	}
}
