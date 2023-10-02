'use client';

import Image from 'next/image';
import { Tab } from '@headlessui/react';
import GalleryTab from './gallery-tab';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';
import usePreviewModal from '@/hooks/use-preview-modal';

interface GalleryProps {
	product: Product;
}

const PreviewGallery: React.FC<GalleryProps> = ({ product }) => {
	const router = useRouter();
	const { onClose } = usePreviewModal();
	function handleClick() {
		onClose();
		router.push(`/product/${product?.id}`);
	}
	return (
		<Tab.Group as='div' className='flex flex-col-reverse'>
			<div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
				<Tab.List className='grid grid-cols-4 gap-6'>
					{product.imageUrls.map((image) => (
						<GalleryTab key={image} image={image} />
					))}
				</Tab.List>
			</div>
			<Tab.Panels className='aspect-square w-full'>
				{product.imageUrls.map((image, index) => (
					<Tab.Panel key={image}>
						<div
							onClick={handleClick}
							className='relative aspect-square h-full w-full overflow-hidden  bg-background sm:rounded-lg'
						>
							<Image
								priority
								fill
								sizes='500px'
								src={image}
								alt={`Prduct Image Number ${index + 1}`}
								className='rounded-md object-contain object-center hover:cursor-pointer'
							/>
						</div>
					</Tab.Panel>
				))}
			</Tab.Panels>
		</Tab.Group>
	);
};

export default PreviewGallery;
