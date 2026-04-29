'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CookieBanner() {
	const [showBanner, setShowBanner] = useState(false)

	useEffect(() => {
		// Asynchronous check to prevent Next.js hydration errors
		const timeoutId = setTimeout(() => {
			const consent = localStorage.getItem('cookie_consent')
			if (!consent) {
				setShowBanner(true)
			}
		}, 0)
		return () => clearTimeout(timeoutId)
	}, [])

	const handleAccept = () => {
		localStorage.setItem('cookie_consent', 'granted')
		setShowBanner(false)
		window.location.reload()
	}

	const handleDecline = () => {
		localStorage.setItem('cookie_consent', 'denied')
		setShowBanner(false)
	}

	if (!showBanner) return null

	return (
		<div className='fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-neutral-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] pt-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))]'>
			<div className='container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4'>
				{/* Text Container: Full width and centered on mobile, left-aligned on desktop */}
				<div className='text-xs sm:text-sm text-neutral-600 text-center sm:text-left leading-relaxed w-full sm:flex-1'>
					We use cookies and Google Analytics to understand how people
					use MetaShield (e.g., tracking PWA installs).{' '}
					<strong>Your images are never tracked or uploaded.</strong>{' '}
					Read our{' '}
					<Link
						href='/privacy'
						className='text-blue-600 font-medium hover:underline'>
						Privacy Policy
					</Link>
					.
				</div>

				{/* Button Container: 100% width on mobile, auto width on desktop */}
				<div className='flex items-center gap-3 w-full sm:w-auto shrink-0 mt-2 sm:mt-0'>
					{/* Buttons: Split 50/50 width on mobile, normal size on desktop */}
					<Button
						variant='outline'
						onClick={handleDecline}
						className='flex-1 sm:flex-none'>
						Decline
					</Button>
					<Button
						onClick={handleAccept}
						className='flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white'>
						Accept Cookies
					</Button>
				</div>
			</div>
		</div>
	)
}
