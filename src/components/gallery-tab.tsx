import NextImage from 'next/image';
import { Tab } from '@headlessui/react';

import { cn } from '@/lib/utils';

const GalleryTab = ({ image }: { image: string }) => {
	return (
		<Tab className='relative flex aspect-square cursor-pointer items-center justify-center rounded-md bg-background'>
			{({ selected }) => (
				<div>
					<span className='absolute inset-0 aspect-square h-full w-full overflow-hidden rounded-md bg-slate-200'>
						<NextImage
							fill
							sizes='500px'
							src={image}
							alt=''
							className='rounded-md object-contain object-center'
						/>
					</span>
					<span
						className={cn(
							'absolute inset-0 rounded-md ring-2 ring-offset-2',
							selected ? 'ring-foreground' : 'ring-transparent',
						)}
					/>
				</div>
			)}
		</Tab>
	);
};

export default GalleryTab;
