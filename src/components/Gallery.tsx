'use client';

import { Product } from '@/types';
import { Tab } from '@headlessui/react';
import Image from 'next/image';
import GalleryTab from './gallery-tab';

interface GalleryProps {
	product: Product;
}

const Gallery: React.FC<GalleryProps> = ({ product }) => {
	return (
		<Tab.Group as='div' className='col-span-2 flex flex-row-reverse'>
			<Tab.Panels className='aspect-square w-full'>
				{product.imageUrls.map((image, index) => (
					<Tab.Panel key={image}>
						<div className='relative aspect-square h-full w-full overflow-hidden bg-slate-200 sm:rounded-lg'>
							<Image
								priority
								fill
								sizes='500px'
								src={image}
								alt={`Prduct Image Number ${index + 1}`}
								className='rounded-md object-contain object-center'
							/>
						</div>
					</Tab.Panel>
				))}
			</Tab.Panels>
			<div className='mx-auto mt-6 hidden max-w-2xl sm:block lg:max-w-none'>
				<Tab.List className='mr-10 flex w-[100px] flex-col gap-y-4'>
					{product.imageUrls.map((image) => (
						<GalleryTab key={image} image={image} />
					))}
				</Tab.List>
			</div>
		</Tab.Group>
	);
};

export default Gallery;
