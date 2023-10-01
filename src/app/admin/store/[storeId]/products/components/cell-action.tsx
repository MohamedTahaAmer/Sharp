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

import { ProductColumn } from './columns';
import { toast } from '@/hooks/use-toast';
import { deleteProduct } from '@/actions/actions.product';

interface CellActionProps {
	data: ProductColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const params = useParams();

	const onConfirm = async () => {
		try {
			setLoading(true);
			await deleteProduct({
				storeId: params.storeId as string,
				productId: data.id,
			});
			toast({ title: 'Product deleted.' });
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
		toast({ title: 'Product ID copied to clipboard.' });
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
							router.push(`/admin/store/${params.storeId}/products/${data.id}`)
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
