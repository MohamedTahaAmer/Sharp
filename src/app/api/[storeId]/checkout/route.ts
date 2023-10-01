import Stripe from 'stripe';
import { NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';

const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
	// - the OPTIONS http methode is used to get the headers from the server, this headers should contain info about the communications options provided by this server like the allowed request origins, methods, headers ...
	// - the response to this kind of request shouldn't contian any data in the body, but should ship this info in the headers
	return NextResponse.json(null, { headers: corsHeaders });
}

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } },
) {
	const { productIds } = await req.json();
	console.log('\x1b[33m%s\x1b[0m', productIds);

	if (!productIds || productIds.length === 0) {
		return new NextResponse('Product ids are required', { status: 400 });
	}

	console.log('Expression');

	const products = await db.product.findMany({
		where: {
			id: {
				in: productIds,
			},
		},
	});

	const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

	products.forEach((product) => {
		line_items.push({
			quantity: 1,
			price_data: {
				currency: 'USD',
				product_data: {
					name: product.name,
				},
				unit_amount: product.price * 100,
			},
		});
	});

	const order = await db.order.create({
		data: {
			storeId: params.storeId,
			isPaid: false,
			orderItems: {
				create: productIds.map((productId: string) => ({
					product: {
						connect: {
							id: productId,
						},
					},
				})),
			},
		},
	});

	const session = await stripe.checkout.sessions.create({
		line_items,
		mode: 'payment',
		billing_address_collection: 'required',
		phone_number_collection: {
			enabled: true,
		},
		success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
		cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?canceled=1`,
		metadata: {
			orderId: order.id,
		},
	});

	return NextResponse.json(
		{ url: session.url },
		{
			headers: corsHeaders,
		},
	);
}
