import { MouseEventHandler } from 'react';

import { cn } from '@/lib/utils';
import { Button } from './button';

interface IconButtonProps {
	onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
	icon: React.ReactElement;
	className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
	onClick,
	icon,
	className,
}) => {
	return (
		<Button
			onClick={onClick}
			className={cn(
				'flex items-center justify-center rounded-full border bg-background p-2 shadow-md transition hover:scale-125',
				className,
			)}
		>
			{icon}
		</Button>
	);
};

export default IconButton;
