/**
 * ContentGrid Component - SINTEH PRO Component Library
 * 
 * A flexible grid component for displaying categorized content such as industries,
 * applications, blog categories, and services. Features interactive cards with
 * hover effects and detailed information display.
 * 
 * KEY FEATURES:
 * - 5 content variants (industry, blog-categories, applications, general, services)
 * - Interactive click handlers
 * - Flexible grid layouts (2, 3, 4 columns)
 * - Multiple card styles (elevated, flat, bordered, minimal)
 * - Icons, applications lists, and post counts
 * - Hover effects and animations
 * - Category badges and tags
 * 
 * INTERACTIVE DESIGN:
 * - Click-to-navigate functionality
 * - Smooth hover transitions
 * - Visual feedback on interaction
 * - Mobile-optimized touch targets
 * - Keyboard navigation support
 * 
 * PERFECT FOR:
 * - Industry showcases
 * - Application examples
 * - Blog category navigation
 * - Service offerings
 * - Content organization
 * 
 * @example
 * <ContentGrid
 *   variant="industry"
 *   title="Industries We Serve"
 *   items={[
 *     {
 *       name: "Manufacturing",
 *       description: "Complete automation solutions",
 *       icon: <ManufacturingIcon />,
 *       applications: ["Assembly lines", "Quality control", "Packaging"]
 *     }
 *   ]}
 *   showApplications={true}
 * />
 */

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface ContentItem {
  id?: string;
  name?: string;
  title?: string;
  description: string;
  icon: React.ReactNode;
  
  // For industry/category grids
  applications?: string[];
  href?: string;
  
  // For blog categories
  postCount?: number;
  color?: string;
  
  // For general content
  details?: string[];
  badge?: string;
  ctaText?: string;
  
  // Additional metadata
  category?: string;
  tags?: string[];
}

export interface ContentGridProps {
  // Layout variants
  variant?: "industry" | "blog-categories" | "applications" | "general" | "services";
  
  // Core content
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  
  // Content items
  items: ContentItem[];
  
  // Layout options
  columns?: 2 | 3 | 4;
  cardStyle?: "elevated" | "flat" | "bordered" | "minimal";
  
  // Background options
  backgroundStyle?: "surface" | "background" | "white" | "light-gray";
  
  // Show/hide elements
  showIcons?: boolean;
  showApplications?: boolean;
  showPostCounts?: boolean;
  showCTAs?: boolean;
  showHoverEffects?: boolean;
  
  // Click behavior
  onItemClick?: (item: ContentItem) => void;
  
  // Styling
  className?: string;
}

