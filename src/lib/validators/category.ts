import { z } from 'zod';

export const categoryValidator = z.object({
	name: z.string().min(2),
	billboardId: z
		.string()
		.uuid({ message: 'Please Select a Coresponding Billboard.' }),
});

export type categoryValidatorType = z.infer<typeof categoryValidator>;
