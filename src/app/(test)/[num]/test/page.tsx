// 'use client';

import { headers } from 'next/headers';
import RLink from './RLink';
import Refresh from './Refresh';

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const Page = ({ params: { num } }: { params: { num: string } }) => {
	const headersList = headers();
	return (
		<>
			<div className='m-10'>
				{' '}
				{num} - page - {headersList.get('referer')}
			</div>
			{arr.map((el) => (
				<RLink key={el} href={`/${el}/test`} className='border p-4' />
			))}
			<Refresh />
		</>
	);
};

export default Page;
