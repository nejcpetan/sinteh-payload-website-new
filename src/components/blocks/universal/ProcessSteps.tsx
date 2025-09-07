/**
 * ProcessSteps Component - SINTEH PRO Component Library
 * 
 * A comprehensive component for displaying sequential processes, workflows,
 * and implementation steps. Perfect for explaining service processes,
 * maintenance programs, and step-by-step procedures.
 * 
 * KEY FEATURES:
 * - 4 layout variants (horizontal, vertical, service-process, maintenance-programs)
 * - Timeline and card layouts
 * - Process step details with durations
 * - Maintenance program pricing
 * - Benefits showcase
 * - Interactive elements
 * 
 * PROCESS CLARITY:
 * - Clear step-by-step visualization
 * - Duration and deliverable tracking
 * - Professional service presentation
 * - Trust-building through transparency
 * - Easy-to-follow workflows
 * 
 * PERFECT FOR:
 * - Service implementation processes
 * - Maintenance program offerings
 * - Workflow explanations
 * - Step-by-step guides
 * - Service packages
 * 
 * @example
 * <ProcessSteps
 *   variant="horizontal"
 *   title="Our Implementation Process"
 *   steps={[
 *     {
 *       number: "1",
 *       title: "Assessment",
 *       description: "Analyze your current systems",
 *       duration: "1-2 days"
 *     }
 *   ]}
 *   showDuration={true}
 * />
 */

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details?: string[];
  duration?: string;
  deliverable?: string;
  icon?: React.ReactNode;
}

interface MaintenanceProgram {
  title: string;
  description: string;
  frequency: string;
  includes: string[];
  price: string;
  popular?: boolean;
}

export interface ProcessStepsProps {
  // Layout variants
  variant?: "horizontal" | "vertical" | "service-process" | "maintenance-programs";
  
  // Core content
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  
  // Steps data
  steps: ProcessStep[];
  
  // Maintenance programs (for service-process variant)
  maintenancePrograms?: MaintenanceProgram[];
  
  // Benefits (for service-process variant)
  benefits?: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
  
  // Layout options
  layout?: "timeline" | "cards" | "compact";
  
  // Background options
  backgroundStyle?: "background" | "surface" | "white";
  
  // Show/hide elements
  showDuration?: boolean;
  showDeliverable?: boolean;
  showDetails?: boolean;
  showConnectors?: boolean;
  
  // Styling
  className?: string;
}

