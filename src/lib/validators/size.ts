import { z } from 'zod';

export const sizeValidator = z.object({
	name: z.string().min(1),
	value: z.string().min(1),
});

export type sizeValidatorType = z.infer<typeof sizeValidator>;
