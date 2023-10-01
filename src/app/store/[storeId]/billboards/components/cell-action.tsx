'use client';

import {
	Copy,
	ClipboardEditIcon as Edit,
	MoreHorizontal,
	Trash,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { deleteBillboard } from '@/actions/actions.billboard';
import { toast } from '@/hooks/use-toast';
import { BillboardColumn } from './columns';

interface CellActionProps {
	data: BillboardColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	type Params = { storeId: string };
	const { storeId } = useParams() as Params;
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const confirmDelete = async () => {
		try {
			setLoading(true);
			await deleteBillboard({ storeId, billboardId: data.id });
			toast({ title: 'Billboard deleted.' });
			router.refresh();
		} catch (error: any) {
			toast({ variant: 'destructive', title: error.message });
		} finally {
			setOpen(false);
			setLoading(false);
		}
	};

	const copy = (id: string) => {
		navigator.clipboard.writeText(id);
		toast({ title: 'Billboard ID copied to clipboard.' });
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={confirmDelete}
				loading={loading}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant='subtle' className='h-8 w-8 rounded-full p-0'>
						<span className='sr-only'>Open menu</span>
						<MoreHorizontal className='h-4 w-4' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuItem onClick={() => copy(data.id)}>
						<Copy className='mr-2 h-4 w-4' /> Copy Id
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() =>
							router.push(`/store/${storeId}/billboards/${data.id}`)
						}
					>
						<Edit className='mr-2 h-4 w-4' /> Update
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setOpen(true)}>
						<Trash className='mr-2 h-4 w-4' /> Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
