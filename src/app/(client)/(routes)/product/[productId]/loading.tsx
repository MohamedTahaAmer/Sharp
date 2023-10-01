import Container from '@/components/ui/container';
import Skeleton from '@/components/ui/skeleton';

const Loading = () => {
	return (
		<Container>
			<div className='h-full w-full p-8'>
				<div className='mx-auto max-w-[75rem] px-4 py-10 sm:px-6 lg:px-8'>
					<div className='md:grid md:grid-cols-3 md:items-start md:gap-x-8'>
						<Skeleton className='col-span-2 aspect-square rounded-xl' />
						<div className='col-span-1 mt-10 h-full min-h-screen w-full  px-4 sm:mt-16 sm:px-0 md:mt-0'>
							<Skeleton className='h-full w-full rounded-xl' />
						</div>
					</div>
					<div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
						<Skeleton className='aspect-square rounded-xl' />
						<Skeleton className='aspect-square rounded-xl' />
						<Skeleton className='aspect-square rounded-xl' />
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Loading;
