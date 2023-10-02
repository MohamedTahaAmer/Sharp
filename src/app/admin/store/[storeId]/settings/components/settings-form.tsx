'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Store } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { deleteStore, updateStore } from '@/actions/actions.store';
import { AlertModal } from '@/components/modals/alert-modal';
import { ApiAlert } from '@/components/ui/api-alert';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { storeValidator, storeValidatorType } from '@/lib/validators/store';

interface Props {
	initialData: Store;
}

export const SettingsForm: React.FC<Props> = ({ initialData }) => {
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const form = useForm<storeValidatorType>({
		resolver: zodResolver(storeValidator),
		defaultValues: { name: initialData.name },
	});

	const onSubmit = async (data: storeValidatorType) => {
		try {
			setLoading(true);
			await updateStore({ storeId: initialData.id, newName: data.name });
			router.refresh();
			toast({ title: 'Store updated.' });
		} catch (error: any) {
			toast({ variant: 'destructive', title: error.messaage });
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			await deleteStore(initialData.id);
			router.refresh();
			router.push('/admin');
			toast({ title: 'Store deleted.' });
		} catch (error: any) {
			toast({ variant: 'destructive', title: error.message });
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			<div className='flex items-center justify-between'>
				<Heading
					title='Store settings'
					description='Manage store preferences'
				/>
				<Button
					disabled={loading}
					variant='destructive'
					size='sm'
					onClick={() => setOpen(true)}
				>
					<Trash className='h-4 w-4' />
				</Button>
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full space-y-12'
				>
					<div className='grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2  lg:grid-cols-3'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem
									className='group relative'
									data-state={`${form.formState.errors.name && 'error'}`}
								>
									<FormLabel>Store Name</FormLabel>
									<FormControl>
										<Input variant='underLine' disabled={loading} {...field} />
									</FormControl>
									<FormMessage className=' animate-fade-down absolute' />
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={loading} className='ml-auto'>
						Save changes
					</Button>
				</form>
			</Form>
		</>
	);
};
