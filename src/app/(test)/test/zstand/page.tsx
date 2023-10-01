'use client';
/*
// - this a way that i would like to use a global state mangaer
// - the same way as react native useState
  //  = 1- no provider wrapper needed to wrap out app
  // = 2- same synatx like useState, but you are obligated to update the state through a function like you would when you update a state depending on it's previous state
*/

import { create } from 'zustand';
import { combine } from 'zustand/middleware';

// eslint-disable-next-line
type InputFunction = (globalCount: number) => number;
type InputPremetive = number;
type Input = InputFunction | InputPremetive;

const useStore = create(
	combine(
		{
			globalCount: 0,
		},
		(set) => ({
			setGlobalCount: (input: Input) => {
				return set((s) => {
					if (typeof input === 'function') {
						return { globalCount: input(s.globalCount) };
					} else {
						return { globalCount: input };
					}
				});
			},
		}),
	),
);

export default function App() {
	const { globalCount, setGlobalCount } = useStore();
	function handleClick() {
		setGlobalCount((prev) => prev + 1);
		setGlobalCount((prev) => prev + 1);
		setGlobalCount((prev) => prev + 1);
		setGlobalCount((prev) => prev - 1);
		setGlobalCount((prev) => prev + 1);
		setGlobalCount(1);
	}

	return (
		<>
			<div className='m-10 border bg-slate-200 p-4 text-lime-800'>
				{globalCount}
			</div>
			<button
				onClick={() => setGlobalCount((prev) => prev + 1)}
				className='m-10 border bg-slate-200 p-4'
			>
				Increment
			</button>
			<button onClick={handleClick} className='m-10 border bg-slate-200 p-4'>
				+3
			</button>
			<button
				onClick={() => setGlobalCount((prev) => prev - 1)}
				className='m-10 border bg-slate-200 p-4'
			>
				Decrement
			</button>
			<button
				onClick={() => setGlobalCount(0)}
				className='m-10 border bg-slate-200 p-4'
			>
				Reset
			</button>
		</>
	);
}
