'use client';

import { useState } from 'react';
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
	getSortedRowModel,
	SortingState,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	searchKey: string;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	searchKey,
}: DataTableProps<TData, TValue>) {
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = useState<SortingState>([]);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {
			columnFilters,
			sorting,
		},
	});

	return (
		<div>
			<div className='flex items-center py-4'>
				<Input
					// - this is a custom input field 'not part of the table' but it controls the table data, by accessing the table.getColumn().setFilterValue()
					placeholder='Search'
					value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
					onChange={(event) =>
						table.getColumn(searchKey)?.setFilterValue(event.target.value)
					}
					className='max-w-sm'
				/>

				<Select
					onValueChange={(e) => {
						table.setPageSize(+e);
					}}
					defaultValue='10'
				>
					<SelectTrigger className='ml-4 w-[180px]'>
						<SelectValue placeholder='Show 10' />
					</SelectTrigger>
					<SelectContent>
						{[1, 2, 10, 20, 30, 40, 50].map((pageSize) => (
							<SelectItem key={pageSize} value={'' + pageSize}>
								Show {pageSize}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow className='grid-auto' key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead className='h-fit p-0 px-4' key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									/*
								// note that this class will divide the width equally on all the columns
								// - to give a certian column bigger space, access it inside the map and give it 'col-span-2'
									// using conditionals to add certain classes
								// - to give a certin column smaller space, it will be quite hard
									// you can't add custom values for a column size after setting them to be equal in size "although some may span more than one column"
									// so you will make it the base column width 'ex 1/12 => 12 grid column' then you will have to access all other columns and give them their specific size through col-span, other wise all columns with no specific col span will span only 1/12
										// > this will be quite hard, as this table is used for any number of headers so it's cells are all displayed through maping over the incoming data
								// < so it's better to keep this generic table for equal width columns, then if you wanted to have control over the columns width, then you should copy it and make a custom version of it,
									// in this new version, you won't display the cells through map, so you can control the size of each cell
								*/
									className='grid-auto'
									key={row.id}
									// - this is how to apply data attriputes to elements
									// - and this is how to read them in tailwind 'data-[state=selected]:bg-muted'
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell className='truncate p-0 px-4' key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow className='grid-auto'>
								<TableCell className='flex h-full items-center justify-center bg-slate-300 p-0 font-medium '>
									<div>No results.</div>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className='flex items-center justify-end space-x-2 py-4'>
				<Button
					variant='transparent'
					size='sm'
					onClick={table.previousPage}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant='transparent'
					size='sm'
					onClick={table.nextPage}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
}
