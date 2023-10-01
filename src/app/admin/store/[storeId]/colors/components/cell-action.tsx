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

import { deleteColor } from '@/actions/actions.color';
import { toast } from '@/hooks/use-toast';
import { ColorColumn } from './columns';

interface CellActionProps {
	data: ColorColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const router = useRouter();
	const params = useParams();
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const onConfirm = async () => {
		try {
			setLoading(true);
			await deleteColor({
				storeId: params.storeId as string,
				colorId: data.id,
			});
			toast({ title: 'Color deleted.' });
			router.refresh();
		} catch (error: any) {
			toast({ variant: 'destructive', title: error.message });
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	const onCopy = (id: string) => {
		navigator.clipboard.writeText(id);
		toast({ title: 'Color ID copied to clipboard.' });
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onConfirm}
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
					<DropdownMenuItem onClick={() => onCopy(data.id)}>
						<Copy className='mr-2 h-4 w-4' /> Copy Id
					</DropdownMenuItem>
					<DropdownMenuItem
						onClick={() =>
							router.push(`/admin/store/${params.storeId}/colors/${data.id}`)
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
