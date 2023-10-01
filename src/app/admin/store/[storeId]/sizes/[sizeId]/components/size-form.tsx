'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Size } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createSize, deleteSize, updateSize } from '@/actions/actions.size';
import { AlertModal } from '@/components/modals/alert-modal';
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
import { sizeValidator, sizeValidatorType } from '@/lib/validators/size';

interface SizeFormProps {
	initialData: Size | null;
}

export const SizeForm: React.FC<SizeFormProps> = ({ initialData }) => {
	type Params = {
		storeId: string;
		sizeId: string;
	};
	const params = useParams() as Params;
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const title = initialData ? 'Edit size' : 'Create size';
	const description = initialData ? 'Edit a size.' : 'Add a new size';
	const toastMessage = initialData ? 'Size updated.' : 'Size created.';
	const action = initialData ? 'Save changes' : 'Create';

	const form = useForm<sizeValidatorType>({
		resolver: zodResolver(sizeValidator),
		defaultValues: initialData || {
			name: '',
			value: '',
		},
	});

	const onSubmit = async (data: sizeValidatorType) => {
		try {
			setLoading(true);
			if (initialData) {
				await updateSize({ ...params, ...data });
			} else {
				await createSize({ storeId: params.storeId, ...data });
			}
			router.refresh();
			router.push(`/admin/store/${params.storeId}/sizes`);
			toast({ title: toastMessage });
		} catch (error: any) {
			toast({ variant: 'destructive', title: error.messaage });
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			await deleteSize({ ...params });
			router.refresh();
			router.push(`/admin/store/${params.storeId}/sizes`);
			toast({ title: 'Size deleted.' });
		} catch (error: any) {
			toast({ variant: 'destructive', title: error.messaage });
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
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						disabled={loading}
						variant='destructive'
						size='sm'
						onClick={() => setOpen(true)}
					>
						<Trash className='h-4 w-4' />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='w-full space-y-8'
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
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											variant='underLine'
											disabled={loading}
											placeholder='Size name'
											{...field}
										/>
									</FormControl>
									<FormMessage className=' animate-fade-down absolute' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='value'
							render={({ field }) => (
								<FormItem
									className='group relative'
									data-state={`${form.formState.errors.value && 'error'}`}
								>
									<FormLabel>Value</FormLabel>
									<FormControl>
										<Input
											variant='underLine'
											disabled={loading}
											placeholder='Size value'
											{...field}
										/>
									</FormControl>
									<FormMessage className=' animate-fade-down absolute' />
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={loading} className='ml-auto' type='submit'>
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};
