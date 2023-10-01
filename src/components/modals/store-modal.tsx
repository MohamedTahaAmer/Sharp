'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createStore } from '@/actions/actions.store';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginToast } from '@/hooks/use-custom-toasts';
import { useStoreModal } from '@/hooks/use-store-modal';
import { toast } from '@/hooks/use-toast';
import { authErrors } from '@/lib/errorMessages';
import { delay } from '@/lib/utils';
import { storeValidator, storeValidatorType } from '@/lib/validators/store';
import { usePathname, useRouter } from 'next/navigation';

// < Working with forms using shadcn, react-hook-form, zod, server actions, and latter you meight need to use ReactQuery useMutaion, for optimistic updates

// 1- create the validator => will be passed as a resolver to react-hook-form
// - created in lib/validators/store
export const StoreModal = () => {
	const router = useRouter();
	const currentPath = usePathname();
	const { isOpen, setIsOpen } = useStoreModal();

	const [loading, setLoading] = useState(false);

	// 2- get the form object from useForm()
	const form = useForm<storeValidatorType>({
		resolver: zodResolver(storeValidator),
		defaultValues: {
			name: '',
		},
		mode: 'onSubmit',
	});

	// 3- handle submit, it meight be a mutate from useMutation latter
	// we will pass it to useForm, and it will pass it the form values
	const onSubmit = async (values: storeValidatorType) => {
		try {
			setLoading(true);
			const store = await createStore(values.name);
			toast({});
			setIsOpen(false);
			form.reset();
			router.push(`/admin/store/${store.id}`);
		} catch (err: any) {
			if (err.message === authErrors.notSignedIn) {
				return loginToast();
			}
			return toast({
				title: err.message,
				description: `Couldn't create your post.`,
				variant: 'destructive',
			});
		} finally {
			setLoading(false);
			return;
		}
	};

	const closeAndReOpen = async () => {
		form.reset();

		setIsOpen(false);

		// - clicking the close x will only make an animation, the modal will be closed then opened again
		// the only way to close the modal is to enter a store name, then you click continue, then we will close the modal and not open it again
		if (currentPath === '/') {
			await delay(1);
			setIsOpen(true);
		}
		// > previously the way he was reopening the modal, is by he was accessing the isOpen global state in the ShowStoreModal component, then when ever setIsOpen is called, then this ShowStoreModal will get rerendered and it will set it back to true
		// and this way he had no way to close the modal permenetally without making a server request to another url (other than '/' not to render ShowStoreModal), that will kill the hole app "reset the global isOpen to false"
		// and the ShowStoreModal is rendered only from '/' so if he didn't render it then the modal won't show
		// this way if the ShowStoreModal was rendered any time then itwon't be possible to hide it back
		// and the new way i emplemented it with, is that ShowStoreModal don't import the isOpen global state, it just imports the setIsOpen() so it opens the modal from inside a useEffect after it finishes rendering, then it won't get rerendred again
	};

	return (
		<Modal
			title='Create store'
			description='Add a new store to manage products and categories.'
			isOpen={isOpen}
			onClose={closeAndReOpen}
		>
			<div>
				<div className='space-y-4 py-2 pb-4'>
					<div
						// 4- Creating the form

						className='space-y-2'
					>
						<Form
							// > 1- pass the form object from useForm
							{...form}
						>
							<form
								// > 2- create HTML form element and pass it the return from passing your on submet to useForm
								onSubmit={form.handleSubmit(onSubmit)}
							>
								<FormField
									// > 3- create the form fields, with the control, name, render for each field
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem
											// - each field have a label, input inside a fromControl, message for displaying zod errors
											className='group relative'
											data-state={`${form.formState.errors.name && 'error'}`}
											// https://tailwindcss.com/blog/tailwindcss-v3-2#data-attribute-variants
										>
											{/* <FormLabel className='duration-500'>Name</FormLabel> */}
											<FormControl className=' '>
												<Input
													variant='underLine'
													disabled={loading}
													placeholder='Store Name*'
													// this "...field" adds the onblur, onChange, value, name, ref to this input field
													{...field}
												/>
											</FormControl>
											<FormMessage className=' animate-fade-down absolute' />
											{/* <FormMessage 
											// - how to add arbitrary properties and values
											// https://tailwindcss.com/docs/adding-custom-styles#arbitrary-properties
											className='absolute top-[136px] z-10 block translate-y-8 duration-500 ease-in-out ' /> */}
										</FormItem>
									)}
								/>
								<div
									// > 4- create the button to submit or cansel the form
									className='flex w-full items-center justify-end space-x-2 pt-8'
								>
									<Button
										disabled={loading}
										variant='outline'
										onClick={closeAndReOpen}
										type='button'
									>
										Cancel
									</Button>
									<Button disabled={loading} isLoading={loading} type='submit'>
										Continue
									</Button>
								</div>
							</form>
						</Form>
					</div>
				</div>
			</div>
		</Modal>
	);
};

/*
// < Working with forms using shadcn, react-hook-form, zod, server actions, and latter you meight need to use ReactQuery useMutaion, for optimistic updates
// 1- create the validator => will be passed as a resolver to react-hook-form
// 2- get the form object from useForm()
// 3- handle submit, it meight be a mutate from useMutation latter
	// we will pass it to useForm, and it will pass it the form values
// 4- Creating the form
	// > 1- pass the form object from useForm
	// > 2- create HTML form element and pass it the return from passing your on submet to useForm
	// > 3- create the form fields, with the control, name, render for each field
			// - each field have a label, input inside a fromControl, message for displaying zod errors
	// > 4- create the button to submit or cansel the form 

*/
