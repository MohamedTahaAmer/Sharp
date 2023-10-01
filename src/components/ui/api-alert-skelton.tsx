import { Server } from 'lucide-react';

const ApiAlerSkelton = () => {
	return (
		<div className='relative  mt-2  h-[108px] rounded-md border  border-gray-300 bg-background p-4 pl-11'>
			<Server className='absolute left-4 top-4 h-4 w-4' />
			<div className='mb-2 h-[22px] w-[250px] animate-pulse rounded bg-gray-300'></div>
			<div className='mt-4 h-6 w-[832px] animate-pulse rounded bg-gray-300'></div>
		</div>
	);
};

export default ApiAlerSkelton;
