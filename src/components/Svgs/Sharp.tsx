import type { LucideProps } from 'lucide-react';

const Sharp = (props: LucideProps) => (
	<svg {...props} viewBox='0 0 100 100'>
		<rect
			width='100%'
			height='100%'
			rx='50'
			ry='50'
			fill='white'
			filter='url(#shadow)'
			// className='fill-foreground'
		/>

		<text
			x='50%'
			y='61%'
			fontFamily='Arial, sans-serif'
			fontSize='100'
			fill='dark'
			textAnchor='middle'
			dominantBaseline='middle'
			fontWeight='bold'
			// className='fill-background'
		>
			S
		</text>
	</svg>
);

export default Sharp;
