'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUpDown, ArrowUp } from 'lucide-react';

export type CategoryColumn = {
	id: string;
	name: string;
	billboardLabel: string;
	createdAt: string;
};

let buttonClicks = 0;
export const columns: ColumnDef<CategoryColumn>[] = [
	{
		accessorKey: 'name',

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
					Name
					{buttonClicks === 0 && <ArrowUpDown className='ml-2 h-4 w-4' />}
					{buttonClicks === 1 && <ArrowUp className='ml-2 h-4 w-4' />}
					{buttonClicks === 2 && <ArrowDown className='ml-2 h-4 w-4' />}
				</Button>
			);
		},
	},
	{
		accessorKey: 'billboardLabel',
		header: 'Billboard',

		// - if you wanna give the accessorKey a different name from the name of the assocciated data in the data object, then you can use this methode
		// accessorKey: 'billboard',
		// header: 'Billboard',
		// cell: ({ row }) => row.original.billboardLabel,
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];

// < why may you need to change the 'accessorKey'
// it's only used in the 'header.id' and by default access the corresponding value in the data object,
// so if you wanted the react key to have specific name differernt than the corresponding column data neme, then you can use any 'accessorKey' and then use the 'cell' to get the right value from the data object
// - though i don't see any reason to have a specific react key
