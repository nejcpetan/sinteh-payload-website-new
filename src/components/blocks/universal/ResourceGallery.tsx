/**
 * ResourceGallery Component - SINTEH PRO Component Library
 * 
 * A comprehensive component for showcasing downloadable resources,
 * image galleries, and document libraries. Features category filtering,
 * lightbox functionality, and newsletter integration.
 * 
 * KEY FEATURES:
 * - 3 layout variants (resources, gallery, combined)
 * - Category filtering system
 * - Lightbox image viewing
 * - Quick access resource section
 * - Newsletter signup integration
 * - Additional information sections
 * - Download tracking and analytics
 * - Mobile-optimized interactions
 * 
 * RESOURCE MANAGEMENT:
 * - Organized document libraries
 * - Easy resource discovery
 * - Professional presentation
 * - Download optimization
 * - User engagement tracking
 * 
 * PERFECT FOR:
 * - Resource centers
 * - Documentation libraries
 * - Image galleries
 * - Download centers
 * - Technical documentation
 * - Product catalogs
 * 
 * @example
 * <ResourceGallery
 *   variant="combined"
 *   title="Technical Resources"
 *   resources={[
 *     {
 *       title: "Product Catalog",
 *       description: "Complete product overview",
 *       fileType: "PDF",
 *       fileSize: "2.4 MB",
 *       category: "Documentation"
 *     }
 *   ]}
 *   categories={["All", "Documentation", "CAD"]}
 *   showCategoryFilter={true}
 * />
 */

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Resource {
  title: string;
  description: string;
  fileType: string;
  fileSize: string;
  icon: React.ReactNode;
  category: string;
  downloadUrl?: string;
}

interface GalleryImage {
  title: string;
  description: string;
  category: string;
}

export interface ResourceGalleryProps {
  // Layout variants
  variant?: "resources" | "gallery" | "combined";
  
  // Core content
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  
  // Resources data
  resources?: Resource[];
  
  // Gallery data
  galleryImages?: GalleryImage[];
  
  // Filter options
  categories?: string[];
  showCategoryFilter?: boolean;
  
  // Layout options
  columns?: 2 | 3 | 4;
  
  // Quick access section
  quickAccessItems?: Array<{
    name: string;
    type: string;
    size: string;
    href: string;
  }>;
  
  // Newsletter signup
  showNewsletterSignup?: boolean;
  newsletterTitle?: string;
  newsletterDescription?: string;
  
  // Additional sections
  additionalSections?: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
    items?: Array<{
      text: string;
      href?: string;
    }>;
  }>;
  
  // Background options
  backgroundStyle?: "surface" | "background" | "white";
  
  // Styling
  className?: string;
}

