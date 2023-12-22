"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"
import NavSwitcher from "./NavSwitcher"

export function MainNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
	const pathname = usePathname()
	const params = useParams()

	const routes = [
		{
			href: `/store/${params.storeId}`,
			label: "Overview",
			active: pathname === `/admin/store/${params.storeId}`,
		},
		{
			href: `/store/${params.storeId}/billboards`,
			label: "Billboards",
			active: pathname === `/admin/store/${params.storeId}/billboards`,
		},
		{
			href: `/store/${params.storeId}/categories`,
			label: "Categories",
			active: pathname === `/admin/store/${params.storeId}/categories`,
		},
		{
			href: `/store/${params.storeId}/sizes`,
			label: "Sizes",
			active: pathname === `/admin/store/${params.storeId}/sizes`,
		},
		{
			href: `/store/${params.storeId}/colors`,
			label: "Colors",
			active: pathname === `/admin/store/${params.storeId}/colors`,
		},
		{
			href: `/store/${params.storeId}/products`,
			label: "Products",
			active: pathname === `/admin/store/${params.storeId}/products`,
		},
		{
			href: `/store/${params.storeId}/orders`,
			label: "Orders",
			active: pathname === `/admin/store/${params.storeId}/orders`,
		},
		{
			href: `/store/${params.storeId}/settings`,
			label: "Settings",
			active: pathname === `/admin/store/${params.storeId}/settings`,
		},
	]

	return (
		<>
			<nav
				className={cn(
					"lg:blcok hidden items-center space-x-4 lg:flex lg:space-x-6",
					className,
				)}
				{...props}
			>
				{routes.map((route) => (
					<Link
						key={route.href}
						href={`/admin${route.href}`}
						className={cn(
							"text-sm font-medium transition-colors hover:text-primary",
							route.active
								? "text-black dark:text-white"
								: "text-muted-foreground",
						)}
					>
						{route.label}
					</Link>
				))}
			</nav>
			<NavSwitcher items={routes} />
		</>
	)
}
