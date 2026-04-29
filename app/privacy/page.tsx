import React from 'react'
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
						At Image MetaShield, we believe in complete
						transparency. We have designed this application to
						protect your sensitive photographic data while allowing
						us to gather basic usage metrics to improve the tool.
					</p>
				</section>

				<section>
					<h2 className='text-2xl font-semibold mb-4 text-neutral-900'>
						1. Your Images (Strictly Local)
					</h2>
					<p>
						<strong>
							We do not upload, store, or transmit your image
							files.
						</strong>{' '}
						When you select a photo to inspect or sanitize, all
						processing is done locally within your web browser using
						JavaScript. The image files never leave your device, and
						they never touch our servers.
					</p>
				</section>

				<section>
					<h2 className='text-2xl font-semibold mb-4 text-neutral-900'>
						2. Analytics & Usage Data (Cookies)
					</h2>
					<p>
						If you explicitly consent via our cookie banner, we use
						Google Analytics to collect basic, anonymized usage
						data. This helps us understand how the tool is used and
						includes:
					</p>
					<ul className='list-disc pl-6 mt-2 space-y-1 text-neutral-700'>
						<li>Page views and session duration.</li>
						<li>
							Browser type and generalized location (e.g.,
							country/city level).
						</li>
						<li>
							Interaction events (e.g., clicking &quot;Strip Metadata&quot;,
							uploading an image, or installing the app to your
							home screen).
						</li>
						<li>
							<strong>Note:</strong> When you upload an image, we
							track the file extension (e.g., .jpg) for
							optimization purposes, but we <strong>never</strong>{' '}
							track the file name.
						</li>
					</ul>
				</section>

				<section>
					<h2 className='text-2xl font-semibold mb-4 text-neutral-900'>
						3. Third-Party Services
					</h2>
					<p>
						If you choose to use the &quot;View on Google Maps&quot; feature,
						you will be redirected to Google Maps, passing the
						extracted latitude and longitude via the URL. Once you
						leave our application, Google&apos;s Privacy Policy applies
						to your interaction with their mapping service.
					</p>
				</section>

				<section>
					<h2 className='text-2xl font-semibold mb-4 text-neutral-900'>
						4. Your Rights (UK GDPR)
					</h2>
					<p>
						You have the right to withdraw your consent for tracking
						at any time by clearing your browser cookies for this
						site. Because we do not require accounts, we do not
						store personal identifiers like names or email
						addresses.
					</p>
				</section>
			</div>
		</div>
	)
}
