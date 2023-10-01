'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';

export type CategoryColumn = {
	id: string;
	name: string;
	billboardLabel: string;
	createdAt: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
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
