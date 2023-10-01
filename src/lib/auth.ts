import { db } from '@/lib/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { nanoid } from 'nanoid';
import { NextAuthOptions, getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db),
	session: {
		strategy: 'jwt',
	},

	pages: {
		signIn: '/admin/sign-in',
	},
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.image = token.picture;
				session.user.username = token.username;
			}

			return session;
		},

		async jwt({ token, user, trigger, session }) {
			let dbUser = null;
			// this user object is present only for the first time the user logs in
			if (user) {
				token.id = user.id;

				dbUser = await db.user.update({
					where: {
						id: user.id,
					},
					data: {
						username: nanoid(10),
					},
				});
				// console.log('\x1b[33m%s\x1b[0m', dbUser);
			}

			// once we get into jwt(), we are sure that there is a token, and once we pass the previous if(user) we are sure that there is 'token.id',
			// and if we deleted the user from our db, then dbUser will be null, and we remove the token from the user, by returning null
			// and if the user manullay cleared his cookies or tinkered with it, then he won't get inside this JWT(), as the users token will fail in nextauth sign check, and it will set his token to null
			// once there is no token, the middelware will prevent the user from accessing protected routes
			// - this way we are handling all cases, deleting the user from the db, and the user deleting his token
			dbUser = await db.user.findUnique({
				where: {
					id: token.id,
				},
			});
			if (!dbUser) return null;

			// - there is no need for the triggers any more, as the token is nonger dependant on it's old value, it now depends on the dbUser
			// this "session" is an object sent from the client side "update()"
			if (trigger === 'update') {
				session.username && (token.username = session.username);
				session.image && (token.picture = session.image);
			}

			// note that the token.username is set only when the user signs in or up for the first time, and is only updated when we trigger an update() from the client

			const retToken = {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				picture: dbUser.image,
				username: dbUser.username,
			};

			return retToken;
		},
		redirect() {
			return '/admin';
		},
	},
};

export const getAuthSession = () => getServerSession(authOptions);
