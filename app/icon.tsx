import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
	width: 32,
	height: 32,
}
export const contentType = 'image/png'

// This dynamically generates the tiny browser tab icon using the exact same SVG shield
export default function Icon() {
	return new ImageResponse(
		<div
			style={{
				background: 'transparent',
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='24'
				height='24'
				viewBox='0 0 24 24'
				fill='none'
				stroke='#171717' // Matches the Tailwind neutral-900 used in your header
				strokeWidth='3' // Made slightly thicker so it reads well at tiny sizes
				strokeLinecap='round'
				strokeLinejoin='round'>
				<path d='m12 22-5.8-1.8C5.4 19.8 5 18.9 5 18.1V7l7-3 7 3v11.1c0 .8-.4 1.7-1.2 2.1L12 22Z' />
				<path d='M12 8v4' />
				<path d='M12 16h.01' />
			</svg>
		</div>,
		{
			...size,
		},
	)
}
