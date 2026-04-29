'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CookieBanner() {
	const [showBanner, setShowBanner] = useState(false)

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			const consent = localStorage.getItem('cookie_consent')
			if (!consent) {
				setShowBanner(true)
			}
		}, 0)

		// Cleanup function in case the component unmounts before the timeout fires
		return () => clearTimeout(timeoutId)
	}, [])

	const handleAccept = () => {
		localStorage.setItem('cookie_consent', 'granted')
		setShowBanner(false)
		// Reload to inject the GA script safely
		window.location.reload()
	}

	const handleDecline = () => {
		localStorage.setItem('cookie_consent', 'denied')
		setShowBanner(false)
	}

	if (!showBanner) return null

	return (
		<div className='fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-neutral-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4'>
			<div className='text-sm text-neutral-600 max-w-3xl'>
				We use cookies and Google Analytics to understand how people use
				MetaShield (e.g., tracking PWA installs and button clicks).{' '}
				<strong>Your images are never tracked or uploaded.</strong> Read
				our{' '}
				<Link
					href='/privacy'
					className='text-blue-600 underline'>
					Privacy Policy
				</Link>
				.
			</div>
			<div className='flex items-center gap-3 shrink-0 w-full md:w-auto'>
				<Button
					variant='outline'
					onClick={handleDecline}
					className='w-full md:w-auto'>
					Decline
				</Button>
				<Button
					onClick={handleAccept}
					className='w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white'>
					Accept Cookies
				</Button>
			</div>
		</div>
	)
}
