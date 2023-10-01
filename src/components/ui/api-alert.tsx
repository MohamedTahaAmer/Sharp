import { Copy, Server } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface ApiAlertProps {
	title: string;
	description: string;
	variant: 'public' | 'admin';
}

// - here we wanna create the text of the badge by mapping the variant sent to a certain string
// > this ts below is only used to get auto completion while creating the textMap, also preventing us from mapping non variant text
// const textMap: Record<ApiAlertProps['variant'], string> = {
const textMap = {
	public: 'Public',
	admin: 'Admin',
};

// - the variant sent to this ApiAlert isn't the variant used by shadcn-ui badge, so we map our own variant back to a shadcn one
const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
	public: 'secondary',
	admin: 'destructive',
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
	title,
	description,
	variant = 'public',
}) => {
	const onCopy = (description: string) => {
		navigator.clipboard.writeText(description);
		toast({ title: 'API Route copied to clipboard.' });
	};

	return (
		<Alert>
			<Server className='h-4 w-4' />
			<AlertTitle className='flex items-center gap-x-2'>
				{title}
				<Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
			</AlertTitle>
			<AlertDescription className='mt-4 flex items-center justify-between'>
				<code className='rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
					{description}
				</code>
				<Button variant='outline' size='sm' onClick={() => onCopy(description)}>
					<Copy className='h-4 w-4' />
				</Button>
			</AlertDescription>
		</Alert>
	);
};
