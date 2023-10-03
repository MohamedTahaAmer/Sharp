'use client';
import axios from 'axios';
import { useEffect } from 'react';

const Page = () => {
	useEffect(() => {
		async function get() {
			const { data } = await axios.get('/api/test');
			console.log(data);
		}
		get();
	}, []);

	return (
		<>
			<div className=''>page</div>
		</>
	);
};

export default Page;
