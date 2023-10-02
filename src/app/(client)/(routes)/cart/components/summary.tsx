'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { STORE_ID } from '@/config';

const Summary = () => {
	const searchParams = useSearchParams();
	const items = useCart((state) => state.items);
	const removeAll = useCart((state) => state.removeAll);

	useEffect(() => {
		if (searchParams.get('success')) {
			toast.success('Payment completed.');
			removeAll();
		}

		if (searchParams.get('canceled')) {
			toast.error('Something went wrong.');
		}
	}, [searchParams, removeAll]);

	const totalPrice = items.reduce((total, item) => {
		return total + Number(item.price);
	}, 0);

	const onCheckout = async () => {
		try {
			const response = await axios.post(`/api/${STORE_ID}/checkout`, {
				productIds: items.map((item) => item.id),
			});

			if (response.status !== 200) {
				throw new Error('Network response was not ok');
			}

			const data = response.data;
			window.location = data.url;
		} catch (error: any) {
			console.error(error.message);
		}
	};

	return (
		<div className='mt-16 rounded-lg bg-background px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
			<h2 className='text-lg font-medium text-foreground'>Order summary</h2>
			<div className='mt-6 space-y-4'>
				<div className='flex items-center justify-between border-t border-background pt-4'>
					<div className='text-base font-medium text-foreground'>
						Order total
					</div>
					<Currency value={totalPrice} />
				</div>
			</div>
			<Button
				onClick={onCheckout}
				disabled={items.length === 0}
				className='mt-6 w-full text-background'
			>
				Checkout
			</Button>
		</div>
	);
};

export default Summary;
