'use client';

import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import * as React from 'react';
import { Google } from './Svgs';
import { Button } from './ui/button';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

const UserAuthForm = ({ className, ...props }: UserAuthFormProps) => {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const loginWithGoogle = async () => {
		setIsLoading(true);

		try {
			await signIn('google');
		} catch (error) {
			toast({
				title: 'Error',
				description: 'There was an error logging in with Google',
				variant: 'destructive',
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn('flex justify-center', className)} {...props}>
			<Button
				isLoading={isLoading}
				type='button'
				size='sm'
				className='w-full'
				onClick={loginWithGoogle}
				disabled={isLoading}
			>
				{isLoading ? null : <Google className='mr-2 h-4 w-4' />}
				Google
			</Button>
		</div>
	);
};

export default UserAuthForm;
