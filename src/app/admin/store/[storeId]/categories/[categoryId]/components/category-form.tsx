'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Billboard, Category } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
	createCategory,
	deleteCategory,
	updateCategory,
} from '@/actions/actions.category';
import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input, inputVariants } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
	categoryValidator,
	categoryValidatorType,
} from '@/lib/validators/category';

interface CategoryFormProps {
	initialData: Category | null;
	billboards: Billboard[];
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
	initialData,
	billboards,
}) => {
	type Params = {
		categoryId: string;
		storeId: string;
	};
	const params = useParams() as Params;
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const title = initialData ? 'Edit category' : 'Create category';
	const description = initialData ? 'Edit a category.' : 'Add a new category';
	const toastMessage = initialData ? 'Category updated.' : 'Category created.';
	const action = initialData ? 'Save changes' : 'Create';

	const form = useForm<categoryValidatorType>({
		resolver: zodResolver(categoryValidator),
		defaultValues: initialData || {
			name: '',
			billboardId: '',
		},
	});

	const onSubmit = async (data: categoryValidatorType) => {
		try {
			setLoading(true);
			if (initialData) {
				await updateCategory({ ...params, ...data });
			} else {
				await createCategory({ storeId: params.storeId, ...data });
			}
			router.refresh();
			router.push(`/store/${params.storeId}/categories`);
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
			await deleteCategory({ ...params });
			router.refresh();
			router.push(`/store/${params.storeId}/categories`);
			toast({ title: 'Category deleted.' });
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
					<div className='grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2  lg:grid-cols-3'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem
									className='group relative'
									data-state={`${form.formState.errors.name && 'error'}`}
								>
									<FormControl>
										<Input
											variant='underLine'
											disabled={loading}
											placeholder='Category Name*'
											{...field}
										/>
									</FormControl>
									<FormMessage className=' animate-fade-down absolute' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='billboardId'
							render={({ field }) => (
								<FormItem
									className='group relative'
									data-state={`${form.formState.errors.billboardId && 'error'}`}
								>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										defaultValue={
											field.value.length === 0 ? undefined : field.value
										}
									>
										<FormControl>
											<SelectTrigger
												className={cn(
													inputVariants({ variant: 'underLine' }),
													'focus:ring-transparent',
												)}
											>
												<SelectValue placeholder='Select a billboard' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{billboards.map((billboard) => (
												<SelectItem key={billboard.id} value={billboard.id}>
													{billboard.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
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