export function ContentGrid({
  variant = "general",
  title,
  subtitle,
  description,
  badge,
  items,
  columns = 3,
  cardStyle = "elevated",
  backgroundStyle = "surface",
  showIcons = true,
  showApplications = true,
  showPostCounts = true,
  showCTAs = true,
  showHoverEffects = true,
  onItemClick,
  className = ""
}: ContentGridProps) {

  const getSectionClasses = () => {
    const baseClasses = "w-full";
    
    switch (backgroundStyle) {
      case "surface":
        return `${baseClasses} bg-surface text-foreground`;
      case "background":
        return `${baseClasses} bg-background text-foreground`;
      case "white":
        return `${baseClasses} bg-white text-foreground`;
      case "light-gray":
        return `${baseClasses} bg-[#f6f8fa] text-[#0f1720]`;
      default:
        return `${baseClasses} bg-surface text-foreground`;
    }
  };

  const getContainerClasses = () => {
    let classes = "relative mx-auto max-w-7xl container-px py-16 md:py-24";
    
    if (variant === "industry" && backgroundStyle === "light-gray") {
      classes += " relative";
    }
    
    return classes;
  };

  const getGridClasses = () => {
    const gridClasses = {
      2: "md:grid-cols-2",
      3: "md:grid-cols-2 lg:grid-cols-3",
      4: "md:grid-cols-2 lg:grid-cols-4"
    };
    
    if (variant === "blog-categories") {
      return "grid sm:grid-cols-2 lg:grid-cols-3 gap-4";
    }
    
    return `grid ${gridClasses[columns]} gap-6`;
  };

  const getCardClasses = (item: ContentItem) => {
    let baseClasses = "group relative overflow-hidden";
    
    // Card style
    switch (cardStyle) {
      case "elevated":
        baseClasses += " bg-white border border-border/60 shadow-sm";
        break;
      case "flat":
        baseClasses += " bg-white";
        break;
      case "bordered":
        baseClasses += " bg-white border border-border/60";
        break;
      case "minimal":
        baseClasses += " bg-surface/40";
        break;
      default:
        baseClasses += " bg-white border border-border/60";
    }
    
    // Industry variant specific styling
    if (variant === "industry" && backgroundStyle === "light-gray") {
      baseClasses = baseClasses.replace("border-border/60", "border-[#e5e9ee]");
    }
    
    // Hover effects
    if (showHoverEffects) {
      if (variant === "blog-categories") {
        baseClasses += " hover:shadow-lg hover:border-brand/30 transition-all duration-300 cursor-pointer";
      } else if (variant === "industry") {
        baseClasses += " hover:shadow-lg transition-all hover:-translate-y-0.5";
        if (item.href) baseClasses += " cursor-pointer";
      } else {
        baseClasses += " hover:shadow-lg hover:border-brand/30 transition-all duration-300";
      }
    }
    
    return baseClasses;
  };

  const handleItemClick = (item: ContentItem) => {
    if (onItemClick) {
      onItemClick(item);
    } else if (item.href) {
      window.location.href = item.href;
    }
  };

  const renderBackgroundElements = () => {
    if (variant === "industry" && backgroundStyle === "light-gray") {
      return (
        <div aria-hidden className="pointer-events-none absolute -top-10 left-0 right-0 h-32 bg-[radial-gradient(60%_40%_at_10%_20%,_rgba(107,196,65,0.15),transparent_60%)]" />
      );
    }
    return null;
  };

  const renderCardContent = (item: ContentItem, index: number) => {
    if (variant === "blog-categories") {
      return (
        <Card key={item.id || index} className={getCardClasses(item)}>
          <a href={item.href} className="block">
            <div className="absolute inset-0 bg-[radial-gradient(65%_50%_at_20%_10%,_rgba(107,196,65,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3 mb-2">
                {showIcons && (
                  <div className={`p-2 rounded-lg ${item.color || 'bg-brand/10'} flex-shrink-0`}>
                    {item.icon}
                  </div>
                )}
                <div className="flex-1">
                  <CardTitle className="text-sm font-bold text-foreground group-hover:text-brand transition-colors duration-300">
                    {item.name || item.title}
                  </CardTitle>
                  {showPostCounts && item.postCount !== undefined && (
                    <div className="text-xs text-foreground/60">
                      {item.postCount} {item.postCount === 1 ? 'članek' : item.postCount < 5 ? 'članki' : 'člankov'}
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0 pb-3">
              <p className="text-xs text-foreground/70 leading-relaxed mb-3 line-clamp-2">
                {item.description}
              </p>
              
              {showCTAs && (
                <div className="flex items-center text-brand text-xs font-medium">
                  <span>Raziskuj</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3 w-3 ml-1">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              )}
            </CardContent>
          </a>
        </Card>
      );
    }

    return (
      <Card 
        key={item.id || index} 
        className={getCardClasses(item)}
        onClick={() => handleItemClick(item)}
      >
        {/* Background gradient on hover */}
        {showHoverEffects && (
          <div className="absolute inset-0 bg-[radial-gradient(65%_50%_at_20%_10%,_rgba(107,196,65,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            {showIcons && (
              <div className={`p-3 rounded-lg bg-brand/10 text-brand flex-shrink-0 ${variant === "applications" ? "text-4xl" : ""}`}>
                {item.icon}
              </div>
            )}
            <div className="flex-1">
              <h4 className={`font-semibold mb-2 ${
                variant === "industry" && backgroundStyle === "light-gray" ? "text-[#0f1720]" : "text-foreground"
              } ${variant === "applications" ? "text-lg font-bold group-hover:text-brand transition-colors duration-300" : ""}`}>
                {item.name || item.title}
              </h4>
              
              <p className={`text-sm mb-3 ${
                variant === "industry" && backgroundStyle === "light-gray" ? "text-black/70" : "text-foreground/70"
              } ${variant === "applications" ? "leading-relaxed" : ""}`}>
                {item.description}
              </p>
              
              {/* Applications list */}
              {showApplications && item.applications && item.applications.length > 0 && (
                <div className="space-y-1">
                  {item.applications.map((app, appIndex) => (
                    <div key={appIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand"></div>
                      <span className={`text-xs ${
                        variant === "industry" && backgroundStyle === "light-gray" ? "text-black/60" : "text-foreground/60"
                      }`}>
                        {app}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Details list */}
              {item.details && item.details.length > 0 && (
                <ul className="space-y-2">
                  {item.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-2 text-sm text-foreground/70">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand/60 flex-shrink-0 mt-2"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Badge */}
              {item.badge && (
                <div className="mt-3">
                  <span className="px-2 py-1 text-xs font-medium bg-brand/10 text-brand rounded-full">
                    {item.badge}
                  </span>
                </div>
              )}

              {/* Category */}
              {item.category && (
                <div className="mt-2">
                  <span className="text-xs text-brand font-medium">{item.category}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className={`${getSectionClasses()} ${className}`}>
      <div className={getContainerClasses()}>
        {renderBackgroundElements()}
        
        {/* Header */}
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
          <p className={`text-lg ${
            variant === "industry" && backgroundStyle === "light-gray" ? "text-black/70" : "text-foreground/70"
          }`}>
            {description}
          </p>
        </div>

        {/* Content Grid */}
        <div className={getGridClasses()}>
          {items.map((item, index) => renderCardContent(item, index))}
        </div>
      </div>
    </section>
  );
}
