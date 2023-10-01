'use client';

import { ChevronsUpDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props extends React.ComponentPropsWithoutRef<typeof PopoverTrigger> {
	items: { href: string; label: string; active: boolean }[];
}

export default function NavSwitcher({ className, items = [] }: Props) {
	const path = usePathname();

	const formattedItems = items.map((item) => ({
		label: item.label,
		value: item.href,
	}));

	let currentStore = formattedItems.find(
		(item) => item.label.toLocaleLowerCase() === path.split('/')[3],
	);

	if (!currentStore) currentStore = formattedItems[0];

	const [open, setOpen] = React.useState(false);

	return (
		<div
			className={cn(
				'mr-4 flex grow items-center justify-end lg:hidden',
				className,
			)}
		>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant='transparent'
						size='sm'
						role='combobox'
						aria-expanded={open}
						aria-label='Select a store'
						className={
							'text-xl font-bold focus:ring-transparent active:scale-100  dark:focus:ring-transparent'
						}
					>
						{currentStore?.label}
						<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-[200px] p-0'>
					<Command>
						<CommandList>
							<CommandGroup>
								{formattedItems.map((route) => (
									<CommandItem
										key={route.value}
										className='text-sm hover:cursor-pointer'
									>
										<Link
											href={route.value}
											className={'w-full font-bold'}
											onClick={() => setOpen(false)}
										>
											{route.label}
										</Link>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
