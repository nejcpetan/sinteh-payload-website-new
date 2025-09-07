/**
 * TechnicalContent Component - SINTEH PRO Component Library
 * 
 * A comprehensive component for presenting technical information,
 * specifications, process explanations, and detailed product information.
 * Perfect for technical documentation and product detail pages.
 * 
 * KEY FEATURES:
 * - 3 layout variants (overview, specifications, combined)
 * - Technical process step visualization
 * - Detailed specifications tables
 * - Certification badge displays
 * - Technical diagrams and imagery
 * - Benefits and highlights sections
 * - Flexible content layouts (split, stacked)
 * 
 * TECHNICAL EXCELLENCE:
 * - Professional technical presentation
 * - Clear process explanations
 * - Detailed specifications
 * - Certification displays
 * - Visual technical diagrams
 * - Expert credibility building
 * 
 * PERFECT FOR:
 * - Product specifications
 * - Technical documentation
 * - Process explanations
 * - Certification displays
 * - Technical overviews
 * - Product detail pages
 * 
 * @example
 * <TechnicalContent
 *   variant="combined"
 *   title="Technical Specifications"
 *   overviewContent="<p>Advanced mechanical safety system...</p>"
 *   specifications={[
 *     {
 *       category: "Safety",
 *       items: [{ label: "Safety Level", value: "SIL 3" }]
 *     }
 *   ]}
 *   certificationBadges={[
 *     { name: "TÜV", description: "Certified" }
 *   ]}
 * />
 */

interface Specification {
  category: string;
  items: Array<{
    label: string;
    value: string;
  }>;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface TechnicalBenefit {
  title: string;
  description: string;
}

export interface TechnicalContentProps {
  // Layout variants
  variant?: "overview" | "specifications" | "combined";
  
  // Core content
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  
  // Technical overview content
  overviewContent?: string;
  processSteps?: ProcessStep[];
  technicalBenefits?: TechnicalBenefit[];
  
  // Specifications content
  specifications?: Specification[];
  certificationBadges?: Array<{
    name: string;
    description: string;
  }>;
  
  // Additional info section
  additionalInfo?: {
    title: string;
    content: string;
    highlights?: Array<{
      label: string;
      value: string;
    }>;
  };
  
  // Visual elements
  showTechnicalImage?: boolean;
  technicalImageIcon?: React.ReactNode;
  technicalImageTitle?: string;
  technicalImageSubtitle?: string;
  
  // Layout options
  imagePosition?: "left" | "right";
  contentLayout?: "split" | "stacked";
  
  // Background options
  backgroundStyle?: "background" | "surface" | "white";
  
