import { Billboard } from '@/types';
import Image from 'next/image';

interface BillboardProps {
	data: Billboard;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
	if (!data.imageUrl) return null;
	return (
		<div className='mx-2 flex aspect-square justify-center overflow-hidden rounded-xl bg-black p-4 sm:p-6 md:aspect-[2.4/1] lg:p-8 '>
			<Image
				src={data?.imageUrl[0]}
				sizes='500px'
				width={500}
				height={500}
				alt='billboard Image'
				className='w-auto'
			/>
		</div>
	);
};

export default Billboard;
