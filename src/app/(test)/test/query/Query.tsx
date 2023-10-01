'use client';

import { delay, generateArray, posts as P } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
const posts = P;

const Query = () => {
	const [postId, setPostId] = useState<null | number>(null);
	const postQuery = useQuery({
		queryKey: ['post', postId],
		queryFn: async () => {
			await delay(300);
			return posts.find((el) => el.id === postId);
		},
		initialData: { id: 0, title: 'post 0' },
		cacheTime: 1,
		enabled: !!postId,

		networkMode: 'always',

		keepPreviousData: true,
	});

	let post = <div className=''>Query - {postQuery.data?.title}</div>;
	if (postQuery.isLoading) post = <div>Loading...</div>;
	if (postQuery.isError) post = <div>Error...</div>;
	return (
		<>
			{post}
			{generateArray(4).map((el) => (
				<button
					className='m-1 border bg-slate-200 p-4'
					key={el}
					onClick={() => setPostId(el)}
				>
					get Post {el}
				</button>
			))}
		</>
	);
};

export default Query;
