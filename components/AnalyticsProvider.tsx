'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import { useEffect, useState } from 'react'

export function AnalyticsProvider() {
	const [consentGranted, setConsentGranted] = useState(false)

	useEffect(() => {
		// This strictly runs in the browser AFTER the page loads,
		// guaranteeing it reads the local storage correctly.
		const consent = localStorage.getItem('cookie_consent') === 'granted'
		setConsentGranted(consent)
	}, [])

	if (!consentGranted) return null

	// Insert your actual GA ID here
	return <GoogleAnalytics gaId='G-2FZHBE22X8' />
}
