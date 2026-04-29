import Link from 'next/link'

export default function TermsOfService() {
	return (
		<div className='container mx-auto px-4 py-16 max-w-3xl text-neutral-800'>
			<Link
				href='/'
				className='inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8 font-medium'>
				&larr; Back to Tool
			</Link>

			<h1 className='text-4xl font-bold tracking-tight mb-8'>
				Terms of Service
			</h1>

			<div className='space-y-8 leading-relaxed'>
				<section>
					<p className='text-sm text-neutral-500 mb-4'>
						Last updated: April 2026
					</p>
					<p>
						By accessing and using Image MetaShield, you accept and
						agree to be bound by the terms and provision of this
						agreement.
					</p>
				</section>

				<section>
					<h2 className='text-2xl font-semibold mb-4 text-neutral-900'>
						1. Provided &quot;As Is&quot;
					</h2>
					<p>
						The service is provided on an &quot;as is&quot; and &quot;as available&quot;
						basis without any warranties of any kind. While we use
						standard browser APIs to strip metadata, we cannot
						guarantee absolute perfection across all proprietary
						camera formats. You are responsible for verifying your
						sanitized files.
					</p>
				</section>

				<section>
					<h2 className='text-2xl font-semibold mb-4 text-neutral-900'>
						2. Acceptable Use
					</h2>
					<p>
						You agree not to use this tool to facilitate any illegal
						activities. You are solely responsible for the files you
						process and share using this tool.
					</p>
				</section>

				<section>
					<h2 className='text-2xl font-semibold mb-4 text-neutral-900'>
						3. Liability
					</h2>
					<p>
						In no event shall the creators or maintainers of Image
						MetaShield be liable for any indirect, incidental,
						special, or consequential damages arising out of or in
						connection with your use of the application.
					</p>
				</section>
			</div>
		</div>
	)
}
