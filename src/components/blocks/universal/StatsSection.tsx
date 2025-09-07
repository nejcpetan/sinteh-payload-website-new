/**
 * StatsSection Component - SINTEH PRO Component Library
 * 
 * A powerful statistics display component for showcasing key metrics, achievements,
 * and performance indicators. Supports multiple layouts and styling options for
 * maximum visual impact and credibility building.
 * 
 * KEY FEATURES:
 * - 5 layout variants (standard, compact, highlighted, inline, cards)
 * - Flexible column layouts (2, 3, 4, 5 columns)
 * - Multiple alignment options (left, center, right)
 * - Various styling options (default, bordered, highlighted, minimal)
 * - Icons and descriptions support
 * - Responsive design
 * 
 * CREDIBILITY BUILDING:
 * - Showcase company achievements
 * - Display project statistics
 * - Highlight performance metrics
 * - Build trust with numbers
 * - Social proof through data
 * 
 * PERFECT FOR:
 * - Company achievements
 * - Project statistics
 * - Performance metrics
 * - Trust indicators
 * - Success stories
 * 
 * @example
 * <StatsSection
 *   variant="standard"
 *   title="Our Track Record"
 *   stats={[
 *     { value: "500+", label: "Projects Completed", description: "Successful implementations" },
 *     { value: "30+", label: "Years Experience", description: "Industry expertise" }
 *   ]}
 *   columns={4}
 * />
 */

interface Stat {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface StatsSectionProps {
  // Layout variants
  variant?: "standard" | "compact" | "highlighted" | "inline" | "cards";
  
  // Core content
  title?: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  
  // Stats data
  stats: Stat[];
  
  // Layout options
  columns?: 2 | 3 | 4 | 5;
  alignment?: "left" | "center" | "right";
  
  // Styling options
  backgroundStyle?: "background" | "surface" | "white" | "transparent";
  statStyle?: "default" | "bordered" | "highlighted" | "minimal";
  
  // Show/hide elements
  showIcons?: boolean;
  showDescriptions?: boolean;
  
  // Styling
  className?: string;
}

export function StatsSection({
  variant = "standard",
  title,
  subtitle,
  description,
  badge,
  stats,
  columns = 3,
  alignment = "center",
  backgroundStyle = "background",
  statStyle = "default",
  showIcons = false,
  showDescriptions = true,
  className = ""
}: StatsSectionProps) {

  const getSectionClasses = () => {
    const baseClasses = "w-full text-foreground";
    
    switch (backgroundStyle) {
      case "background":
        return `${baseClasses} bg-background`;
      case "surface":
        return `${baseClasses} bg-surface`;
      case "white":
        return `${baseClasses} bg-white`;
      case "transparent":
        return `${baseClasses}`;
      default:
        return `${baseClasses} bg-background`;
    }
  };

  const getContainerClasses = () => {
    if (variant === "inline" || variant === "compact") {
      return "mx-auto max-w-7xl container-px py-8 md:py-12";
    }
    return "mx-auto max-w-7xl container-px py-16 md:py-24";
  };

  const getGridClasses = () => {
    const gridClasses = {
      2: "grid-cols-2",
      3: "sm:grid-cols-3",
      4: "sm:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
    };
    
    if (variant === "compact") {
      return "flex flex-wrap justify-center gap-4";
    }
    
    if (variant === "inline") {
      return "flex flex-wrap justify-center gap-6 md:gap-8";
    }
    
    const alignmentClass = alignment === "left" ? "" : alignment === "right" ? "text-right" : "text-center";
    return `grid ${gridClasses[columns]} gap-8 ${alignmentClass}`;
  };

  const getStatClasses = () => {
    let baseClasses = "space-y-2";
    
    if (variant === "cards") {
      baseClasses = "p-6 rounded-2xl bg-white border border-border/60 hover:shadow-lg transition-shadow duration-300 text-center";
    } else if (variant === "highlighted") {
      baseClasses += " p-4 rounded-xl bg-surface/50";
    } else if (variant === "compact") {
      baseClasses = "text-center";
    } else if (variant === "inline") {
      baseClasses = "text-center";
    }
    
    switch (statStyle) {
      case "bordered":
        baseClasses += " border border-border/30 rounded-lg p-4";
        break;
      case "highlighted":
        baseClasses += " bg-brand/5 rounded-lg p-4";
        break;
      case "minimal":
        baseClasses += " p-2";
        break;
    }
    
    return baseClasses;
  };

  const getValueClasses = () => {
    if (variant === "compact") {
      return "text-lg font-bold text-brand";
    }
    if (variant === "inline") {
      return "text-2xl md:text-3xl font-extrabold text-brand";
    }
    return "text-4xl font-extrabold text-brand mb-2";
  };

  const getLabelClasses = () => {
    if (variant === "compact") {
      return "text-xs text-foreground/70";
    }
    if (variant === "inline") {
      return "text-sm text-foreground/70";
    }
    return "font-semibold text-foreground mb-1";
  };

  const getDescriptionClasses = () => {
    if (variant === "compact" || variant === "inline") {
      return "text-xs text-foreground/60 mt-1";
    }
    return "text-sm text-foreground/60";
  };

  const renderStat = (stat: Stat, index: number) => {
    if (variant === "compact") {
      return (
        <div key={index} className={getStatClasses()}>
          <div className={getValueClasses()}>{stat.value}</div>
          <div className={getLabelClasses()}>{stat.label}</div>
          {showDescriptions && stat.description && (
            <div className={getDescriptionClasses()}>{stat.description}</div>
          )}
        </div>
      );
    }

    if (variant === "inline") {
      return (
        <div key={index} className={getStatClasses()}>
          <div className={getValueClasses()}>{stat.value}</div>
          <div className={getLabelClasses()}>{stat.label}</div>
          {showDescriptions && stat.description && (
            <div className={getDescriptionClasses()}>{stat.description}</div>
          )}
        </div>
      );
    }

    return (
      <div key={index} className={getStatClasses()}>
        {showIcons && stat.icon && (
          <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-3">
            {stat.icon}
          </div>
        )}
        <div className={getValueClasses()}>
          {stat.value}
        </div>
        <div className={getLabelClasses()}>
          {stat.label}
        </div>
        {showDescriptions && stat.description && (
          <div className={getDescriptionClasses()}>
            {stat.description}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className={`${getSectionClasses()} ${className}`}>
      <div className={getContainerClasses()}>
        {/* Header - only show for non-inline variants */}
        {variant !== "inline" && variant !== "compact" && (title || subtitle || description) && (
          <div className={`max-w-3xl mx-auto mb-12 ${alignment === "left" ? "text-left" : alignment === "right" ? "text-right" : "text-center"}`}>
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
        )}

        {/* Stats Grid */}
        <div className={getGridClasses()}>
          {stats.map((stat, index) => renderStat(stat, index))}
        </div>
      </div>
    </section>
  );
}
