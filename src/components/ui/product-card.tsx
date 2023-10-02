'use client';

import { MouseEventHandler } from 'react';
import { Expand, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

import Currency from '@/components/ui/currency';
import IconButton from '@/components/ui/icon-button';
import usePreviewModal from '@/hooks/use-preview-modal';
import useCart from '@/hooks/use-cart';
import { Product } from '@/types';
import Image from 'next/image';

interface ProductCard {
	data: Product;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
	const { onOpen } = usePreviewModal();
	const { addItem } = useCart();
	const router = useRouter();

	const handleClick = () => {
		router.push(`/product/${data?.id}`);
	};

	const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.stopPropagation();

		onOpen(data);
	};

	const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.stopPropagation();

		addItem(data);
	};

	return (
		<div
			onClick={handleClick}
			className='group cursor-pointer space-y-4 rounded-xl border bg-background p-3'
		>
			{/* Image & actions */}
			<div className='relative aspect-square rounded-xl bg-slate-100'>
				<Image
					/*
				// - this is a good way to display images
					// 1- it's dimentions is controlled from the parent
						// the parent have a certain width 'from the parent grid container'
						// then it has 'aspect-squer' to give it a height = it's width
					// 2- then we use 'fill + sizes + cover, center' 
						// to make the image fill the space provided from the parent
						
				// so the parent only sets the available space, and the image controls how it's gonna fill that space
				*/
					src={data.imageUrls[0]}
					sizes='500px'
					alt='product Image'
					fill
					className='rounded-xl object-contain object-center'
				/>
				<div className='absolute bottom-5 w-full px-6 opacity-0 transition group-hover:opacity-100'>
					<div className='flex justify-center gap-x-6'>
						<IconButton
							onClick={onPreview}
							className='text-foreground hover:text-background'
							icon={<Expand size={20} />}
						/>
						<IconButton
							onClick={onAddToCart}
							className='text-foreground hover:text-background'
							icon={<ShoppingCart size={20} />}
						/>
					</div>
				</div>
			</div>
			{/* Description */}
			<div>
				<p className='text-lg font-semibold'>{data.name}</p>
				<p className='text-sm text-foreground'>{data.category?.name}</p>
			</div>
			{/* Price & Reiew */}
			<div className='flex items-center justify-between'>
				<Currency value={data?.price} />
			</div>
		</div>
	);
};

export default ProductCard;
