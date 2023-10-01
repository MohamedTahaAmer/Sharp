// > https://docs.pmnd.rs/zustand/guides/updating-state#flat-updates

import { create } from 'zustand';
import { combine } from 'zustand/middleware';

// eslint-disable-next-line
type Input = ((isOpen: boolean) => boolean) | boolean;

export const useStoreModal = create(
	combine(
		{
			isOpen: false,
			allowModalClose: false,
		},
		(set) => ({
			setIsOpen: (input: Input) => {
				return set((s) => {
					if (typeof input === 'function') {
						return { isOpen: input(s.isOpen) };
					} else {
						return { isOpen: input };
					}
				});
			},
			setAllowModalClose: (input: Input) => {
				return set((s) => {
					if (typeof input === 'function') {
						return { allowModalClose: input(s.allowModalClose) };
					} else {
						return { allowModalClose: input };
					}
				});
			},
		}),
	),
);