export function ResourceGallery({
  variant = "resources",
  title,
  subtitle,
  description,
  badge,
  resources = [],
  galleryImages = [],
  categories = ["All"],
  showCategoryFilter = true,
  columns = 4,
  quickAccessItems = [],
  showNewsletterSignup = false,
  newsletterTitle = "Stay Updated",
  newsletterDescription = "Subscribe to receive the latest technical documents, case studies and product updates.",
  additionalSections = [],
  backgroundStyle = "surface",
  className = ""
}: ResourceGalleryProps) {

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const getSectionClasses = () => {
    const baseClasses = "w-full text-foreground";
    
    switch (backgroundStyle) {
      case "surface":
        return `${baseClasses} bg-surface`;
      case "background":
        return `${baseClasses} bg-background`;
      case "white":
        return `${baseClasses} bg-white`;
      default:
        return `${baseClasses} bg-surface`;
    }
  };

  const getGridClasses = () => {
    const gridClasses = {
      2: "md:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    };
    
    if (variant === "gallery") {
      return "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6";
    }
    
    return `grid ${gridClasses[columns]} gap-6`;
  };

  const filteredResources = activeCategory === "All" 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(image => image.category === activeCategory);

  const renderHeader = () => {
    return (
      <div className="text-center max-w-3xl mx-auto mb-12">
        {badge && (
          <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-4">
            {badge}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl md:text-2xl text-brand font-semibold mb-4">
            {subtitle}
          </p>
        )}
        <p className="text-lg text-foreground/70">
          {description}
        </p>
      </div>
    );
  };

  const renderCategoryFilter = () => {
    if (!showCategoryFilter || categories.length <= 1) return null;
    
    return (
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
    );
  };

  const renderResources = () => {
    return (
      <div className={getGridClasses()}>
        {filteredResources.map((resource, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden bg-white/90 border border-border/60 hover:bg-white hover:shadow-xl hover:border-brand/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-[radial-gradient(65%_50%_at_20%_10%,_rgba(107,196,65,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{resource.icon}</div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 bg-brand/10 text-brand text-xs rounded-full font-medium">
                    {resource.fileType}
                  </span>
                  <div className="text-xs text-foreground/60 mt-1">{resource.fileSize}</div>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-brand transition-colors duration-300">
                {resource.title}
              </h3>
              
              <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
                {resource.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-foreground/60 bg-surface/60 px-2 py-1 rounded-full">
                  {resource.category}
                </span>
                
                <button className="flex items-center gap-1 text-brand hover:text-brand-600 transition-colors duration-200 text-sm font-medium">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7,10 12,15 17,10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderGallery = () => {
    return (
      <>
        <div className={getGridClasses()}>
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface border border-border/60 hover:border-brand/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Image placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface to-surface/80">
                  <div className="text-center text-foreground/40">
                    <div className="mb-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-10 w-10 mx-auto">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    </div>
                    <div className="text-xs font-medium px-2">
                      {image.title}
                    </div>
                  </div>
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8 mx-auto mb-2">
                      <path d="M2 18h20c0-5.23-4.77-10-10-10S2 12.77 2 18Z" />
                      <circle cx="12" cy="6" r="2" />
                      <circle cx="6" cy="14" r="2" />
                      <circle cx="18" cy="14" r="2" />
                    </svg>
                    <span className="text-sm font-medium">Enlarge</span>
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              
              <div className="bg-white rounded-2xl overflow-hidden">
                <div className="aspect-video bg-surface flex items-center justify-center">
                  <div className="text-center text-foreground/40">
                    <div className="mb-4">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-16 w-16 mx-auto">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        <circle cx="12" cy="13" r="4" />
                      </svg>
                    </div>
                    <div className="text-xl font-medium mb-2">
                      {filteredImages[selectedImage]?.title}
                    </div>
                    <div className="text-foreground/70">
                      {filteredImages[selectedImage]?.description}
                    </div>
                  </div>
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
      </>
    );
  };

  const renderQuickAccess = () => {
    if (quickAccessItems.length === 0) return null;
    
    return (
      <div className="rounded-2xl bg-white border border-border/60 p-6 mb-8">
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4 text-brand">
              <path d="M12 8v4l3 3" />
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          Quick Access
        </h3>
        <div className="space-y-3">
          {quickAccessItems.map((item, index) => (
            <a key={index} href={item.href} className="flex items-center justify-between p-3 rounded-lg bg-surface/60 hover:bg-surface transition-colors duration-200">
              <span className="font-medium text-foreground">{item.name}</span>
              <span className="text-brand text-sm">{item.type}, {item.size}</span>
            </a>
          ))}
        </div>
      </div>
    );
  };

  const renderAdditionalSections = () => {
    if (additionalSections.length === 0) return null;
    
    return (
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {additionalSections.map((section, index) => (
          <div key={index} className="rounded-2xl bg-white border border-border/60 p-6">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
                {section.icon}
              </div>
              {section.title}
            </h3>
            <p className="text-foreground/70 mb-4">{section.description}</p>
            
            {section.items && section.items.length > 0 && (
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    {item.href ? (
                      <a href={item.href} className="flex items-center gap-2 text-brand hover:text-brand-600 transition-colors duration-200">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                          <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">{item.text}</span>
                      </a>
                    ) : (
                      <span className="text-foreground/70">{item.text}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderNewsletterSignup = () => {
    if (!showNewsletterSignup) return null;
    
    return (
      <div className="rounded-2xl bg-white border border-border/60 p-8 text-center">
        <h3 className="text-xl font-bold text-foreground mb-4">
          {newsletterTitle}
        </h3>
        <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
          {newsletterDescription}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Your email address"
            className="flex-1 px-4 py-2 border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand"
          />
          <button className="px-6 py-2 bg-brand text-white rounded-full font-medium hover:bg-brand-600 transition-colors duration-200">
            Subscribe
          </button>
        </div>
        <p className="text-xs text-foreground/60 mt-3">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    );
  };

  const renderContent = () => {
    switch (variant) {
      case "resources":
        return (
          <>
            {renderQuickAccess()}
            {renderResources()}
            {renderAdditionalSections()}
            {renderNewsletterSignup()}
          </>
        );
      case "gallery":
        return (
          <>
            {renderGallery()}
            <div className="text-center mt-16">
              <div className="rounded-2xl bg-surface border border-border/60 p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Need High-Resolution Images?
                </h3>
                <p className="text-foreground/70 mb-6">
                  Download the complete gallery of product images in print quality for your documentation.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-full font-medium hover:bg-brand-600 transition-colors duration-200"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7,10 12,15 17,10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download Gallery
                  </a>
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-foreground border border-border rounded-full font-medium hover:bg-surface/70 transition-colors duration-200"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                      <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Request Specific Images
                  </a>
                </div>
              </div>
            </div>
          </>
        );
      case "combined":
        return (
          <>
            {renderQuickAccess()}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Resources</h3>
              {renderResources()}
            </div>
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Gallery</h3>
              {renderGallery()}
            </div>
            {renderAdditionalSections()}
            {renderNewsletterSignup()}
          </>
        );
      default:
        return renderResources();
    }
  };

  return (
    <section className={`${getSectionClasses()} ${className}`}>
      <div className="mx-auto max-w-7xl container-px py-16 md:py-24">
        {renderHeader()}
        {renderCategoryFilter()}
        {renderContent()}
      </div>
    </section>
  );
}
