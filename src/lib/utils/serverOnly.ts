import { headers } from 'next/headers';
import { getAuthSession } from '@/lib/auth';

export function getHeaders() {
	const headersList = headers();
	return Object.fromEntries(headersList);

	// - from this return you can access
	// [
	// 	'host',                'connection',
	// 	'cache-control',       'sec-ch-ua',
	// 	'sec-ch-ua-mobile',    'user-agent',
	// 	'next-url',            'sec-ch-ua-platform',
	// 	'accept',              'sec-fetch-site',
	// 	'sec-fetch-mode',      'sec-fetch-dest',
	// 	'referer',             'accept-language',
	// 	'cookie',              'date',
	// 	'x-middleware-invoke', 'x-invoke-path',
	// 	'x-invoke-query',      'x-invoke-output',
	// 	'accept-encoding'
	// ]

	// {
	// 	host: 'localhost:3000',
	// 	connection: 'keep-alive',
	// 	referer: 'http://localhost:3000/store/7f24209f-b552-4039-94f0-1e3600839ad3/colors',
	// 	nextUrl: '/store/7f24209f-b552-4039-94f0-1e3600839ad3/billboards'
	// }
}

export function getOrigin() {
	const { host } = getHeaders();
	const protocol = host.startsWith('localhost') ? 'http://' : 'https://';
	return `${protocol}${host}`;
}

// - call this in routes that are protected using the middleware
// as this assumes that there will allways be a user, and it allways return a string
export async function getUserId() {
	const {
		user: { id: userId },
	} = (await getAuthSession())!;

	return userId;
}

// - call this in routes that aren't protected and you wanna get the userId or you wanna protect it manually
// as debending on the session's existance, it can return null or the userId
export async function getUserIdNotProtected() {
	const session = await getAuthSession();

	return session?.user.id;
}
