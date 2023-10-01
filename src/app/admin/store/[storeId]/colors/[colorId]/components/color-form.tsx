'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { type Color } from '@prisma/client';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createColor, deleteColor, updateColor } from '@/actions/actions.color';
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
import { colorNameToHex } from '@/lib/utils/cssColors';
import { colorValidator, colorValidatorType } from '@/lib/validators/color';

interface ColorFormProps {
	initialData: Color | null;
}

export const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
	type Params = {
		storeId: string;
		colorId: string;
	};
	const params = useParams() as Params;
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [colorName, setColorName] = useState(
		initialData ? colorNameToHex(initialData.value) : '',
	);

	const title = initialData ? 'Edit color' : 'Create color';
	const description = initialData ? 'Edit a color.' : 'Add a new color';
	const toastMessage = initialData ? 'Color updated.' : 'Color created.';
	const action = initialData ? 'Save changes' : 'Create';

	const form = useForm<colorValidatorType>({
		resolver: zodResolver(colorValidator),
		defaultValues: initialData || {
			name: '',
			value: '',
		},
	});

	const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setColorName(colorNameToHex(e.target.value));

		// - this would work but it will set the .value for our two inputs, and we wanna set it to the type color only and leave the input with label value with it's name not the hex, the hex will be applied only to the type color input, so we had to bring our own state
		// setValue('name', 'value', { shouldTouch: true })
		// > this '{ shouldTouch: true }' is to apply the new value to the input field
	};

	const onSubmit = async (data: colorValidatorType) => {
		try {
			setLoading(true);
			if (initialData) {
				await updateColor({ ...params, ...data });
			} else {
				await createColor({ storeId: params.storeId, ...data });
			}
			router.refresh();
			router.push(`/admin/store/${params.storeId}/colors`);
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
			await deleteColor({ ...params });
			router.refresh();
			router.push(`/admin/store/${params.storeId}/color`);
			toast({ title: 'Color deleted.' });
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
						color='sm'
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
											placeholder='Color name'
											{...field}
										/>
									</FormControl>
									<FormMessage className=' animate-fade-down absolute' />
								</FormItem>
							)}
						/>
						<div className='flex '>
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
												onInput={handleColorChange}
												variant='underLine'
												disabled={loading}
												placeholder='Color value'
												{...field}
												// value={colorName.length === 0 ? undefined : colorName}
												// - to set the value, you must do it under the ...field to overwrite his value that it sets
											/>
										</FormControl>
										<FormMessage className=' animate-fade-down absolute whitespace-nowrap' />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='value'
								render={({ field }) => (
									<FormItem
										className='group relative grow'
										data-state={`${form.formState.errors.value && 'error'}`}
									>
										<FormLabel>Color Picker</FormLabel>
										<FormControl>
											<Input
												onInput={handleColorChange}
												variant='underLine'
												className='hover:cursor-pointer'
												disabled={loading}
												type='color'
												placeholder={field.value}
												{...field}
												value={colorName.length === 0 ? undefined : colorName}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
					</div>
					<Button disabled={loading} className='ml-auto' type='submit'>
						{action}
					</Button>
				</form>
			</Form>
		</>
	);
};
