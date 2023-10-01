import { z } from 'zod';

export const colorValidator = z.object({
	name: z.string().min(1),
	value: z.string().min(1),
});

export type colorValidatorType = z.infer<typeof colorValidator>;
