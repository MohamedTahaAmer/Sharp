'use client';

import { ColumnDef } from '@tanstack/react-table';

import { CellAction } from './cell-action';

export type ColorColumn = {
	id: string;
	name: string;
	value: string;
	createdAt: string;
};

export const columns: ColumnDef<ColorColumn>[] = [
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'value',
		header: 'Value',
		cell: ({ row }) => (
			<div className='relative flex items-center'>
				<div>
					{row.original.value.slice(0, 1).toUpperCase() +
						row.original.value.slice(1)}
				</div>
				<div className='absolute -right-5 w-1/4 max-w-[80px]'>
					<div
						className='h-4 rounded-sm border'
						style={{ backgroundColor: row.original.value.toLocaleLowerCase() }}
					/>
				</div>
			</div>
		),
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
