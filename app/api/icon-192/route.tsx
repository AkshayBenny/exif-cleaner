// app/api/icon-192/route.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
	return new ImageResponse(
		<div
			style={{
				background: '#fafafa', // Matches your neutral-50 background
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='115' // Scaled to look good inside a 192px box
				height='115'
				viewBox='0 0 24 24'
				fill='none'
				stroke='#171717' // Matches your neutral-900 icon color
				strokeWidth='2'
				strokeLinecap='round'
				strokeLinejoin='round'>
				<path d='m12 22-5.8-1.8C5.4 19.8 5 18.9 5 18.1V7l7-3 7 3v11.1c0 .8-.4 1.7-1.2 2.1L12 22Z' />
				<path d='M12 8v4' />
				<path d='M12 16h.01' />
			</svg>
		</div>,
		{ width: 192, height: 192 },
	)
}
