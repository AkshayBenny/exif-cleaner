import Link from 'next/link'
import { ShieldAlert } from 'lucide-react'

export default function PrivacyPolicy() {
	return (
		<div className='container mx-auto px-4 py-16 max-w-3xl text-neutral-800'>
			<Link
				href='/'
				className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 font-medium'>
				&larr; Back to Tool
			</Link>

			<div className='flex items-center gap-3 mb-8'>
				<div className='p-3 bg-blue-100 text-blue-600 rounded-lg'>
					<ShieldAlert className='w-8 h-8' />
				</div>
				<h1 className='text-4xl font-bold tracking-tight'>
					Privacy Policy
				</h1>
			</div>

			<div className='space-y-8 leading-relaxed'>
				<section>
					<p className='text-sm text-neutral-500 mb-4'>
						Last updated: April 2026
					</p>
					<p>
						At Image MetaShield, your privacy is not just a
						priority; it is the fundamental architecture of our
						application. This policy explains how we handle data (or
						rather, how we don&apos;t).
					</p>
				</section>

				<section>
					<h2 className='text-2xl font-semibold mb-4 text-neutral-900'>
						1. Client-Side Processing
					</h2>
					<p>
						<strong>
							We do not upload, store, or transmit your images.
						</strong>{' '}
						When you select a photo to inspect or sanitize, all
						processing is done locally within your web browser using
						JavaScript. The files never leave your device, and they
						never touch our servers.
					</p>
				</section>

				<section>
					<h2 className='text-2xl font-semibold mb-4 text-neutral-900'>
						2. Data Collection
					</h2>
					<p>
						Because we do not have a backend database or user
						accounts, we do not collect personal identifiers, email
						addresses, or usage logs tied to your identity. We do
						not use tracking cookies.
					</p>
				</section>

				<section>
					<h2 className='text-2xl font-semibold mb-4 text-neutral-900'>
						3. Third-Party Services
					</h2>
					<p>
						If you choose to use the &quot;View on Google Maps&quot;
						feature, you will be redirected to Google Maps, passing
						the extracted latitude and longitude via the URL. Once
						you leave our application, Google&apos;s Privacy Policy
						applies to your interaction with their mapping service.
					</p>
				</section>

				<section>
					<h2 className='text-2xl font-semibold mb-4 text-neutral-900'>
						4. Contact
					</h2>
					<p>
						Since this is an open-source, client-side utility, the
						best way to report issues or ask questions is via our
						GitHub repository.
					</p>
				</section>
			</div>
		</div>
	)
}
