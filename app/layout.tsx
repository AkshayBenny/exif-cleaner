import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ShieldAlert } from 'lucide-react'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

// Custom SVG to replace the removed Lucide Github icon
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'>
			<path d='M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4' />
		</svg>
	)
}

// Advanced SEO Metadata with Authorship
export const metadata: Metadata = {
	title: 'Image MetaShield | Free EXIF Viewer & Metadata Remover',
	description:
		'Securely view, locate, and strip hidden EXIF metadata and GPS coordinates from your photos. 100% free, client-side, and private.',
	keywords: [
		'exif viewer',
		'remove metadata',
		'photo privacy',
		'gps extractor',
		'image sanitizer',
	],
	authors: [{ name: 'Akshay Benny', url: 'https://github.com/AkshayBenny' }],
	openGraph: {
		title: 'Image MetaShield | Free EXIF Viewer & Metadata Remover',
		description:
			'Securely view, locate, and strip hidden EXIF metadata from your photos right in your browser.',
		url: 'https://yourdomain.com',
		siteName: 'Image MetaShield',
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Image MetaShield',
		description:
			'Securely view and strip hidden EXIF metadata from your photos.',
	},
}

// JSON-LD Schema Markup
const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'WebApplication',
	name: 'Image MetaShield',
	author: {
		'@type': 'Person',
		name: 'Akshay Benny',
		url: 'https://github.com/AkshayBenny',
	},
	description:
		'A web application to view and strip EXIF metadata from images securely in the browser.',
	applicationCategory: 'UtilitiesApplication',
	operatingSystem: 'All',
	offers: {
		'@type': 'Offer',
		price: '0',
		priceCurrency: 'USD',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
			<head>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
			<body
				className={`${inter.variable} font-sans antialiased bg-neutral-50 flex flex-col min-h-screen`}>
				{/* Header */}
				<header className='sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md'>
					<div className='container mx-auto px-4 h-16 flex items-center justify-between'>
						<Link
							href='/'
							className='flex items-center gap-2 text-neutral-900 font-semibold hover:opacity-80 transition'>
							<ShieldAlert className='w-5 h-5 text-neutral-900' />
							<span>MetaShield</span>
						</Link>
						<nav className='flex items-center gap-6 text-sm font-medium text-neutral-600'>
							<Link
								href='/#how-it-works'
								className='hover:text-neutral-900 transition'>
								How it Works
							</Link>
							<Link
								href='/#faq'
								className='hover:text-neutral-900 transition'>
								FAQ
							</Link>
							<a
								href='https://github.com/AkshayBenny'
								target='_blank'
								rel='noreferrer'
								aria-label="Akshay's GitHub Profile"
								className='text-neutral-400 hover:text-neutral-900 transition'>
								<GithubIcon className='w-5 h-5' />
							</a>
						</nav>
					</div>
				</header>

				{/* Main Content */}
				<main className='flex-1'>{children}</main>

				{/* Footer */}
				<footer className='border-t border-neutral-200 bg-white text-neutral-500 py-8 text-sm'>
					<div className='container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4'>
						<p>
							© {new Date().getFullYear()} Image MetaShield by
							Akshay Benny. Built in Glasgow, Scotland.
						</p>
						<div className='flex gap-6'>
							<Link
								href='/privacy'
								className='hover:text-neutral-900 transition'>
								Privacy Policy
							</Link>
							<Link
								href='/terms'
								className='hover:text-neutral-900 transition'>
								Terms of Service
							</Link>
						</div>
					</div>
				</footer>
			</body>
		</html>
	)
}
