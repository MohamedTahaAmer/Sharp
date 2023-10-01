'use client';

import { delay, generateArray, posts as P } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
const posts = P;

const Invalidate = () => {
	const queryClient = useQueryClient();

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
			posts.push({ id: posts.length + 1, title });
			return [...posts];
		},
		onMutate: (title: string) => {
			posts.push({ id: posts.length + 1, title });
		},
		onSuccess: (posts) => {
			posts.pop();
			// - if we didn't invalidate the posts, then the new posts that we add won't show as postsQuery.data won't change, and will be allways the [...posts] that returned from the first time it ran
			// - this exact:true, is to invalidate the posts only, all other keys like ['posts', postId] won't be invalidated
			queryClient.invalidateQueries({ queryKey: ['posts'], exact: true });
		},
	});

	const postsQuery = useQuery({
		queryKey: ['posts'],
		queryFn: async () => {
			await delay(300);
			// - returning a shallow copy of the posts not it's referance, so that we don't get the new posts unless we re-run this function to get a new copy of the posts
			return [...posts];
		},
	});
	console.log(postsQuery.data?.length);
	console.log(postsQuery.isLoading);
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

			{postsQuery.data?.length &&
				postsQuery.data.map((el) => (
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

export default Invalidate;
