'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HTMLAttributes } from 'react';

// - this is how to make your custom component accept all the props that a native element accepts
interface Props extends HTMLAttributes<HTMLAnchorElement> {
	href: string;
}
const RLink = ({ href, ...props }: Props) => {
	const router = useRouter();
	return (
		<Link {...props} onClick={router.refresh} href={href}>
			go to {href}
		</Link>
	);
};

export default RLink;
