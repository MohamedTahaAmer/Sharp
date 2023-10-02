'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { UserName, UsernameValidator } from '@/lib/validators/username';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { updateUsername } from '@/actions/actions.user';
import { HTMLAttributes } from 'react';
import { userErrors } from '@/lib/errorMessages';

interface UserNameFormProps extends HTMLAttributes<HTMLFormElement> {
	user: Pick<User, 'id' | 'username'>;
}

type FormData = UserName;

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
	const router = useRouter();
	const { update } = useSession();
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(UsernameValidator),
		defaultValues: {
			name: user?.username || '',
		},
	});

	const { mutate, isLoading } = useMutation({
		mutationFn: async ({ name }: FormData) => {
			const payload: FormData = { name };
			update({ username: name });

			const data = await updateUsername(payload.name);
			return data;
		},
		onError: (err: any) => {
			if (err.message === userErrors.userNameIsToken) {
				return toast({
					title: err.message,
					description: 'Please choose another username.',
					variant: 'destructive',
				});
			}

			return toast({
				title: 'Something went wrong.',
				description: 'Your username was not updated. Please try again.',
				variant: 'destructive',
			});
		},
		onSuccess: () => {
			toast({
				description: 'Your username has been updated.',
			});
			// - so that if he returned back to the settings, he finds his new (which is now his current) username populating the input as default
			router.refresh();
			router.back();
			// - so that if we were rendering the username in the page that he navigates to, we refresh this page, to display his new username to hime
			router.refresh();
		},
	});

	return (
		<form
			className={cn(className)}
			// - passing reactQuery mutateFn to react-hook-form handleSubmit
			onSubmit={handleSubmit((e) => mutate(e))}
			{...props}
		>
			<Card>
				<CardHeader>
					<CardTitle>Your username</CardTitle>
					<CardDescription>
						Please enter a display name you are comfortable with.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='relative grid gap-1'>
						<div className='absolute left-0 top-0 z-20 grid h-10 w-8 place-items-center'>
							<span className='text-sm text-foreground'>u/</span>
						</div>
						<Label className='sr-only' htmlFor='name'>
							Name
						</Label>
						<Input
							className='relative z-10 w-[400px] rounded-none border-0 border-b-2 border-slate-400 bg-background pl-6  shadow-md focus-visible:ring-transparent group-data-[state=error]:border-red-500'
							id='name'
							size={32}
							{...register('name')}
						/>
						{errors?.name && (
							<p className='animate-fade-down absolute top-[42px] px-1 text-sm font-medium text-red-600'>
								{errors.name.message}
							</p>
						)}
					</div>
				</CardContent>
				<CardFooter className='mt-4'>
					<Button isLoading={isLoading}>Change name</Button>
				</CardFooter>
			</Card>
		</form>
	);
}
