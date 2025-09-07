/**
 * BrandShowcase Component - SINTEH PRO Component Library
 * 
 * A versatile component for displaying partner logos, certifications,
 * service brands, and trust indicators. Features multiple layout variants
 * including animated marquee effects for dynamic brand presentation.
 * 
 * KEY FEATURES:
 * - 4 layout variants (logo-belt, service-brands, partner-grid, certification-badges)
 * - Animated marquee for logo belts
 * - Detailed service brand cards
 * - Certification displays
 * - Partner information with specializations
 * - Flexible grid layouts
 * - Animation controls (speed, direction)
 * 
 * TRUST BUILDING:
 * - Partner credibility display
 * - Certification showcases
 * - Professional associations
 * - Service capabilities
 * - Brand recognition
 * 
 * PERFECT FOR:
 * - Partner pages
 * - Certification displays
 * - Trust indicators
 * - Service brand showcases
 * - Professional associations
 * - Credential displays
 * 
 * @example
 * <BrandShowcase
 *   variant="service-brands"
 *   title="Authorized Service Partners"
 *   brands={[
 *     {
 *       name: "ABB",
 *       description: "Authorized service partner",
 *       products: [{ category: "Drives", models: ["ACS880", "ACS580"] }],
 *       certifications: ["Authorized Partner"]
 *     }
 *   ]}
 *   showCertifications={true}
 * />
 */

import { Card, CardContent } from "@/components/ui/card";

interface Brand {
  name: string;
  logo?: string;
  description?: string;
  
  // For service brands
  products?: Array<{
    category: string;
    models: string[];
  }>;
  certifications?: string[];
  icon?: React.ReactNode;
  
  // For logo belt
  logoUrl?: string;
  
  // For partner showcase
  partnershipLevel?: string;
  yearsPartner?: number;
  specializations?: string[];
}

export interface BrandShowcaseProps {
  // Layout variants
  variant?: "logo-belt" | "service-brands" | "partner-grid" | "certification-badges";
  
  // Core content
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  
  // Brands data
  brands: Brand[];
  
  // Layout options
  columns?: 2 | 3 | 4 | 5;
  animation?: "marquee" | "fade" | "none";
  
  // Styling options
  backgroundStyle?: "background" | "surface" | "white" | "transparent";
  brandStyle?: "logos-only" | "cards" | "badges" | "detailed";
  
  // Show/hide elements
  showDescriptions?: boolean;
  showCertifications?: boolean;
  showProducts?: boolean;
  
  // Marquee options (for logo-belt variant)
  marqueeSpeed?: "slow" | "normal" | "fast";
  marqueeDirection?: "left" | "right";
  
  // Styling
  className?: string;
}

