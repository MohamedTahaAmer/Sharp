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
			font-family='Arial, sans-serif'
			font-size='100'
			fill='dark'
			text-anchor='middle'
			dominant-baseline='middle'
			font-weight='bold'
			// className='fill-background'
		>
			S
		</text>
	</svg>
);

export default Sharp;
