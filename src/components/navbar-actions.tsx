'use client';

import { ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import useCart from '@/hooks/use-cart';

const NavbarActions = () => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const router = useRouter();
	const cart = useCart();

	return (
		<div className='ml-auto flex items-center gap-x-4'>
			<div className='p-1'></div>
			<Button
				onClick={() => router.push('/cart')}
				className='flex h-fit items-center rounded-full bg-foreground px-4 py-2 text-background hover:border hover:border-foreground hover:bg-background hover:text-foreground'
			>
				<ShoppingBag className='aspect-square w-4' />
				<span className='ml-2 text-sm font-medium'>
					{!isMounted ? 0 : cart.items.length}
				</span>
			</Button>
		</div>
	);
};

export default NavbarActions;
