'use client'

import { useState } from 'react'

interface GalleryImage {
  title: string
  description: string
  category: string
  image?: {
    url: string
    alt?: string
  }
}

interface ProductGalleryBlockProps {
  badge?: string
  title: string
  subtitle?: string
  images: GalleryImage[]
  downloadSection?: {
    title: string
    description: string
    downloadButtonText: string
    requestButtonText: string
  }
}

export function ProductGalleryBlock({
  badge,
  title,
  subtitle,
  images,
  downloadSection,
}: ProductGalleryBlockProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Extract unique categories from images
  const categories = ['Vsi', ...Array.from(new Set(images.map((img) => img.category)))]
  const [activeCategory, setActiveCategory] = useState('Vsi')

  const filteredImages =
    activeCategory === 'Vsi' ? images : images.filter((img) => img.category === activeCategory)

  return (
    <section className="w-full bg-background text-foreground">
      <div className="mx-auto max-w-7xl container-px py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          {badge && (
            <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand">
              {badge}
            </span>
          )}
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
          {subtitle && <p className="mt-4 text-lg text-foreground/70">{subtitle}</p>}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-brand text-white shadow-md'
                  : 'bg-surface text-foreground hover:bg-surface/70 border border-border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface border border-border/60 hover:border-brand/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface to-surface/80">
                  {image.image?.url ? (
                    <img
                      src={image.image.url}
                      alt={image.image.alt || image.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-foreground/40">
                      <div className="text-4xl mb-2">📷</div>
                      <div className="text-xs font-medium px-2">{image.title}</div>
                    </div>
                  )}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-8 w-8 mx-auto mb-2"
                    >
                      <path d="M2 18h20c0-5.23-4.77-10-10-10S2 12.77 2 18Z" />
                      <circle cx="12" cy="6" r="2" />
                      <circle cx="6" cy="14" r="2" />
                      <circle cx="18" cy="14" r="2" />
                    </svg>
                    <span className="text-sm font-medium">Povečaj</span>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-white/90 text-foreground text-xs rounded-full font-medium">
                    {image.category}
                  </span>
                </div>
              </div>

              {/* Image info */}
              <div className="mt-3 px-1">
                <h3 className="font-semibold text-foreground text-sm mb-1">{image.title}</h3>
                <p className="text-xs text-foreground/70">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox modal */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-8 w-8"
                >
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="bg-white rounded-2xl overflow-hidden">
                <div className="aspect-video bg-surface flex items-center justify-center">
                  {filteredImages[selectedImage]?.image?.url ? (
                    <img
                      src={filteredImages[selectedImage].image!.url}
                      alt={
                        filteredImages[selectedImage].image?.alt ||
                        filteredImages[selectedImage].title
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-foreground/40">
                      <div className="text-6xl mb-4">📷</div>
                      <div className="text-xl font-medium mb-2">
                        {filteredImages[selectedImage]?.title}
                      </div>
                      <div className="text-foreground/70">
                        {filteredImages[selectedImage]?.description}
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {filteredImages[selectedImage]?.title}
                      </h3>
                      <p className="text-foreground/70 mt-1">
                        {filteredImages[selectedImage]?.description}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-brand/10 text-brand text-sm rounded-full font-medium">
                      {filteredImages[selectedImage]?.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Download section */}
        {downloadSection && (
          <div className="text-center">
            <div className="rounded-2xl bg-surface border border-border/60 p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">{downloadSection.title}</h3>
              <p className="text-foreground/70 mb-6">{downloadSection.description}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#kontakt"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-full font-medium hover:bg-brand-600 transition-colors duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7,10 12,15 17,10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {downloadSection.downloadButtonText}
                </a>
                <a
                  href="#kontakt"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-foreground border border-border rounded-full font-medium hover:bg-surface/70 transition-colors duration-200"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4"
                  >
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 002 2v8a2 2 0 002 2z" />
                  </svg>
                  {downloadSection.requestButtonText}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
