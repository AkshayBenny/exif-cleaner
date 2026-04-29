'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Download, X, Share } from 'lucide-react'

export function InstallBanner() {
	const [isIOS, setIsIOS] = useState(false)
	const [isStandalone, setIsStandalone] = useState(true) // Default to true to prevent flash
	const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		// 1. Check if the app is already installed
		const isPWA =
			window.matchMedia('(display-mode: standalone)').matches ||
			(window.navigator as any).standalone ||
			document.referrer.includes('android-app://')

		setIsStandalone(isPWA)

		// If it's already installed, we do nothing.
		if (isPWA) return

		// 2. Detect iOS device (Apple doesn't support the automated prompt)
		const userAgent = window.navigator.userAgent.toLowerCase()
		const isAppleDevice = /iphone|ipad|ipod/.test(userAgent)
		setIsIOS(isAppleDevice)

		// If it's iOS, we just show the manual instruction banner
		if (isAppleDevice) {
			setIsVisible(true)
		}

		// 3. Intercept Android/Desktop automatic prompt
		const handleBeforeInstallPrompt = (e: Event) => {
			// Prevent Chrome 67 and earlier from automatically showing the prompt
			e.preventDefault()
			// Stash the event so it can be triggered later.
			setDeferredPrompt(e)
			// Update UI to notify the user they can install the PWA
			setIsVisible(true)
		}

		window.addEventListener(
			'beforeinstallprompt',
			handleBeforeInstallPrompt,
		)

		return () => {
			window.removeEventListener(
				'beforeinstallprompt',
				handleBeforeInstallPrompt,
			)
		}
	}, [])

	const handleInstallClick = async () => {
		if (!deferredPrompt) return

		// Show the native browser install prompt
		deferredPrompt.prompt()

		// Wait for the user to respond to the prompt
		const { outcome } = await deferredPrompt.userChoice

		if (outcome === 'accepted') {
			setIsVisible(false)
		}

		// We've used the prompt, and can't use it again, throw it away
		setDeferredPrompt(null)
	}

	const handleDismiss = () => {
		setIsVisible(false)
	}

	// Do not render anything if installed or explicitly dismissed
	if (isStandalone || !isVisible) return null

	return (
		<div className='bg-blue-600 text-white px-4 py-3 shadow-md flex items-center justify-between gap-4 w-full text-sm'>
			<div className='flex items-center gap-3 flex-1'>
				<div className='bg-white/20 p-2 rounded-lg shrink-0'>
					<Download className='w-5 h-5 text-white' />
				</div>
				<div className='leading-snug'>
					<p className='font-semibold'>Install MetaShield</p>
					{isIOS ? (
						<p className='text-blue-100 text-xs mt-0.5 flex items-center gap-1'>
							Tap <Share className='w-3 h-3 inline' /> then
							&quot;Add to Home Screen&quot;
						</p>
					) : (
						<p className='text-blue-100 text-xs mt-0.5'>
							Install for offline use and faster access.
						</p>
					)}
				</div>
			</div>

			<div className='flex items-center gap-2 shrink-0'>
				{!isIOS && deferredPrompt && (
					<Button
						onClick={handleInstallClick}
						size='sm'
						variant='secondary'
						className='bg-white text-blue-700 hover:bg-neutral-100 h-8 text-xs font-semibold'>
						Install
					</Button>
				)}
				<button
					onClick={handleDismiss}
					className='p-2 text-blue-200 hover:text-white transition-colors'
					aria-label='Dismiss'>
					<X className='w-4 h-4' />
				</button>
			</div>
		</div>
	)
}
