'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Billboard } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
	createBillboard,
	deleteBillboard,
	updateBillboard,
} from '@/actions/actions.billboard';
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
import ImageUpload from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import {
	billboardValidator,
	billboardValidatorType,
} from '@/lib/validators/billboard';
import { arrRemoveValue } from '@/lib/utils';

interface BillboardFormProps {
	initialData: Billboard | null;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
	initialData,
}) => {
	type Params = {
		billboardId: string;
		storeId: string;
	};
	const { storeId, billboardId } = useParams() as Params;
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	// - this is anice hack to use the same component for creating and editing
	const title = initialData ? 'Edit billboard' : 'Create billboard';
	const description = initialData ? 'Edit billboard.' : 'Add a new billboard';
	const toastMessage = initialData
		? 'Billboard updated.'
		: 'Billboard created.';
	const action = initialData ? 'Save changes' : 'Create';

	const form = useForm<billboardValidatorType>({
		resolver: zodResolver(billboardValidator),
		defaultValues: initialData || {
			label: '',
			imageUrl: [],
		},
	});

	const onSubmit = async (data: billboardValidatorType) => {
		try {
			console.log(data.imageUrl);
			setLoading(true);
			if (initialData) {
				await updateBillboard({
					storeId,
					billboardId,
					...data,
				});
			} else {
				await createBillboard({
					storeId,
					...data,
				});
			}
			router.refresh();
			router.push(`/admin/store/${storeId}/billboards`);
			toast({ title: toastMessage });
		} catch (error: any) {
			toast({ variant: 'destructive', title: error.message });
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);
			await deleteBillboard({
				billboardId,
				storeId,
			});
			router.refresh();
			router.push(`/admin/store/${storeId}/billboards`);
			toast({ title: 'Billboard deleted.' });
		} catch (error: any) {
			toast({
				variant: 'destructive',
				title: error.message,
			});
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
					className='w-full space-y-12'
				>
					<FormField
						control={form.control}
						name='imageUrl'
						render={({ field }) => (
							<FormItem
								className='group relative'
								data-state={`${form.formState.errors.imageUrl && 'error'}`}
							>
								<FormLabel>Background image</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value.length ? field.value : []}
										disabled={loading}
										onChange={(urls) => field.onChange(urls)}
										onRemove={(url) =>
											field.onChange(arrRemoveValue(url, field.value))
										}
									/>
								</FormControl>
								<FormMessage className=' animate-fade-down absolute' />
							</FormItem>
						)}
					/>
					<div className='gap-8 md:grid md:grid-cols-3'>
						<FormField
							control={form.control}
							name='label'
							render={({ field }) => (
								<FormItem
									className='group relative'
									data-state={`${form.formState.errors.label && 'error'}`}
								>
									<FormControl>
										<Input
											variant='underLine'
											disabled={loading}
											placeholder='Billboard label*'
											{...field}
										/>
									</FormControl>
									<FormMessage className=' animate-fade-down absolute' />
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={loading} className=' block' type='submit'>
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};