export function ProcessSteps({
  variant = "horizontal",
  title,
  subtitle,
  description,
  badge,
  steps,
  maintenancePrograms = [],
  benefits = [],
  layout = "timeline",
  backgroundStyle = "background",
  showDuration = true,
  showDeliverable = true,
  showDetails = true,
  showConnectors = true,
  className = ""
}: ProcessStepsProps) {

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

  const renderHorizontalSteps = () => {
    return (
      <div className="relative mb-8">
        {/* Timeline line - horizontal on desktop, vertical on mobile */}
        {showConnectors && (
          <>
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-border/40"></div>
            <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-border/40"></div>
          </>
        )}
        
        <div className="grid md:grid-cols-5 gap-4 md:gap-2">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Timeline dot */}
              <div className="absolute md:relative md:mx-auto w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-bold text-sm z-10 md:mb-4">
                {step.icon || step.number}
              </div>
              
              {/* Content card */}
              <div className="bg-white rounded-lg border border-border/60 p-4 ml-12 md:ml-0 hover:shadow-lg transition-shadow duration-300">
                <div className="mb-3">
                  <h3 className="text-sm font-bold text-foreground leading-tight mb-1">{step.title}</h3>
                  <p className="text-xs text-foreground/70">{step.description}</p>
                </div>
                
                {showDetails && step.details && step.details.length > 0 && (
                  <ul className="space-y-1 mb-3">
                    {step.details.slice(0, 2).map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-1 text-xs text-foreground/70">
                        <div className="h-1 w-1 rounded-full bg-brand/60 flex-shrink-0 mt-1"></div>
                        <span className="leading-tight">{detail}</span>
                      </li>
                    ))}
                    {step.details.length > 2 && (
                      <li className="text-xs text-foreground/50">+{step.details.length - 2} more</li>
                    )}
                  </ul>
                )}
                
                {(showDuration && step.duration) || (showDeliverable && step.deliverable) && (
                  <div className="flex items-center justify-between pt-2 border-t border-border/20 text-xs">
                    {showDuration && step.duration && (
                      <span className="text-foreground/60">{step.duration}</span>
                    )}
                    {showDeliverable && step.deliverable && (
                      <span className="text-brand font-medium text-xs">{step.deliverable}</span>
                    )}
                  </div>
                )}
              </div>

              {/* Arrow for desktop */}
              {showConnectors && index < steps.length - 1 && (
                <div className="hidden md:block absolute top-4 -right-3 text-brand/60">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderVerticalSteps = () => {
    return (
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center text-lg font-bold flex-shrink-0">
              {step.icon || step.number}
            </div>
            <div className="flex-1 bg-white rounded-lg border border-border/60 p-6 hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-foreground/70 mb-4">{step.description}</p>
              
              {showDetails && step.details && step.details.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-2 text-sm text-foreground/70">
                      <div className="h-1.5 w-1.5 rounded-full bg-brand/60 flex-shrink-0 mt-2"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
              
              {((showDuration && step.duration) || (showDeliverable && step.deliverable)) && (
                <div className="flex items-center gap-6 pt-3 border-t border-border/20 text-sm">
                  {showDuration && step.duration && (
                    <div>
                      <span className="text-foreground/60">Duration: </span>
                      <span className="font-medium text-foreground">{step.duration}</span>
                    </div>
                  )}
                  {showDeliverable && step.deliverable && (
                    <div>
                      <span className="text-foreground/60">Result: </span>
                      <span className="text-brand font-medium">{step.deliverable}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderServiceProcess = () => {
    return (
      <>
        {/* Emergency services */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="group relative overflow-hidden bg-white border border-border/60 hover:shadow-xl hover:border-brand/30 transition-all duration-300 rounded-lg">
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-[radial-gradient(65%_50%_at_20%_10%,_rgba(107,196,65,0.06),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-6">
                <div className="text-4xl mb-4">{step.icon}</div>
                
                <h3 className="text-xl font-bold text-foreground group-hover:text-brand transition-colors duration-300 mb-2">
                  {step.title}
                </h3>
                
                <p className="text-foreground/70 mb-4">{step.description}</p>
                
                {showDetails && step.details && (
                  <ul className="space-y-2 mb-4">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2 text-sm text-foreground/70">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand/60 flex-shrink-0 mt-2"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Additional info */}
                {(step.duration || step.deliverable) && (
                  <div className="pt-4 border-t border-border/30">
                    {step.duration && (
                      <div className="text-center">
                        <div className="text-sm text-foreground/60 mb-1">Duration:</div>
                        <div className="text-sm font-medium text-foreground">{step.duration}</div>
                      </div>
                    )}
                    {step.deliverable && (
                      <div className="text-center">
                        <div className="text-sm text-foreground/60 mb-1">Contact:</div>
                        <div className="text-brand font-bold">{step.deliverable}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Maintenance programs */}
        {maintenancePrograms.length > 0 && (
          <div className="bg-white rounded-2xl border border-border/60 p-6 md:p-8">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Maintenance Programs
              </h3>
              <p className="text-foreground/70">
                Prevent expensive failures with regular maintenance
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {maintenancePrograms.map((program, index) => (
                <div
                  key={index}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                    program.popular 
                      ? 'border-brand bg-brand/5 hover:border-brand/70' 
                      : 'border-border/60 bg-surface/40 hover:border-brand/30'
                  }`}
                >
                  {program.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-brand text-white px-3 py-1 text-xs font-bold rounded-full">
                        POPULAR
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-4">
                    <h4 className="text-xl font-bold text-foreground mb-2">{program.title}</h4>
                    <p className="text-sm text-foreground/70 mb-3">{program.description}</p>
                    <div className="text-2xl font-extrabold text-brand mb-1">{program.price}</div>
                    <div className="text-sm text-foreground/60">{program.frequency}</div>
                  </div>
                  
                  <ul className="space-y-2">
                    {program.includes.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm text-foreground/70">
                        <div className="h-1.5 w-1.5 rounded-full bg-brand/60 flex-shrink-0 mt-2"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Benefits of maintenance */}
            {benefits.length > 0 && (
              <div className="grid md:grid-cols-4 gap-6 pt-8 border-t border-border/30">
                {benefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-3">
                      {benefit.icon}
                    </div>
                    <h5 className="font-semibold text-foreground mb-2">{benefit.title}</h5>
                    <p className="text-sm text-foreground/70">{benefit.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </>
    );
  };

  return (
    <section className={`${getSectionClasses()} ${className}`}>
      <div className="mx-auto max-w-7xl container-px py-16 md:py-24 text-center">
        {/* Header - Always centered for ProcessSteps */}
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

        {/* Steps Content */}
        {variant === "horizontal" && renderHorizontalSteps()}
        {variant === "vertical" && renderVerticalSteps()}
        {variant === "service-process" && renderServiceProcess()}
      </div>
    </section>
  );
}
