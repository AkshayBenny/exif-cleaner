'use client'

import React, { useState, useRef } from 'react'
import exifr from 'exifr'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import {
	UploadCloud,
	MapPin,
	ShieldAlert,
	ImageIcon,
	Trash2,
	Info,
} from 'lucide-react'

export default function Home() {
	const [file, setFile] = useState<File | null>(null)
	const [previewUrl, setPreviewUrl] = useState<string | null>(null)
	const [gpsData, setGpsData] = useState<{
		latitude: number
		longitude: number
	} | null>(null)
	const [metadata, setMetadata] = useState<Record<string, string>>({})
	const fileInputRef = useRef<HTMLInputElement>(null)

	const resetState = () => {
		setFile(null)
		if (previewUrl) URL.revokeObjectURL(previewUrl)
		setPreviewUrl(null)
		setGpsData(null)
		setMetadata({})
		if (fileInputRef.current) fileInputRef.current.value = ''
	}

	const handleFileUpload = async (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const uploadedFile = event.target.files?.[0]
		if (!uploadedFile) return

		resetState()
		setFile(uploadedFile)
		setPreviewUrl(URL.createObjectURL(uploadedFile))

		try {
			const gps = await exifr.gps(uploadedFile)
			if (gps) {
				setGpsData({ latitude: gps.latitude, longitude: gps.longitude })
			}

			const rawMetadata = await exifr.parse(uploadedFile)
			if (rawMetadata) {
				const readableData: Record<string, string> = {}
				for (const [key, value] of Object.entries(rawMetadata)) {
					if (
						typeof value === 'string' ||
						typeof value === 'number'
					) {
						readableData[key] = value.toString()
					} else if (value instanceof Date) {
						readableData[key] = value.toLocaleString()
					}
				}
				setMetadata(readableData)
			}
		} catch (error) {
			console.error('Error reading EXIF data', error)
		}
	}

	const sanitizeAndDownload = () => {
		if (!previewUrl || !file) return

		const img = new Image()
		img.crossOrigin = 'Anonymous'
		img.onload = () => {
			const canvas = document.createElement('canvas')
			canvas.width = img.width
			canvas.height = img.height
			const ctx = canvas.getContext('2d')

			if (ctx) {
				ctx.drawImage(img, 0, 0)
				canvas.toBlob(
					(blob) => {
						if (blob) {
							const url = URL.createObjectURL(blob)
							const a = document.createElement('a')
							a.href = url
							a.download = `sanitized_${file.name}`
							document.body.appendChild(a)
							a.click()
							document.body.removeChild(a)
							URL.revokeObjectURL(url)
						}
					},
					file.type || 'image/jpeg',
					1.0,
				)
			}
		}
		img.src = previewUrl
	}

	const openGoogleMaps = () => {
		if (gpsData) {
			const url = `https://www.google.com/maps/search/?api=1&query=${gpsData.latitude},${gpsData.longitude}`
			window.open(url, '_blank')
		}
	}

	return (
		<div className='pb-16 text-neutral-900'>
			{/* Hero Section */}
			<section className='pt-20 pb-12 px-4 text-center max-w-3xl mx-auto'>
				<h1 className='text-4xl md:text-5xl font-bold tracking-tight mb-4'>
					Secure Your Image Privacy
				</h1>
				<p className='text-lg text-neutral-600 mb-8'>
					Instantly view hidden EXIF data, locate where a photo was
					taken, and strip sensitive metadata before sharing online.
					100% free and processed securely in your browser.
				</p>
			</section>

			{/* The Tool Section */}
			<section className='px-4 max-w-4xl mx-auto mb-24'>
				<Card className='w-full shadow-sm border-neutral-200'>
					<CardContent className='p-6'>
						{!file ? (
							<div
								onClick={() => fileInputRef.current?.click()}
								className='border-2 border-dashed border-neutral-300 rounded-xl p-20 text-center cursor-pointer hover:bg-neutral-100 hover:border-neutral-400 transition-all duration-200 group'>
								<UploadCloud className='w-12 h-12 mx-auto text-neutral-400 group-hover:text-neutral-600 mb-4 transition-colors' />
								<p className='text-base font-medium text-neutral-600'>
									Click or drag an image to upload
								</p>
								<p className='text-sm text-neutral-400 mt-1'>
									JPEG, PNG, WEBP supported
								</p>
								<input
									type='file'
									ref={fileInputRef}
									onChange={handleFileUpload}
									className='hidden'
									accept='image/jpeg, image/png, image/webp'
								/>
							</div>
						) : (
							<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
								{/* Left Column: Image & Removal */}
								<div className='space-y-4'>
									<div className='relative aspect-square rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200'>
										<img
											src={previewUrl!}
											alt='Preview'
											className='object-cover w-full h-full'
										/>
									</div>

									<div className='flex items-center justify-between bg-white p-3 border border-neutral-200 rounded-lg'>
										<div className='flex items-center gap-3 overflow-hidden'>
											<ImageIcon className='w-5 h-5 text-neutral-400 shrink-0' />
											<div className='truncate'>
												<p className='text-sm font-medium text-neutral-700 truncate'>
													{file.name}
												</p>
												<p className='text-xs text-neutral-500'>
													{(
														file.size /
														1024 /
														1024
													).toFixed(2)}{' '}
													MB
												</p>
											</div>
										</div>
										<Button
											variant='ghost'
											size='icon'
											onClick={resetState}
											className='text-neutral-400 hover:text-red-600 hover:bg-red-50 shrink-0'>
											<Trash2 className='w-4 h-4' />
										</Button>
									</div>
								</div>

								{/* Right Column: Actions & Metadata */}
								<div className='flex flex-col h-full space-y-6'>
									{/* Actions */}
									<div className='space-y-3'>
										<h3 className='text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-3'>
											Quick Actions
										</h3>
										{gpsData ? (
											<Button
												onClick={openGoogleMaps}
												className='w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm'>
												<MapPin className='w-4 h-4 mr-2' />
												View on Google Maps
											</Button>
										) : (
											<div className='p-3 bg-neutral-100 text-neutral-500 rounded-lg text-sm text-center border border-neutral-200'>
												No GPS location data found.
											</div>
										)}

										<Button
											onClick={sanitizeAndDownload}
											variant='outline'
											className='w-full border-neutral-300 hover:bg-neutral-100 shadow-sm'>
											<ShieldAlert className='w-4 h-4 mr-2' />
											Strip Data & Download
										</Button>
									</div>

									<Separator />

									{/* Metadata Display */}
									<div className='flex-1 flex flex-col overflow-hidden min-h-[250px]'>
										<h3 className='text-sm font-semibold text-neutral-900 uppercase tracking-wider mb-3 flex items-center gap-2'>
											<Info className='w-4 h-4' />{' '}
											Detected Metadata
										</h3>

										{Object.keys(metadata).length > 0 ? (
											<ScrollArea className='flex-1 border border-neutral-200 rounded-lg bg-white p-4'>
												<div className='space-y-3'>
													{Object.entries(
														metadata,
													).map(([key, value]) => (
														<div
															key={key}
															className='flex justify-between gap-4 text-sm border-b border-neutral-100 pb-2 last:border-0 last:pb-0'>
															<span className='font-medium text-neutral-500 shrink-0'>
																{key}
															</span>
															<span className='text-neutral-900 text-right break-words'>
																{value}
															</span>
														</div>
													))}
												</div>
											</ScrollArea>
										) : (
											<div className='flex-1 flex items-center justify-center border border-neutral-200 border-dashed rounded-lg bg-neutral-50 text-sm text-neutral-400'>
												No readable metadata found.
											</div>
										)}
									</div>
								</div>
							</div>
						)}
					</CardContent>
				</Card>
			</section>

			{/* Value Proposition / How It Works (Great for SEO) */}
			<section
				id='how-it-works'
				className='bg-white border-y border-neutral-200 py-16 px-4'>
				<div className='max-w-4xl mx-auto'>
					<h2 className='text-2xl font-bold text-center mb-12'>
						How MetaShield Protects You
					</h2>
					<div className='grid md:grid-cols-3 gap-8'>
						<div className='space-y-3'>
							<div className='w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600'>
								<Info className='w-5 h-5' />
							</div>
							<h3 className='font-semibold text-lg'>
								1. Extract Hidden Data
							</h3>
							<p className='text-sm text-neutral-600'>
								Cameras embed invisible data (EXIF) into photos,
								including device models, exposure settings, and
								exact timestamps.
							</p>
						</div>
						<div className='space-y-3'>
							<div className='w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600'>
								<MapPin className='w-5 h-5' />
							</div>
							<h3 className='font-semibold text-lg'>
								2. Locate the Origin
							</h3>
							<p className='text-sm text-neutral-600'>
								If GPS coordinates are present, our tool
								extracts the latitude and longitude, allowing
								you to instantly view the location on Google
								Maps.
							</p>
						</div>
						<div className='space-y-3'>
							<div className='w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600'>
								<ShieldAlert className='w-5 h-5' />
							</div>
							<h3 className='font-semibold text-lg'>
								3. Clean & Sanitize
							</h3>
							<p className='text-sm text-neutral-600'>
								With one click, we rebuild your image
								pixel-by-pixel, permanently destroying all
								hidden metadata so you can share it safely.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section
				id='faq'
				className='py-16 px-4 max-w-3xl mx-auto'>
				<h2 className='text-2xl font-bold mb-8 text-center'>
					Frequently Asked Questions
				</h2>
				<Accordion
					type='single'
					collapsible
					className='w-full'>
					<AccordionItem value='item-1'>
						<AccordionTrigger className='text-left font-medium'>
							Are my photos uploaded to your servers?
						</AccordionTrigger>
						<AccordionContent className='text-neutral-600 leading-relaxed'>
							No. MetaShield operates entirely locally within your
							web browser. When you upload a photo, the metadata
							extraction and sanitization happen directly on your
							device. We never see, store, or transmit your files.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value='item-2'>
						<AccordionTrigger className='text-left font-medium'>
							Why does my photo say &quot;No metadata found&quot;?
						</AccordionTrigger>
						<AccordionContent className='text-neutral-600 leading-relaxed'>
							If you downloaded the photo from social media
							platforms like WhatsApp, Facebook, or Instagram,
							those services automatically strip EXIF data upon
							upload to protect user privacy. Screenshots also do
							not contain camera metadata.
						</AccordionContent>
					</AccordionItem>
					<AccordionItem value='item-3'>
						<AccordionTrigger className='text-left font-medium'>
							What is EXIF data?
						</AccordionTrigger>
						<AccordionContent className='text-neutral-600 leading-relaxed'>
							Exchangeable Image File Format (EXIF) is a standard
							that specifies the formats for images and tags used
							by digital cameras. It can contain sensitive
							information like the exact GPS location where the
							photo was taken, date and time, camera settings, and
							even the software used to edit the image.
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</section>
		</div>
	)
}
