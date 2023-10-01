import { z } from 'zod';

export const billboardValidator = z.object({
	label: z.string().min(2),
	imageUrl: z.string().min(2).array(),
});

export type billboardValidatorType = z.infer<typeof billboardValidator>;
