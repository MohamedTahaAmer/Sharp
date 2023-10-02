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
		sortingFn: (data1, data2) => {
			const d1 = parseFloat(
				data1.original.totalPrice.slice(1).replaceAll(',', ''),
			);
			const d2 = parseFloat(
				data2.original.totalPrice.slice(1).replaceAll(',', ''),
			);
			const sort = d2 - d1;
			return sort;
		},

		header: ({ column }) => {
			const handleButtonClick = () => {
				if (buttonClicks === 0) {
					column.toggleSorting(true);
					++buttonClicks;
				} else if (buttonClicks === 1) {
					column.toggleSorting(false);
					++buttonClicks;
				} else if (buttonClicks === 2) {
					column.clearSorting();
					buttonClicks = 0;
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