export function BrandShowcase({
  variant = "logo-belt",
  title,
  subtitle,
  description,
  badge,
  brands,
  columns = 3,
  animation = "none",
  backgroundStyle = "background",
  brandStyle = "logos-only",
  showDescriptions = true,
  showCertifications = true,
  showProducts = true,
  marqueeSpeed = "normal",
  marqueeDirection = "left",
  className = ""
}: BrandShowcaseProps) {

  const getSectionClasses = () => {
    const baseClasses = "w-full";
    
    switch (backgroundStyle) {
      case "background":
        return `${baseClasses} bg-background text-foreground`;
      case "surface":
        return `${baseClasses} bg-surface text-foreground`;
      case "white":
        return `${baseClasses} bg-white text-foreground`;
      case "transparent":
        return `${baseClasses}`;
      default:
        return `${baseClasses} bg-background text-foreground`;
    }
  };

  const getContainerClasses = () => {
    if (variant === "logo-belt") {
      return "relative py-8 overflow-hidden";
    }
    return "mx-auto max-w-7xl container-px py-16 md:py-24";
  };

  const getGridClasses = () => {
    if (variant === "service-brands") {
      return "grid lg:grid-cols-2 gap-8";
    }
    
    if (variant === "certification-badges") {
      return "flex flex-wrap justify-center items-center gap-8";
    }
    
    const gridClasses = {
      2: "md:grid-cols-2",
      3: "md:grid-cols-2 lg:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
    };
    
    return `grid ${gridClasses[columns]} gap-6`;
  };

  const getMarqueeClasses = () => {
    const speedClasses = {
      slow: "animate-marquee-slow",
      normal: "animate-marquee",
      fast: "animate-marquee-fast"
    };
    
    const directionClass = marqueeDirection === "right" ? "animate-marquee-reverse" : "";
    
    return `marquee whitespace-nowrap ${speedClasses[marqueeSpeed]} ${directionClass}`;
  };

  const renderHeader = () => {
    if (!title && !subtitle && !description) return null;
    
    return (
      <div className="text-center max-w-3xl mx-auto mb-12">
        {badge && (
          <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-4">
            {badge}
          </span>
        )}
        {title && (
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-xl md:text-2xl text-brand font-semibold mb-4">
            {subtitle}
          </p>
        )}
        {description && (
          <p className="text-lg text-foreground/70">
            {description}
          </p>
        )}
      </div>
    );
  };

  const renderLogoBelt = () => {
    // Duplicate brands for seamless loop
    const duplicatedBrands = [...brands, ...brands, ...brands];
    
    return (
      <div className={getMarqueeClasses()}>
        {duplicatedBrands.map((brand, index) => (
          <span key={index} className="inline-block mx-8 align-middle opacity-80 hover:opacity-100 transition-opacity">
            <span className="relative block h-8 w-[150px]">
              {brand.logoUrl ? (
                <img src={brand.logoUrl} alt={brand.name} className="h-full w-full object-contain" />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-surface/60 rounded text-xs font-medium text-foreground/60">
                  {brand.name}
                </div>
              )}
            </span>
          </span>
        ))}
      </div>
    );
  };

  const renderServiceBrands = () => {
    return (
      <div className={getGridClasses()}>
        {brands.map((brand, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden bg-white border border-border/60 hover:shadow-xl hover:border-brand/30 transition-all duration-300"
          >
            {/* Background gradient on hover */}
            <div className="absolute inset-0 bg-[radial-gradient(65%_50%_at_20%_10%,_rgba(107,196,65,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <CardContent className="relative p-8">
              <div className="flex items-center gap-4 mb-6">
                {brand.icon && <div className="text-4xl">{brand.icon}</div>}
                <div>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-brand transition-colors duration-300">
                    {brand.name}
                  </h3>
                  {showDescriptions && brand.description && (
                    <p className="text-brand font-medium">{brand.description}</p>
                  )}
                </div>
              </div>

              {/* Product categories */}
              {showProducts && brand.products && brand.products.length > 0 && (
                <div className="space-y-4 mb-6">
                  {brand.products.map((product, productIndex) => (
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
              {showCertifications && brand.certifications && brand.certifications.length > 0 && (
                <div className="pt-4 border-t border-border/30">
                  <h5 className="font-semibold text-foreground mb-2">Certifications:</h5>
                  <div className="flex flex-wrap gap-2">
                    {brand.certifications.map((cert, certIndex) => (
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
        ))}
      </div>
    );
  };

  const renderPartnerGrid = () => {
    return (
      <div className={getGridClasses()}>
        {brands.map((brand, index) => (
          <Card key={index} className="bg-white border border-border/60 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              {brand.icon && (
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  {brand.icon}
                </div>
              )}
              
              <h3 className="text-lg font-bold text-foreground mb-2">{brand.name}</h3>
              
              {showDescriptions && brand.description && (
                <p className="text-sm text-foreground/70 mb-4">{brand.description}</p>
              )}
              
              {brand.partnershipLevel && (
                <div className="mb-3">
                  <span className="px-3 py-1 bg-brand/10 text-brand text-sm rounded-full font-medium">
                    {brand.partnershipLevel}
                  </span>
                </div>
              )}
              
              {brand.yearsPartner && (
                <div className="text-xs text-foreground/60">
                  {brand.yearsPartner}+ years partnership
                </div>
              )}
              
              {brand.specializations && brand.specializations.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1 justify-center">
                  {brand.specializations.map((spec, specIndex) => (
                    <span key={specIndex} className="px-2 py-1 bg-surface/60 text-foreground/60 text-xs rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const renderCertificationBadges = () => {
    return (
      <div className={getGridClasses()}>
        {brands.map((brand, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-brand/10 border-2 border-brand/30 flex items-center justify-center mb-2">
              {brand.icon || (
                <span className="text-brand font-bold text-sm">{brand.name.substring(0, 3).toUpperCase()}</span>
              )}
            </div>
            <span className="text-xs text-foreground/70 text-center">{brand.name}</span>
            {showDescriptions && brand.description && (
              <span className="text-xs text-foreground/60 text-center mt-1">{brand.description}</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (variant) {
      case "logo-belt":
        return renderLogoBelt();
      case "service-brands":
        return renderServiceBrands();
      case "partner-grid":
        return renderPartnerGrid();
      case "certification-badges":
        return renderCertificationBadges();
      default:
        return renderLogoBelt();
    }
  };

  return (
    <section className={`${getSectionClasses()} ${className}`}>
      <div className={getContainerClasses()}>
        {variant !== "logo-belt" && renderHeader()}
        {renderContent()}
      </div>
    </section>
  );
}
