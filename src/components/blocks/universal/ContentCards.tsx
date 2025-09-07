/**
 * ContentCards Component - SINTEH PRO Component Library
 * 
 * A versatile card-based component for displaying blog posts, service brands,
 * projects, and general content. Features interactive cards with rich metadata,
 * categories, and call-to-action elements.
 * 
 * KEY FEATURES:
 * - 5 content variants (blog-posts, service-brands, projects, general, featured-content)
 * - Interactive click handlers
 * - Rich metadata display (categories, read time, publish dates)
 * - Featured content highlighting
 * - Flexible grid layouts (2, 3, 4 columns)
 * - Multiple card styles with hover effects
 * - Image support and overlays
 * 
 * ENGAGEMENT FOCUSED:
 * - Click-to-navigate functionality
 * - Visual content previews
 * - Category-based organization
 * - Featured content promotion
 * - Mobile-optimized interactions
 * 
 * PERFECT FOR:
 * - Blog post listings
 * - Project portfolios
 * - Service brand showcases
 * - Partner displays
 * - Content galleries
 * 
 * @example
 * <ContentCards
 *   variant="blog-posts"
 *   title="Latest Articles"
 *   cards={[
 *     {
 *       title: "Industrial Automation Trends",
 *       excerpt: "Discover the latest trends in automation",
 *       category: "Technology",
 *       readTime: "5 min read",
 *       href: "/blog/automation-trends"
 *     }
 *   ]}
 *   showCategories={true}
 * />
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface ContentCard {
  id?: string;
  title: string;
  description?: string;
  excerpt?: string;
  category?: string;
  
  // For blog posts
  readTime?: string;
  publishedAt?: string;
  href?: string;
  featured?: boolean;
  tags?: string[];
  
  // For service brands
  products?: Array<{
    category: string;
    models: string[];
  }>;
  certifications?: string[];
  
  // For projects
  img?: string;
  stack?: string[];
  blurb?: string;
  
  // General
  icon?: React.ReactNode;
  badge?: string;
  ctaText?: string;
}

export interface ContentCardsProps {
  // Layout variants
  variant?: "blog-posts" | "service-brands" | "projects" | "general" | "featured-content";
  
  // Core content
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  
  // Cards data
  cards: ContentCard[];
  
  // Layout options
  columns?: 2 | 3 | 4;
  layout?: "grid" | "masonry" | "list";
  
  // Card styling
  cardStyle?: "elevated" | "bordered" | "minimal" | "image-overlay";
  
  // Background options
  backgroundStyle?: "background" | "surface" | "white";
  
  // Show/hide elements
  showCategories?: boolean;
  showExcerpts?: boolean;
  showMeta?: boolean;
  showCTAs?: boolean;
  showImages?: boolean;
  
  // Featured handling (for blog posts)
  highlightFeatured?: boolean;
  
  // Click behavior
  onCardClick?: (card: ContentCard) => void;
  
  // Styling
  className?: string;
}

export function ContentCards({
  variant = "general",
  title,
  subtitle,
  description,
  badge,
  cards,
  columns = 3,
  layout = "grid",
  cardStyle = "elevated",
  backgroundStyle = "background",
  showCategories = true,
  showExcerpts = true,
  showMeta = true,
  showCTAs = true,
  showImages = true,
  highlightFeatured = true,
  onCardClick,
  className = ""
}: ContentCardsProps) {

  const getSectionClasses = () => {
    const baseClasses = "w-full text-foreground";
    
    switch (backgroundStyle) {
      case "background":
        return `${baseClasses} bg-background`;
      case "surface":
        return `${baseClasses} bg-surface`;
      case "white":
        return `${baseClasses} bg-white`;
      default:
        return `${baseClasses} bg-background`;
    }
  };

  const getGridClasses = () => {
    if (variant === "blog-posts") {
      return "grid md:grid-cols-2 lg:grid-cols-4 gap-4";
    }
    
    if (variant === "service-brands") {
      return "grid lg:grid-cols-2 gap-8";
    }
    
    if (variant === "projects") {
      return "grid sm:grid-cols-2 lg:grid-cols-3 gap-6";
    }
    
    const gridClasses = {
      2: "md:grid-cols-2",
      3: "md:grid-cols-2 lg:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    };
    
    return `grid ${gridClasses[columns]} gap-6`;
  };

  const getCardClasses = (card: ContentCard) => {
    let baseClasses = "group relative overflow-hidden transition-all duration-300";
    
    // Card style
    switch (cardStyle) {
      case "elevated":
        baseClasses += " bg-white border border-border/60 hover:shadow-lg hover:border-brand/30";
        break;
      case "bordered":
        baseClasses += " bg-white border border-border/60 hover:border-brand/30";
        break;
      case "minimal":
        baseClasses += " bg-surface/40 hover:bg-surface/60";
        break;
      case "image-overlay":
        baseClasses += " bg-surface/60 backdrop-blur-sm hover:shadow-lg";
        break;
      default:
        baseClasses += " bg-white border border-border/60 hover:shadow-lg hover:border-brand/30";
    }
    
    // Variant-specific styling
    if (variant === "projects") {
      baseClasses += " rounded-2xl hover:-translate-y-0.5 focus-within:-translate-y-0.5 ring-1 ring-transparent hover:ring-brand/25";
    } else if (variant === "service-brands") {
      baseClasses += " hover:shadow-xl";
    } else {
      baseClasses += " hover:-translate-y-1";
    }
    
    return baseClasses;
  };

  const handleCardClick = (card: ContentCard) => {
    if (onCardClick) {
      onCardClick(card);
    } else if (card.href) {
      window.location.href = card.href;
    }
  };

  const renderBlogPostCard = (card: ContentCard, index: number) => {
    return (
      <Card key={card.id || index} className={getCardClasses(card)}>
        <div className="absolute inset-0 bg-[radial-gradient(65%_50%_at_20%_10%,_rgba(107,196,65,0.04),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {highlightFeatured && card.featured && (
          <div className="absolute top-2 right-2 z-10">
            <span className="px-2 py-1 text-xs font-medium bg-brand text-white rounded-full">
              Featured
            </span>
          </div>
        )}

        <CardHeader className="pb-2">
          {showMeta && (showCategories || card.readTime) && (
            <div className="flex items-center gap-2 text-xs text-foreground/60 mb-2">
              {showCategories && card.category && (
                <span className="px-2 py-1 bg-brand/10 text-brand rounded-full">{card.category}</span>
              )}
              {card.readTime && (
                <>
                  <span>•</span>
                  <span>{card.readTime}</span>
                </>
              )}
            </div>
          )}
          <CardTitle className="text-sm font-bold text-foreground group-hover:text-brand transition-colors duration-300 mb-2 line-clamp-2">
            {card.title}
          </CardTitle>
          {showExcerpts && card.excerpt && (
            <p className="text-xs text-foreground/70 leading-relaxed line-clamp-3">
              {card.excerpt}
            </p>
          )}
        </CardHeader>
        
        {showCTAs && (
          <CardContent className="pt-0 pb-3">
            <Button variant="outline" size="sm" asChild className="w-full">
              <a href={card.href}>
                {card.ctaText || "Read More"}
              </a>
            </Button>
          </CardContent>
        )}
      </Card>
    );
  };

  const renderServiceBrandCard = (card: ContentCard, index: number) => {
    return (
      <Card key={card.id || index} className={getCardClasses(card)}>
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-[radial-gradient(65%_50%_at_20%_10%,_rgba(107,196,65,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardContent className="relative p-8">
          <div className="flex items-center gap-4 mb-6">
            {card.icon && <div className="text-4xl">{card.icon}</div>}
            <div>
              <h3 className="text-2xl font-bold text-foreground group-hover:text-brand transition-colors duration-300">
                {card.title}
              </h3>
              {card.description && <p className="text-brand font-medium">{card.description}</p>}
            </div>
          </div>

          {/* Product categories */}
          {card.products && card.products.length > 0 && (
            <div className="space-y-4 mb-6">
              {card.products.map((product, productIndex) => (
                <div key={productIndex} className="border-l-2 border-brand/20 pl-4">
                  <h4 className="font-semibold text-foreground mb-2">{product.category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.models.map((model, modelIndex) => (
                      <span
                        key={modelIndex}
                        className="px-3 py-1 bg-surface/60 text-foreground/70 text-sm rounded-full"
                      >
                        {model}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {card.certifications && card.certifications.length > 0 && (
            <div className="pt-4 border-t border-border/30">
              <h5 className="font-semibold text-foreground mb-2">Certifications:</h5>
              <div className="flex flex-wrap gap-2">
                {card.certifications.map((cert, certIndex) => (
                  <span
                    key={certIndex}
                    className="px-3 py-1 bg-brand/10 text-brand text-sm rounded-full font-medium"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderProjectCard = (card: ContentCard, index: number) => {
    return (
      <Card key={card.id || index} className={getCardClasses(card)}>
        {showImages && card.img && (
          <div className="relative aspect-video">
            {/* gradient ring/glow */}
            <div aria-hidden className="absolute -inset-[6px] rounded-2xl bg-[radial-gradient(65%_50%_at_20%_10%,_rgba(107,196,65,0.22),transparent_60%)]" />
            <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            {showCategories && card.category && (
              <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/15 px-2 py-1 text-[11px] font-medium text-white backdrop-blur">
                {card.category}
              </span>
            )}
            <h3 className="absolute left-3 bottom-3 right-3 text-white text-lg font-semibold drop-shadow">{card.title}</h3>
          </div>
        )}

        <CardHeader className="pb-2">
          <CardTitle className="text-base">{card.title}</CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
          {showExcerpts && card.blurb && (
            <p className="text-sm text-foreground/70">{card.blurb}</p>
          )}
          
          {card.stack && card.stack.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {card.stack.map((tag, idx) => (
                <span key={idx} className="rounded-full border border-border/60 px-2.5 py-1 text-[11px] text-foreground/80">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          {showCTAs && (
            <div className="mt-4">
              <a href={card.href || "#kontakt"} className="text-sm text-brand hover:underline">
                {card.ctaText || "Learn More"} →
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderGeneralCard = (card: ContentCard, index: number) => {
    return (
      <Card key={card.id || index} className={getCardClasses(card)} onClick={() => handleCardClick(card)}>
        {/* Background gradient on hover */}
        <div className="absolute inset-0 bg-[radial-gradient(65%_50%_at_20%_10%,_rgba(107,196,65,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {card.badge && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-2 py-1 text-xs font-medium bg-brand text-white rounded-full">
              {card.badge}
            </span>
          </div>
        )}

        <CardHeader className="pb-4">
          <div className="flex items-start gap-4">
            {card.icon && (
              <div className="p-3 rounded-xl bg-brand/10 group-hover:bg-brand/20 transition-colors duration-300 flex-shrink-0">
                {card.icon}
              </div>
            )}
            <div className="flex-1">
              <CardTitle className="text-lg font-bold text-foreground group-hover:text-brand transition-colors duration-300 mb-2">
                {card.title}
              </CardTitle>
              {showExcerpts && (card.description || card.excerpt) && (
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {card.description || card.excerpt}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        
        {showCTAs && card.href && (
          <CardContent className="pt-0">
            <Button size="sm" variant="default" asChild className="w-full">
              <a href={card.href}>
                {card.ctaText || "Learn More"}
              </a>
            </Button>
          </CardContent>
        )}
      </Card>
    );
  };

  const renderCard = (card: ContentCard, index: number) => {
    switch (variant) {
      case "blog-posts":
        return renderBlogPostCard(card, index);
      case "service-brands":
        return renderServiceBrandCard(card, index);
      case "projects":
        return renderProjectCard(card, index);
      default:
        return renderGeneralCard(card, index);
    }
  };

  return (
    <section className={`${getSectionClasses()} ${className}`}>
      <div className="mx-auto max-w-7xl container-px py-16 md:py-24 text-center">
        {/* Header - Always centered for ContentCards */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {badge && (
            <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-4">
              {badge}
            </span>
          )}
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-center">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl md:text-2xl text-brand font-semibold mb-4 text-center">
              {subtitle}
            </p>
          )}
          <p className="text-lg text-foreground/70 text-center">
            {description}
          </p>
        </div>

        {/* Cards Grid */}
        <div className={getGridClasses()}>
          {cards.map((card, index) => renderCard(card, index))}
        </div>
      </div>
    </section>
  );
}
