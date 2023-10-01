'use client';

import { useEffect, useState } from 'react';

const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

interface CurrencyProps {
	value?: number;
}

const Currency: React.FC<CurrencyProps> = ({ value = 0 }) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return <div className='font-bold line-through'>$00.00</div>;
	}

	return <div className='font-semibold'>{formatter.format(value)}</div>;
};

export default Currency;
