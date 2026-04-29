import withSerwistInit from '@serwist/next'

const withSerwist = withSerwistInit({
	// Note: We put sw.ts in our app/ directory, and it outputs sw.js to public/
	swSrc: 'app/sw.ts',
	swDest: 'public/sw.js',
	// We disable the service worker in development so it doesn't aggressively cache your code while you are trying to write it!
	disable: process.env.NODE_ENV === 'development',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Your existing next.js config goes here
}

export default withSerwist(nextConfig)
