'use client'

import Image from 'next/image'
import { useState } from 'react'

interface LogoBeltBlockProps {
  logos: Array<{
    logo: {
      url: string
      alt?: string
    }
    alt: string
  }>
}

interface LogoItemProps {
  logoItem: {
    logo: {
      url: string
      alt?: string
    }
    alt: string
  }
  index: number
}

function LogoItem({ logoItem, index }: LogoItemProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(
    null,
  )
  const [shouldScale, setShouldScale] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true)
    const img = event.currentTarget
    const { naturalWidth, naturalHeight } = img

    setImageDimensions({ width: naturalWidth, height: naturalHeight })

    // Detect if logo likely has excessive whitespace
    // This heuristic checks for images that are very wide or tall relative to typical logo proportions
    const aspectRatio = naturalWidth / naturalHeight
    const isVeryWide = aspectRatio > 4 // Much wider than typical logos
    const isVeryTall = aspectRatio < 0.25 // Much taller than typical logos
    const isLargeCanvas = naturalWidth > 400 || naturalHeight > 400 // Large canvas size

    // If the image has unusual proportions or is very large, it likely has excessive whitespace
    setShouldScale(isVeryWide || isVeryTall || isLargeCanvas)
  }

  if (imageError) {
    return (
      <span className="inline-block mx-8 align-middle opacity-95">
        <span className="relative flex items-center justify-center h-8 w-[150px] bg-muted rounded border text-xs text-muted-foreground">
          {logoItem.alt || 'Logo'}
        </span>
      </span>
    )
  }

  // Dynamic sizing based on content detection
  const containerHeight = shouldScale ? 'h-12' : 'h-8' // Larger for logos with whitespace
  const containerWidth = shouldScale ? 'w-[200px]' : 'w-[150px]' // Wider for logos with whitespace
  const objectFit = shouldScale ? 'object-cover' : 'object-contain' // Cover for better cropping of whitespace

  return (
    <span className="inline-block mx-8 align-middle opacity-95">
      <span className={`relative block ${containerHeight} ${containerWidth} group`}>
        <Image
          src={logoItem.logo.url}
          alt={logoItem.alt}
          fill
          className={`
            ${objectFit} transition-all duration-300
            ${!imageLoaded ? 'opacity-0' : 'opacity-100'}
            filter grayscale hover:grayscale-0 hover:scale-105
            max-w-full max-h-full
            ${shouldScale ? 'scale-125' : 'scale-100'}
          `}
          onError={handleImageError}
          onLoad={handleImageLoad}
          sizes={shouldScale ? '200px' : '150px'}
          quality={90}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse rounded">
            <div className="w-4 h-4 bg-muted-foreground/20 rounded"></div>
          </div>
        )}
      </span>
    </span>
  )
}

export function LogoBeltBlock({ logos }: LogoBeltBlockProps) {
  if (!logos || logos.length === 0) {
    return null
  }

  return (
    <section className="w-full bg-background">
      <div className="relative py-8 overflow-hidden">
        <div className="marquee whitespace-nowrap">
          {[...logos, ...logos, ...logos].map((logoItem, i) => (
            <LogoItem key={i} logoItem={logoItem} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
