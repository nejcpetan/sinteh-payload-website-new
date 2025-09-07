/**
 * ComparisonTable Component - SINTEH PRO Component Library
 * 
 * A professional comparison table component for showcasing advantages,
 * features, and benefits between different solutions or approaches.
 * Perfect for highlighting competitive advantages and decision-making support.
 * 
 * KEY FEATURES:
 * - Flexible comparison items with descriptions
 * - Primary vs secondary column highlighting
 * - Summary cards for key benefits
 * - Bottom CTA section for conversion
 * - Multiple table styles (bordered, striped, minimal)
 * - Icon support and visual indicators
 * - Mobile-responsive design
 * 
 * DECISION SUPPORT:
 * - Clear feature comparisons
 * - Competitive advantage highlighting
 * - Visual decision aids
 * - Trust-building through transparency
 * - Professional presentation
 * 
 * PERFECT FOR:
 * - Product comparisons
 * - Solution benefits
 * - Feature matrices
 * - Competitive analysis
 * - Decision support tools
 * 
 * @example
 * <ComparisonTable
 *   title="Why Choose Our Solution?"
 *   primaryLabel="Our Solution"
 *   secondaryLabel="Traditional Approach"
 *   items={[
 *     {
 *       advantage: "Advanced Technology",
 *       description: "Latest automation systems",
 *       primary: "State-of-the-art PLC",
 *       secondary: "Legacy systems"
 *     }
 *   ]}
 *   highlightPrimary={true}
 * />
 */

interface ComparisonItem {
  advantage: string;
  description: string;
  primary: string;
  secondary: string;
  primaryIcon?: React.ReactNode;
  secondaryIcon?: React.ReactNode;
}

interface SummaryCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface ComparisonTableProps {
  // Core content
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  
  // Comparison data
  items: ComparisonItem[];
  
  // Column headers
  primaryLabel: string;
  secondaryLabel: string;
  
  // Summary cards
  summaryCards?: SummaryCard[];
  
  // Bottom CTA
  bottomCTA?: {
    title: string;
    description: string;
    primaryButton: {
      text: string;
      href: string;
    };
    secondaryButton?: {
      text: string;
      href: string;
    };
  };
  
  // Styling options
  backgroundStyle?: "surface" | "background" | "white";
  tableStyle?: "bordered" | "striped" | "minimal";
  primaryColor?: "brand" | "success" | "info";
  
  // Layout options
  showIcons?: boolean;
  highlightPrimary?: boolean;
  
  // Styling
  className?: string;
}

export function ComparisonTable({
  title,
  subtitle,
  description,
  badge,
  items,
  primaryLabel,
  secondaryLabel,
  summaryCards = [],
  bottomCTA,
  backgroundStyle = "surface",
  tableStyle = "bordered",
  primaryColor = "brand",
  showIcons = true,
  highlightPrimary = true,
  className = ""
}: ComparisonTableProps) {

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

  const getTableClasses = () => {
    let baseClasses = "overflow-hidden rounded-2xl bg-white shadow-sm";
    
    switch (tableStyle) {
      case "bordered":
        baseClasses += " border border-border/60";
        break;
      case "striped":
        baseClasses += " border border-border/60";
        break;
      case "minimal":
        baseClasses += "";
        break;
      default:
        baseClasses += " border border-border/60";
    }
    
    return baseClasses;
  };

  const getPrimaryClasses = () => {
    const colorClasses = {
      brand: "text-brand bg-brand/10",
      success: "text-green-600 bg-green-50",
      info: "text-blue-600 bg-blue-50"
    };
    
    return colorClasses[primaryColor];
  };

  const getCheckIcon = () => {
    return (
      <svg className="w-4 h-4 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    );
  };

  return (
    <section className={`${getSectionClasses()} ${className}`}>
      <div className="mx-auto max-w-7xl container-px py-16 md:py-24">
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
          <p className="text-lg text-foreground/70">
            {description}
          </p>
        </div>

        {/* Comparison table */}
        <div className={getTableClasses()}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={tableStyle === "striped" ? "bg-surface/50" : "bg-surface/50"}>
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Feature</th>
                  <th className={`px-6 py-4 text-center text-sm font-semibold ${highlightPrimary ? getPrimaryClasses().split(' ')[0] : 'text-foreground'}`}>
                    {primaryLabel}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-foreground/60">
                    {secondaryLabel}
                  </th>
                </tr>
              </thead>
              <tbody className={tableStyle === "striped" ? "divide-y divide-border/30" : "divide-y divide-border/30"}>
                {items.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`hover:bg-surface/30 transition-colors duration-200 ${
                      tableStyle === "striped" && index % 2 === 1 ? "bg-surface/20" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-foreground mb-1">{item.advantage}</div>
                        <div className="text-sm text-foreground/70">{item.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                          highlightPrimary ? getPrimaryClasses() : "bg-surface/60 text-foreground"
                        }`}>
                          {showIcons && (item.primaryIcon || getCheckIcon())}
                          {item.primary}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 text-foreground/70 text-sm">
                          {showIcons && item.secondaryIcon}
                          {item.secondary}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary cards */}
        {summaryCards.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {summaryCards.map((card, index) => (
              <div key={index} className="rounded-2xl bg-white border border-border/60 p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{card.title}</h3>
                <p className="text-sm text-foreground/70">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        {bottomCTA && (
          <div className="mt-16 text-center">
            <div className="rounded-2xl bg-white border border-border/60 p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                {bottomCTA.title}
              </h3>
              <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
                {bottomCTA.description}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href={bottomCTA.primaryButton.href}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-full font-medium hover:bg-brand-600 transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {bottomCTA.primaryButton.text}
                </a>
                
                {bottomCTA.secondaryButton && (
                  <a 
                    href={bottomCTA.secondaryButton.href}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-surface text-foreground border border-border rounded-full font-medium hover:bg-surface/70 transition-colors duration-200"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-4 w-4">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7,10 12,15 17,10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    {bottomCTA.secondaryButton.text}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
