'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import { CellAction } from './cell-action';
import { Button } from '@/components/ui/button';

export type BillboardColumn = {
	id: string;
	label: string;
	createdAt: string;
};

// - this is plain old JS for keeping state,
// - this is to allow sorting asc, des, and the ability to return to the original order
// in here we can't use react hooks, as this is not a react component
let buttonClicks = 0;
export const columns: ColumnDef<BillboardColumn>[] = [
	{
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
					Label
					{buttonClicks === 0 && <ArrowUpDown className='ml-2 h-4 w-4' />}
					{buttonClicks === 1 && <ArrowUp className='ml-2 h-4 w-4' />}
					{buttonClicks === 2 && <ArrowDown className='ml-2 h-4 w-4' />}
				</Button>
			);
		},

		accessorKey: 'label',
	},
	{
		// - the name of the column
		header: 'Date',

		accessorKey: 'createdAt',
		// - this 'accessorKey' is where will this column get it's data, from the data object
		// - both the data and the columns config are passed to tanstack react table
		// - this is also used as the key "header.id" for the header cells
	},
	{
		// - hence the actions doesn't access any data from the data object, then it doesn't need an 'accessorKey' so there is no thing to use as a key 'header.id' for react mapped elements
		// - so we provide it with explecit 'id' to use
		id: 'actions',
		header: 'Actions',

		// this 'row.original' contains the data for that row
		// this cell, displays a react component in there
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
