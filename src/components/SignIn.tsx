import UserAuthForm from '@/components/UserAuthForm';
import { Sharp } from './Svgs';

const SignIn = () => {
	return (
		<div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
			<div className='flex flex-col space-y-2 text-center'>
				<Sharp className='mx-auto aspect-square w-10' />
				<h1 className='text-2xl font-semibold tracking-tight'>
					Welcome to SHARP!
				</h1>
				<p className='mx-auto max-w-xs text-sm'>
					Elevate your professional style with our premium suits, accessories,
					and more.
				</p>
			</div>
			<UserAuthForm />
		</div>
	);
};

export default SignIn;
