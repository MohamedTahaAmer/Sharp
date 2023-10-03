import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ImagePlus, Trash } from 'lucide-react';

interface ImageUploadProps {
	disabled?: boolean;
	// eslint-disable-next-line
	onChange: (value: string[]) => void;
	// eslint-disable-next-line
	onRemove: (value: string) => void;
	value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
	disabled,
	onChange,
	onRemove,
	value,
}) => {
	const [isMounted, setIsMounted] = useState(false);
	const [urls, setUrls] = useState<string[]>([]);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return (
			<div>
				<div className='mt-6 h-[40px] w-[168px] animate-pulse rounded bg-gray-300'></div>
			</div>
		);
	}

	const onUpload = (result: any) => {
		setUrls((pre) => [...pre, result.info.secure_url]);
	};
	const onClose = () => {
		onChange(urls);
	};

	return (
		<div>
			<div className='mb-4 flex items-center gap-4'>
				{value.map((url) => (
					<div
						key={url}
						className='relative h-[200px] w-[200px] overflow-hidden rounded-md'
					>
						<div className='absolute right-2 top-2 z-10'>
							<Button
								type='button'
								onClick={() => onRemove(url)}
								variant='destructive'
								size='sm'
							>
								<Trash className='h-4 w-4' />
							</Button>
						</div>
						<Image
							fill
							className='object-cover'
							sizes='500px'
							alt='Image'
							src={url}
						/>
					</div>
				))}
			</div>
			<CldUploadWidget
				onUpload={onUpload}
				onClose={onClose}
				uploadPreset='qcygiw03'
			>
				{({ open }) => {
					const onClick = () => {
						// this is a way to assign onClick to open, but you don't wanna calling onClick() to return what open() would return, this way onClick() will return void
						open();
					};

					return (
						<Button
							type='button'
							disabled={disabled}
							variant='subtle'
							onClick={onClick}
						>
							<ImagePlus className='mr-2 h-4 w-4' />
							Upload an Image
						</Button>
					);
				}}
			</CldUploadWidget>
		</div>
	);
};

export default ImageUpload;
