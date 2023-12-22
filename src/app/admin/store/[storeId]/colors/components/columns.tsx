"use client"

import { ColumnDef } from "@tanstack/react-table"

import { ArrowDown, ArrowUpDown, ArrowUp } from "lucide-react"
import { CellAction } from "./cell-action"
import { Button } from "@/components/ui/button"

export type ColorColumn = {
	id: string
	name: string
	value: string
	createdAt: string
}
let buttonClicks = 0
export const columns: ColumnDef<ColorColumn>[] = [
	{
		accessorKey: "name",

		header: ({ column }) => {
			const handleButtonClick = () => {
				if (buttonClicks === 0) {
					column.toggleSorting(true)
					++buttonClicks
				} else if (buttonClicks === 1) {
					column.toggleSorting(false)
					++buttonClicks
				} else if (buttonClicks === 2) {
					column.clearSorting()
					buttonClicks = 0
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
		accessorKey: "value",
		header: "Value",
		cell: ({ row }) => (
			<div className="relative flex min-h-[20px] min-w-[24px] items-center">
				<div>
					{row.original.value.slice(0, 1).toUpperCase() +
						row.original.value.slice(1)}
				</div>
				<div className="absolute right-0 aspect-square w-4">
					<div
						className="h-4 rounded-full border"
						style={{ backgroundColor: row.original.value.toLocaleLowerCase() }}
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
