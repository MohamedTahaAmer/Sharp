import { z } from 'zod';

export const storeValidator = z.object({
	name: z.string().min(2),
});

export type storeValidatorType = z.infer<typeof storeValidator>;
