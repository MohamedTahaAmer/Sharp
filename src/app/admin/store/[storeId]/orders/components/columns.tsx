'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUpDown, ArrowUp } from 'lucide-react';
let buttonClicks = 0;

export type OrderColumn = {
	id: string;
	phone: string;
	address: string;
	isPaid: boolean;
	totalPrice: string;
	products: string;
	createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
	{
		accessorKey: 'products',
		header: 'Products',
	},
	{
		accessorKey: 'phone',
		header: 'Phone',
	},
	{
		accessorKey: 'address',
		header: 'Address',
	},
	{
		accessorKey: 'totalPrice',

		header: ({ column }) => {
			const handleButtonClick = () => {
				if (buttonClicks === 0) {
					// Initial state, no sorting applied
					column.toggleSorting(true);
					++buttonClicks;
				} else if (buttonClicks === 1) {
					// Sorting applied once, toggle sorting to reverse order
					column.toggleSorting(false);
					++buttonClicks;
				} else if (buttonClicks === 2) {
					// Sorting applied twice, clear sorting
					column.clearSorting();
					buttonClicks = 0; // Reset button clicks to allow going back to the initial state
				}
			};
			return (
				<Button
					className='pl-0 '
					variant='transparent'
					onClick={handleButtonClick}
				>
					$$$
					{buttonClicks === 0 && <ArrowUpDown className='ml-2 h-4 w-4' />}
					{buttonClicks === 1 && <ArrowUp className='ml-2 h-4 w-4' />}
					{buttonClicks === 2 && <ArrowDown className='ml-2 h-4 w-4' />}
				</Button>
			);
		},
	},
	{
		accessorKey: 'isPaid',
		header: 'Paid',
	},
];
