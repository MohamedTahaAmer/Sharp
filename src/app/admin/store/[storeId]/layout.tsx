import { redirect } from 'next/navigation';

import StoreNav from '@/components/StoreNav';
import { db } from '@/lib/db';
import { isUUID } from '@/lib/utils';
import { getUserId } from '@/lib/utils/serverOnly';
import { ReactNode } from 'react';

export default async function DashboardLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: { storeId: string };
}) {
	if (!isUUID(params.storeId)) redirect('/');
	/*
with these checks we are forcing the user to get to the his store no matter what
 1- if he went to the home, we redirect him to his store
 2- if he went to /store/wornIdFormat, we redirect him to home
 3- if he went to /store/correctIdFormat, but this id doesn't exist on the store table, we redirect him back to home

 - when he goes to the home
*/

	const userId = await getUserId();
	const store = await db.store.findFirst({
		where: {
			id: params.storeId,
			userId,
		},
	});

	if (!store) {
		redirect('/');
	}

	/*
	// - this a layout for the stores pages, that displays the StoreNav, and also redirects the user to home which will redirect him to his first store if entered any id that we don't have a store for
	// - and if he doesn't have any stores, he will stay on the home page to create a store
		// and it's the third nested layout, fater the provider layout then the reidrector layout, then this is the first one to actually display a UI, and also

	// the main layout is used just for
		// 1- setting the meta headers
		// 2- providers, modals, and toaster
	*/
	return (
		<>
			<StoreNav />
			{children}
		</>
	);
}
