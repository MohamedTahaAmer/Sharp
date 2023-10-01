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

	if (!isMounted) {
		return null;
	}

	return (
		<div className='ml-auto flex items-center gap-x-4'>
			<div className='p-1'></div>
			<Button
				onClick={() => router.push('/cart')}
				className='flex h-fit items-center rounded-full bg-foreground px-4 py-2 hover:bg-foreground'
			>
				<ShoppingBag className='aspect-square w-4 text-background' />
				<span className='ml-2 text-sm font-medium text-background'>
					{cart.items.length}
				</span>
			</Button>
		</div>
	);
};

export default NavbarActions;
