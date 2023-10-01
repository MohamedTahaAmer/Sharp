import type { User } from 'next-auth';
// import type { Session, User } from 'next-auth'
// import type { JWT } from 'next-auth/jwt'

type UserId = string;

declare module 'next-auth/jwt' {
	// eslint-disable-next-line
	// interface JWT {
	// 	id: UserId;
	// 	username?: string | null;
	// }

	type JWTWithUser = JWt & {
		id: UserId;
		username?: string | null;
	};

	// eslint-disable-next-line
	type JWT = JWTWithUser | null;
}

declare module 'next-auth' {
	// eslint-disable-next-line
	interface Session {
		user: User & {
			id: UserId;
			username?: string | null;
		};
	}
}
