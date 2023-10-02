import Link from 'next/link';

const ClientFooter = () => {
	return (
		<div className='flex items-center justify-center  bg-foreground  p-6 text-background'>
			<Link href={`/admin`} className=' shadow-md'>
				Admin Area
			</Link>
		</div>
	);
};

export default ClientFooter;
