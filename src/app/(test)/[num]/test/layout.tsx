import { ReactNode } from "react";

export default function ShopLayout({
	children,
	params: { num },
}: {
	children: ReactNode;
	params: {
		num: string;
	};
}) {
	return (
		<>
			<div className='m-10'>page - {num}</div>
			<section>{children}</section>
		</>
	);
}
