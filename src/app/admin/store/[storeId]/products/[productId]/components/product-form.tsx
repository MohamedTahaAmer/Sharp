'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Category, Color, Product, Size } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
	createProduct,
	deleteProduct,
	updateProduct,
} from '@/actions/actions.product';
import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import ImageUpload from '@/components/ui/image-upload';
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
	productValidator,
	productValidatorType,
} from '@/lib/validators/product';

interface ProductFormProps {
	initialData: Product | null;
	categories: Category[];
	colors: Color[];
	sizes: Size[];
}

export const ProductForm: React.FC<ProductFormProps> = ({
	initialData,
	categories,
	sizes,
	colors,
}) => {
	type Params = {
		storeId: string;
		productId: string;
	};
	const params = useParams() as Params;
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const title = initialData ? 'Edit product' : 'Create product';
	const description = initialData ? 'Edit a product.' : 'Add a new product';
	const toastMessage = initialData ? 'Product updated.' : 'Product created.';
	const action = initialData ? 'Save changes' : 'Create';

	const defaultValues = initialData
		? {
				...initialData,
				price: parseFloat(String(initialData?.price)),
		  }
		: {
				name: '',
				imageUrls: [],
				price: undefined,
				categoryId: '',
				colorId: '',
				sizeId: '',
				isFeatured: false,
				isArchived: false,
		  };

	const form = useForm<productValidatorType>({
		resolver: zodResolver(productValidator),
		defaultValues,
	});

	const onSubmit = async (data: productValidatorType) => {
		try {
			setLoading(true);
			if (initialData) {
				await updateProduct({ ...params, ...data });
			} else {
				await createProduct({ storeId: params.storeId, ...data });
			}
			router.refresh();
			router.push(`/admin/store/${params.storeId}/products`);
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
			await deleteProduct({ ...params });
			router.push(`/admin/store/${params.storeId}/products`);
			toast({ title: 'Product deleted.' });
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
					className='w-full space-y-12'
				>
					<FormField
						control={form.control}
						name='imageUrls'
						render={({ field }) => (
							<FormItem
								className='group relative'
								data-state={`${form.formState.errors.imageUrls && 'error'}`}
							>
								<FormLabel>Images</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value.map((url) => url)}
										disabled={loading}
										onChange={(urlsToAdd) =>
											field.onChange([...field.value, ...urlsToAdd])
										}
										onRemove={(urlToRemove) =>
											field.onChange([
												...field.value.filter((url) => url !== urlToRemove),
											])
										}
									/>
								</FormControl>
								<FormMessage className=' animate-fade-down absolute' />
							</FormItem>
						)}
					/>
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
											placeholder='Product name'
											{...field}
										/>
									</FormControl>
									<FormMessage className=' animate-fade-down absolute' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='price'
							render={({ field }) => (
								<FormItem
									className='group relative'
									data-state={`${form.formState.errors.price && 'error'}`}
								>
									<FormLabel>Price</FormLabel>
									<FormControl>
										<Input
											variant='underLine'
											type='number'
											disabled={loading}
											placeholder='9.99'
											{...field}
										/>
									</FormControl>
									<FormMessage className=' animate-fade-down absolute' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='categoryId'
							render={({ field }) => (
								<FormItem
									className='group relative'
									data-state={`${form.formState.errors.categoryId && 'error'}`}
								>
									<FormLabel>Category</FormLabel>
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
												<SelectValue placeholder='Select a category' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categories.map((category) => (
												<SelectItem key={category.id} value={category.id}>
													{category.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage className=' animate-fade-down absolute' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='sizeId'
							render={({ field }) => (
								<FormItem
									className='group relative'
									data-state={`${form.formState.errors.sizeId && 'error'}`}
								>
									<FormLabel>Size</FormLabel>
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
												<SelectValue placeholder='Select a size' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{sizes.map((size) => (
												<SelectItem key={size.id} value={size.id}>
													{size.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage className=' animate-fade-down absolute' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='colorId'
							render={({ field }) => (
								<FormItem
									className='group relative'
									data-state={`${form.formState.errors.colorId && 'error'}`}
								>
									<FormLabel>Color</FormLabel>
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
												<SelectValue placeholder='Select a color' />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{colors.map((color) => (
												<SelectItem key={color.id} value={color.id}>
													{color.name}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage className=' animate-fade-down absolute' />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='isFeatured'
							render={({ field }) => (
								<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
									<FormControl>
										<Checkbox
											checked={field.value}
											// @ts-ignore
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className='space-y-1 leading-none'>
										<FormLabel>Featured</FormLabel>
										<FormDescription>
											This product will appear on the home page
										</FormDescription>
									</div>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='isArchived'
							render={({ field }) => (
								<FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
									<FormControl>
										<Checkbox
											checked={field.value}
											// @ts-ignore
											onCheckedChange={field.onChange}
										/>
									</FormControl>
									<div className='space-y-1 leading-none'>
										<FormLabel>Archived</FormLabel>
										<FormDescription>
											This product will not appear anywhere in the store.
										</FormDescription>
									</div>
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