  // Styling
  className?: string;
}

export function TechnicalContent({
  variant = "overview",
  title,
  subtitle,
  description,
  badge,
  overviewContent,
  processSteps = [],
  technicalBenefits = [],
  specifications = [],
  certificationBadges = [],
  additionalInfo,
  showTechnicalImage = true,
  technicalImageIcon = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12 mx-auto text-foreground/40">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1m15.5-6.5l-4.24 4.24M7.76 16.24l-4.24 4.24m12.73 0l-4.24-4.24M7.76 7.76L3.52 3.52"/>
    </svg>
  ),
  technicalImageTitle = "Trapped Key Sequence",
  technicalImageSubtitle = "Technical diagram placeholder",
  imagePosition = "left",
  contentLayout = "split",
  backgroundStyle = "background",
  className = ""
}: TechnicalContentProps) {

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
        {description && (
          <p className="text-lg text-foreground/70">
            {description}
          </p>
        )}
      </div>
    );
  };

  const renderTechnicalImage = () => {
    if (!showTechnicalImage) return null;
    
    return (
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
        {/* Decorative glow */}
        <div
          aria-hidden
          className="absolute -inset-6 rounded-[28px] bg-[radial-gradient(80%_60%_at_30%_20%,_rgba(107,196,65,0.18),transparent_60%)]"
        />
        
        {/* Image placeholder */}
        <div className="relative w-full h-full bg-surface border-2 border-border/50 flex items-center justify-center">
          <div className="text-center text-foreground/40">
            <div className="text-5xl mb-3">
              {technicalImageIcon}
            </div>
            <div className="text-base font-medium">{technicalImageTitle}</div>
            <div className="text-sm mt-1">{technicalImageSubtitle}</div>
          </div>
          
          {/* Technical pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(107,196,65,0.03)_25%,rgba(107,196,65,0.03)_50%,transparent_50%,transparent_75%,rgba(107,196,65,0.03)_75%)] bg-[length:20px_20px]"></div>
        </div>
      </div>
    );
  };

  const renderOverviewContent = () => {
    return (
      <div>
        {overviewContent && (
          <div className="prose prose-lg max-w-none text-foreground/80 mb-8">
            <div dangerouslySetInnerHTML={{ __html: overviewContent }} />
          </div>
        )}

        {/* Process steps */}
        {processSteps.length > 0 && (
          <div className="space-y-4 mb-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  {step.number}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                  <p className="text-sm text-foreground/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Technical benefits */}
        {technicalBenefits.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-4">
            {technicalBenefits.map((benefit, index) => (
              <div key={index} className="rounded-xl bg-surface/60 p-4 border border-border/40">
                <h5 className="font-semibold text-foreground mb-2">{benefit.title}</h5>
                <p className="text-sm text-foreground/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSpecifications = () => {
    return (
      <div className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white border border-border/60 p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-brand"></div>
                {spec.category}
              </h3>
              
              <div className="space-y-3">
                {spec.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex justify-between items-start py-2 border-b border-border/30 last:border-b-0"
                  >
                    <span className="text-foreground/70 text-sm font-medium flex-1">
                      {item.label}
                    </span>
                    <span className="text-foreground font-semibold text-sm text-right ml-4 flex-1">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certification badges */}
        {certificationBadges.length > 0 && (
          <div className="mt-16 text-center">
            <h3 className="text-xl font-bold text-foreground mb-8">Certification and Approvals</h3>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {certificationBadges.map((badge, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-brand/10 border-2 border-brand/30 flex items-center justify-center mb-2">
                    <span className="text-brand font-bold text-sm">{badge.name}</span>
                  </div>
                  <span className="text-xs text-foreground/70">{badge.description}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional info */}
        {additionalInfo && (
          <div className="mt-12 rounded-2xl bg-white border border-border/60 p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-brand/10">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6 text-brand">
                  <path d="M12 8v4l3 3" />
                  <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-foreground mb-2">{additionalInfo.title}</h4>
                <p className="text-foreground/70 mb-4">{additionalInfo.content}</p>
                
                {additionalInfo.highlights && additionalInfo.highlights.length > 0 && (
                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    {additionalInfo.highlights.map((highlight, index) => (
                      <div key={index}>
                        <span className="font-medium text-foreground">{highlight.label}:</span>
                        <span className="text-foreground/70 ml-2">{highlight.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderOverviewVariant = () => {
    if (contentLayout === "stacked") {
      return (
        <div className="space-y-12">
          {showTechnicalImage && (
            <div className="max-w-4xl mx-auto">
              {renderTechnicalImage()}
            </div>
          )}
          {renderOverviewContent()}
        </div>
      );
    }

    return (
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Technical Image */}
        <div className={imagePosition === "left" ? "order-1 lg:order-1" : "order-1 lg:order-2"}>
          {renderTechnicalImage()}
        </div>

        {/* Content */}
        <div className={imagePosition === "left" ? "order-2 lg:order-2" : "order-2 lg:order-1"}>
          {renderOverviewContent()}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (variant) {
      case "overview":
        return renderOverviewVariant();
      case "specifications":
        return renderSpecifications();
      case "combined":
        return (
          <div className="space-y-16">
            {renderOverviewVariant()}
            {renderSpecifications()}
          </div>
        );
      default:
        return renderOverviewVariant();
    }
  };

  return (
    <section className={`${getSectionClasses()} ${className}`}>
      <div className="mx-auto max-w-7xl container-px py-16 md:py-24">
        {renderHeader()}
        {renderContent()}
      </div>
    </section>
  );
}
