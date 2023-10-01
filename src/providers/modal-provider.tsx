'use client';

import { useEffect, useState } from 'react';
import { StoreModal } from '@/components/modals/store-modal';

export const ModalProvider = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		// this will be displayed in the main layout, so this is the first useEffect to run on our app
		// and we are using it to make the storeModal available to be shown whenever any component changes the isOpen state
		// if any component changed the isOpen state before we made the StoreModal available, then
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<>
			<StoreModal />
		</>
	);
};
