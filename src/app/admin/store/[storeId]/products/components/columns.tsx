"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUpDown, ArrowUp } from "lucide-react"
let buttonClicks = 0

export type ProductColumn = {
	id: string
	name: string
	price: string
	category: string
	size: string
	color: string
	createdAt: string
	isFeatured: boolean
	isArchived: boolean
}

export const columns: ColumnDef<ProductColumn>[] = [
	{
		accessorKey: "name",

		header: ({ column }) => {
			const handleButtonClick = () => {
				if (buttonClicks === 0) {
					// Initial state, no sorting applied
					column.toggleSorting(true)
					++buttonClicks
				} else if (buttonClicks === 1) {
					// Sorting applied once, toggle sorting to reverse order
					column.toggleSorting(false)
					++buttonClicks
				} else if (buttonClicks === 2) {
					// Sorting applied twice, clear sorting
					column.clearSorting()
					buttonClicks = 0 // Reset button clicks to allow going back to the initial state
				}
			}
			return (
				<Button
					className="pl-0 "
					variant="transparent"
					onClick={handleButtonClick}
				>
					Name
					{buttonClicks === 0 && <ArrowUpDown className="ml-2 h-4 w-4" />}
					{buttonClicks === 1 && <ArrowUp className="ml-2 h-4 w-4" />}
					{buttonClicks === 2 && <ArrowDown className="ml-2 h-4 w-4" />}
				</Button>
			)
		},
	},
	{
		accessorKey: "isArchived",
		header: "Archived",
	},
	{
		accessorKey: "isFeatured",
		header: "Featured",
	},
	{
		accessorKey: "price",
		header: "Price",
	},
	{
		accessorKey: "category",
		header: "Category",
	},
	{
		accessorKey: "size",
		header: "Size",
	},
	{
		accessorKey: "color",
		header: "Color",
		cell: ({ row }) => (
			<div className="relative flex min-h-[20px] min-w-[24px] items-center">
				<div className="hidden md:block">
					{row.original.color.slice(0, 1).toUpperCase() +
						row.original.color.slice(1)}
				</div>
				<div className="absolute right-0 aspect-square w-4">
					<div
						className="h-4 rounded-full border"
						style={{ backgroundColor: row.original.color.toLocaleLowerCase() }}
					/>
				</div>
			</div>
		),
	},
	{
		accessorKey: "createdAt",
		header: "Date",
	},
	{
		id: "actions",
		cell: ({ row }) => <CellAction data={row.original} />,
	},
]
