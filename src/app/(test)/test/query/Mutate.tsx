'use client';

import { delay, generateArray, posts as P } from '@/lib/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
const posts = P;

const Mutate = () => {
	const [postId, setPostId] = useState<null | number>(null);
	const postQuery = useQuery({
		queryKey: ['post', postId],
		queryFn: async () => {
			await delay(300);
			return posts.find((el) => el.id === postId);
		},
		enabled: !!postId,
	});

	let post = <div className=''>Query - {postQuery.data?.title}</div>;
	if (postQuery.isLoading) post = <div>Loading...</div>;
	if (postQuery.isError) post = <div>Error...</div>;

	const addNewPost = useMutation({
		mutationFn: async (title: string) => {
			await delay(1000);
			posts.push({ id: posts.length, title });
			return posts;
		},
		onMutate: (title: string) => {
			posts.push({ id: posts.length + 1, title });
		},
		onSuccess: (posts) => {
			posts.pop();
		},
	});
	return (
		<>
			{post}
			{generateArray(posts.length).map((el) => (
				<button
					className='m-1 border bg-slate-200 p-4'
					key={el}
					onClick={() => setPostId(el)}
				>
					get Post {el}
				</button>
			))}
			{posts.map((el) => (
				// note that here we aren't fetching the posts by any means, we are just accessing the main posts variable from the memory, and displaying it's content just comes by chance that when useMutate finishes his mutationFn(), the posts in the memory will have been updated before on the use mutaion, then in the mutationFn() then on the on success, then when react finishes the sync code in here and the tyme comes to re-rendering the component due that state update, then as a side effect it will display the current posts from the memory
				// the proper way to handle that is to fetch the posts using reactQuery, then refetch them back onSuccess() for each post being added,
				// but if we fetched the posts using a certain key, then we need a way to purge that cache and let reactquery allow us to refetch the the new posts through a useQuery with the same key
				// and to achieve that (invalidating certain query with it's key so that when it's called agein, we don't get the cache, we make a new request for the data instead) you can use
				// https://tanstack.com/query/v4/docs/react/guides/query-invalidation
				<div key={el.id} className='m-2'>
					<span>Id : {el.id}, </span>
					<span>Title : {el.title}</span>
				</div>
			))}

			<button
				className='mx-5 border bg-slate-200 p-4'
				onClick={() => addNewPost.mutate(`Post ${posts.length + 1}`)}
			>
				addNew
			</button>
		</>
	);
};

export default Mutate;
