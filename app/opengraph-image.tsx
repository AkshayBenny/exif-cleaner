import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Image MetaShield Preview'
export const size = {
	width: 1200,
	height: 630,
}

export const contentType = 'image/png'

// This dynamically generates a PNG using JSX and inline SVGs
export default async function Image() {
	return new ImageResponse(
		<div
			style={{
				background: '#fafafa', // Tailwind neutral-50
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily: 'sans-serif',
			}}>
			<div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
				{/* Custom SVG Shield Icon */}
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='96'
					height='96'
					viewBox='0 0 24 24'
					fill='none'
					stroke='#171717' // Tailwind neutral-900
					strokeWidth='2'
					strokeLinecap='round'
					strokeLinejoin='round'>
					<path d='m12 22-5.8-1.8C5.4 19.8 5 18.9 5 18.1V7l7-3 7 3v11.1c0 .8-.4 1.7-1.2 2.1L12 22Z' />
					<path d='M12 8v4' />
					<path d='M12 16h.01' />
				</svg>
				<span
					style={{
						fontSize: 84,
						fontWeight: 800,
						color: '#171717',
						letterSpacing: '-0.05em',
					}}>
					MetaShield
				</span>
			</div>

			<p
				style={{
					fontSize: 42,
					color: '#525252', // Tailwind neutral-600
					marginTop: 40,
					textAlign: 'center',
					maxWidth: '800px',
					lineHeight: 1.4,
				}}>
				Securely view, locate, and strip hidden EXIF metadata from your
				photos.
			</p>
		</div>,
		{
			...size,
		},
	)
}
