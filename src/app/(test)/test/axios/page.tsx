'use client';
import axios from 'axios';
import { useEffect } from 'react';

const Page = () => {
	// const { data } = await axios.get(NEXT_PUBLIC_API_URL + '/products');
	useEffect(() => {
		async function get() {
			// - to use relatice urls, then you will have to call your end points from a client component, and after it finishes rendering
			const { data } = await axios.get('/api/test');
			console.log(data);
		}
		get();
	}, []);

	// - using the compelete url, we can call our end points directley from a server component
	// const { data } = await axios.get('http://localhost:3000/api/test');
	return (
		<>
			<div className=''>page</div>
		</>
	);
};

export default Page;
