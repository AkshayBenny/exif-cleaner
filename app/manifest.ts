// app/manifest.ts
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Image MetaShield',
		short_name: 'MetaShield',
		description:
			'Securely strip hidden EXIF metadata from your photos offline.',
		start_url: '/',
		display: 'standalone',
		background_color: '#fafafa',
		theme_color: '#171717',
		icons: [
			{
				src: '/api/icon-192', // Points to your new API route
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/api/icon-512', // Points to your new API route
				sizes: '512x512',
				type: 'image/png',
			},
		],
	}
}
