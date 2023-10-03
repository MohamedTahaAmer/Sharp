'use client';
import { useStoreModal } from '@/hooks/use-store-modal';
import { useEffect } from 'react';

const ShowStoreModal = () => {
	const { setIsOpen } = useStoreModal();

	useEffect(() => {
		setIsOpen(true);
	}, [setIsOpen]);
	return <></>;
};

// - Strange, this component was named HomeModal, and we was importing it as ShowStoreModal
// > not strange, the default exports can be imported using any name
export default ShowStoreModal;
