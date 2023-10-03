import Stripe from 'stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';

export async function GET() {
	return new NextResponse(`Webhook Error: `);
}
export async function POST(req: Request) {
	const body = await req.text();
	const signature = headers().get('Stripe-Signature') as string;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!,
		);
	} catch (error: any) {
		return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
	}

	const session = event.data.object as Stripe.Checkout.Session;
	const address = session?.customer_details?.address;

	const addressComponents = [
		address?.line1,
		address?.line2,
		address?.city,
		address?.state,
		address?.postal_code,
		address?.country,
	];

	const addressString = addressComponents.filter((c) => c !== null).join(', ');

	if (event.type === 'checkout.session.completed') {
		// eslint-disable-next-line
		const order = await db.order.update({
			where: {
				id: session?.metadata?.orderId,
			},
			data: {
				isPaid: true,
				address: addressString,
				phone: session?.customer_details?.phone || '',
			},
			include: {
				orderItems: true,
			},
		});

		// - archive all the the purshased products
		// const productIds = order.orderItems.map((orderItem) => orderItem.productId);
		// await db.product.updateMany({
		// 	where: {
		// 		id: {
		// 			in: productIds,
		// 		},
		// 	},
		// 	data: {
		// 		isArchived: true,
		// 	},
		// });
	}

	return new NextResponse(null, { status: 200 });
}
