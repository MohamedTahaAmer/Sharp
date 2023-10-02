import { X } from 'lucide-react';
import Image from 'next/image';

import Currency from '@/components/ui/currency';
import IconButton from '@/components/ui/icon-button';
import useCart from '@/hooks/use-cart';
import { Product } from '@/types';

interface CartItemProps {
	data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
	const cart = useCart();

	const onRemove = () => {
		cart.removeItem(data.id);
	};

	return (
		<li className='flex border-b py-6'>
			<div className='relative h-24 w-24 overflow-hidden rounded-md bg-background sm:h-48 sm:w-48'>
				<Image
					fill
					priority
					sizes='500px'
					src={data.imageUrls[0]}
					alt=''
					className='rounded-md object-contain object-center'
				/>
			</div>
			<div className='relative ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
				<div className='absolute right-0 top-0 z-10 '>
					<IconButton
						className='aspect-square text-foreground hover:text-background'
						onClick={onRemove}
						icon={<X size={15} />}
					/>
				</div>
				<div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
					<div className='flex justify-between'>
						<p className=' text-lg font-semibold text-foreground'>
							{data.name}
						</p>
					</div>

					<div className='mt-1 flex text-sm'>
						<p className='text-foreground'>{data.color.name}</p>
						<p className='ml-4 border-l border-background pl-4 text-foreground'>
							{data.size.name}
						</p>
					</div>
					<Currency value={data.price} />
				</div>
			</div>
		</li>
	);
};

export default CartItem;
