'use server';

import { revalidatePath } from 'next/cache';

export async function revalidate(path: string) {
	console.log(path);
	revalidatePath('/sf/sdf/sdf');
}

export async function doNothing() {
	console.log('noThing');
	return null;
}
