/**
 * SimplePage Component - SINTEH PRO Component Library
 * 
 * A flexible page layout component for documentation, legal pages, and
 * simple content presentation. Features breadcrumbs, navigation, and
 * multiple layout variants for different content types.
 * 
 * KEY FEATURES:
 * - 5 layout variants (standard, centered, documentation, legal, minimal)
 * - Breadcrumb navigation
 * - Back link support
 * - Quick links section
 * - Last updated timestamps
 * - Flexible content width options
 * - Sidebar support for documentation
 * 
 * CONTENT ORGANIZATION:
 * - Clear information hierarchy
 * - Easy navigation
 * - Professional presentation
 * - Accessibility compliant
 * - SEO optimized structure
 * 
 * PERFECT FOR:
 * - About pages
 * - Legal documents
 * - Documentation pages
 * - Privacy policies
 * - Terms of service
 * - Company information
 * 
 * @example
 * <SimplePage
 *   variant="documentation"
 *   title="API Documentation"
 *   description="Complete guide to our automation API"
 *   breadcrumbs={[
 *     { label: "Home", href: "/" },
 *     { label: "Documentation" }
 *   ]}
 *   links={[
 *     { title: "Getting Started", href: "/docs/start" }
 *   ]}
 * />
 */

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SimplePageLink {
  href: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface Breadcrumb {
  label: string;
  href?: string;
}

export interface SimplePageProps {
  // Layout variants
  variant?: "standard" | "centered" | "documentation" | "legal" | "minimal";
  
  // Core content
  title: string;
  subtitle?: string;
  description: string;
  badge?: string;
  
  // Navigation
  breadcrumbs?: Breadcrumb[];
  backLink?: {
    href: string;
    text: string;
  };
  
  // Links section
  links?: SimplePageLink[];
  linksTitle?: string;
  linksDescription?: string;
  
  // Content
  children?: React.ReactNode;
  
  // Layout options
  showLastUpdated?: boolean;
  lastUpdated?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  
  // Background options
  backgroundStyle?: "background" | "surface" | "white";
  
  // Show/hide elements
  showBreadcrumbs?: boolean;
  showBackLink?: boolean;
  showHeader?: boolean;
  
  // Styling
  className?: string;
}

export function SimplePage({
  variant = "standard",
  title,
  subtitle,
  description,
  badge,
  breadcrumbs = [],
  backLink,
  links = [],
  linksTitle = "Quick Links",
  linksDescription,
  children,
  showLastUpdated = false,
  lastUpdated,
  maxWidth = "lg",
  backgroundStyle = "background",
  showBreadcrumbs = true,
  showBackLink = true,
  showHeader = true,
  className = ""
}: SimplePageProps) {

  const getSectionClasses = () => {
    const baseClasses = "w-full min-h-screen text-foreground";
    
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

  const getContainerClasses = () => {
    const widthClasses = {
      sm: "max-w-2xl",
      md: "max-w-4xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-full"
    };
    
    return `mx-auto ${widthClasses[maxWidth]} container-px py-8 md:py-12`;
  };

  const getContentClasses = () => {
    if (variant === "centered") {
      return "text-center max-w-3xl mx-auto";
    }
    if (variant === "documentation") {
      return "prose prose-lg max-w-none";
    }
    if (variant === "legal") {
      return "prose prose-sm max-w-4xl mx-auto";
    }
    return "";
  };

  const renderBreadcrumbs = () => {
    if (!showBreadcrumbs || breadcrumbs.length === 0) return null;
    
    return (
      <nav className="flex items-center space-x-2 text-sm text-foreground/60 mb-6">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            )}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-brand transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-foreground">{crumb.label}</span>
            )}
          </div>
        ))}
      </nav>
    );
  };

  const renderBackLink = () => {
    if (!showBackLink || !backLink) return null;
    
    return (
      <div className="mb-6">
        <Link 
          href={backLink.href}
          className="inline-flex items-center gap-2 text-sm text-brand hover:underline"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          {backLink.text}
        </Link>
      </div>
    );
  };

  const renderHeader = () => {
    if (!showHeader) return null;
    
    return (
      <div className={`mb-8 ${variant === "centered" ? "text-center" : ""}`}>
        {badge && (
          <span className="inline-block rounded-full bg-brand/10 px-3 py-1 text-xs font-medium text-brand mb-4">
            {badge}
          </span>
        )}
        
        <h1 className={`font-bold tracking-tight text-foreground mb-4 ${
          variant === "legal" ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
        }`}>
          {title}
        </h1>
        
        {subtitle && (
          <p className="text-xl text-brand font-semibold mb-4">
            {subtitle}
          </p>
        )}
        
        <p className={`text-foreground/70 ${
          variant === "legal" ? "text-sm" : "text-lg"
        }`}>
          {description}
        </p>
        
        {showLastUpdated && lastUpdated && (
          <div className="mt-4 text-sm text-foreground/60">
            Last updated: {lastUpdated}
          </div>
        )}
      </div>
    );
  };

  const renderLinks = () => {
    if (links.length === 0) return null;
    
    return (
      <div className="mb-8">
        {linksTitle && (
          <h2 className="text-xl font-bold text-foreground mb-4">{linksTitle}</h2>
        )}
        {linksDescription && (
          <p className="text-foreground/70 mb-6">{linksDescription}</p>
        )}
        
        <div className="grid gap-4">
          {links.map((link, index) => (
            <Link 
              key={index}
              href={link.href} 
              className="block p-4 border border-border rounded-lg hover:bg-surface/50 hover:border-brand/30 transition-all duration-200 group"
            >
              <div className="flex items-start gap-4">
                {link.icon && (
                  <div className="p-2 rounded-lg bg-brand/10 group-hover:bg-brand/20 transition-colors">
                    {link.icon}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-semibold text-foreground group-hover:text-brand transition-colors">
                      {link.title}
                    </div>
                    {link.badge && (
                      <span className="px-2 py-1 text-xs font-medium bg-brand/10 text-brand rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </div>
                  {link.description && (
                    <div className="text-sm text-foreground/70">
                      {link.description}
                    </div>
                  )}
                </div>
                <div className="text-brand/60 group-hover:text-brand transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  const renderDocumentationVariant = () => {
    return (
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            {renderLinks()}
          </div>
        </div>
        
        {/* Main content */}
        <div className="lg:col-span-3">
          <div className={getContentClasses()}>
            {children}
          </div>
        </div>
      </div>
    );
  };

  const renderStandardContent = () => {
    return (
      <>
        {renderLinks()}
        <div className={getContentClasses()}>
          {children}
        </div>
      </>
    );
  };

  return (
    <section className={`${getSectionClasses()} ${className}`}>
      <div className={getContainerClasses()}>
        {renderBreadcrumbs()}
        {renderBackLink()}
        {renderHeader()}
        
        {variant === "documentation" ? renderDocumentationVariant() : renderStandardContent()}
      </div>
    </section>
  );
}
