import { Billboard } from '@/types';

interface BillboardProps {
	data: Billboard;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
	return (
		<div className='overflow-hidden rounded-xl p-4 sm:p-6 lg:p-8'>
			<div
				style={{ backgroundImage: `url(${data?.imageUrl})` }}
				className='relative aspect-square overflow-hidden rounded-xl bg-slate-100 bg-cover md:aspect-[2.4/1]'
			></div>
		</div>
	);
};

export default Billboard;
