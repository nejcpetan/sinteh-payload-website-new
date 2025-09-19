'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import type { Header as HeaderType, Media } from '@/payload-types'
import type { Locale } from '@/lib/i18n/config'
import { getNavigationHref } from '@/lib/linkUtils'
import { MobileDropdownNav } from '@/components/DropdownNav'
import { MobileLocaleSwitcher } from '@/components/LocaleSwitcher'

interface MobileNavProps {
  headerData: HeaderType | null
  fallbackNavItems: Array<{ href: string; label: string }>
  locale: Locale
}

export function MobileNav({ headerData, fallbackNavItems, locale }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState<Set<number>>(new Set())

  const mobileConfig = headerData?.mobileNavigation
  const isEnabled = mobileConfig?.enabled !== false // Default to true

  // Ensure we're mounted before rendering portal
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isEnabled) {
    return null
  }

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => {
    setIsOpen(false)
    setOpenDropdowns(new Set()) // Close all dropdowns when menu closes
  }

  const toggleDropdown = (index: number) => {
    const newOpenDropdowns = new Set(openDropdowns)
    if (newOpenDropdowns.has(index)) {
      newOpenDropdowns.delete(index)
    } else {
      newOpenDropdowns.add(index)
    }
    setOpenDropdowns(newOpenDropdowns)
  }

  const navigationItems = headerData?.navigation || fallbackNavItems

  // Menu overlay component
  const MobileMenuOverlay = () => (
    <div
      className={`fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Menu Panel - Slide from top */}
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 bg-background overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-surface border-b">
            <div className="flex items-center">
              {headerData?.logo &&
              typeof headerData.logo === 'object' &&
              (headerData.logo as Media).url ? (
                <Image
                  src={(headerData.logo as Media).url!}
                  alt={(headerData.logo as Media).alt || headerData.siteName || 'Logo'}
                  width={120}
                  height={24}
                  priority
                  className="object-contain"
                />
              ) : (
                <span className="text-2xl font-bold text-foreground">
                  {headerData?.siteName || 'SINTEH PRO'}
                </span>
              )}
            </div>
            <button
              onClick={closeMenu}
              className="p-3 hover:bg-background rounded-lg transition-colors"
              aria-label={mobileConfig?.closeButtonLabel || 'Close menu'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-6 py-8">
            <div className="space-y-2">
              {navigationItems.map((item, index) => {
                // Handle different link types
                let href = '#'
                let label = item.label || 'Menu Item'

                if ('href' in item) {
                  // Fallback navigation item - convert to locale-aware format
                  const fallbackItem = {
                    type: item.type || 'anchor',
                    anchor: item.href?.startsWith('#') ? item.href : undefined,
                    url:
                      !item.href?.startsWith('#') && item.href?.startsWith('http')
                        ? item.href
                        : undefined,
                    page:
                      !item.href?.startsWith('#') && !item.href?.startsWith('http')
                        ? { slug: item.href?.replace('/', '') }
                        : undefined,
                  }
                  href = getNavigationHref(fallbackItem, locale)
                  label = item.label
                  return (
                    <Link
                      key={index}
                      href={href}
                      onClick={closeMenu}
                      className="block py-4 px-4 text-lg font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all"
                    >
                      {label}
                    </Link>
                  )
                } else {
                  // Header global navigation item
                  // Check if this is a dropdown menu
                  if ('navType' in item && item.navType === 'dropdown' && item.dropdownItems) {
                    return (
                      <MobileDropdownNav
                        key={index}
                        label={item.label}
                        items={item.dropdownItems}
                        isOpen={openDropdowns.has(index)}
                        onToggle={() => toggleDropdown(index)}
                        locale={locale}
                      />
                    )
                  }

                  // Regular navigation link - use locale-aware href generation
                  href = getNavigationHref(item, locale)

                  const isExternal = href.startsWith('http')

                  return (
                    <Link
                      key={index}
                      href={href}
                      onClick={closeMenu}
                      className="block py-4 px-4 text-lg font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-all"
                      target={
                        isExternal || ('newTab' in item && item.newTab) ? '_blank' : undefined
                      }
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                    >
                      {label}
                    </Link>
                  )
                }
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-6 border-t bg-surface space-y-6">
            {/* Language Selector */}
            {mobileConfig?.showLanguageSelector !== false && (
              <MobileLocaleSwitcher currentLocale={locale} onLocaleChange={closeMenu} />
            )}

            {/* Contact Button */}
            {mobileConfig?.showContactButton !== false && (
              <Button className="w-full h-12 text-lg" asChild>
                <a href="#kontakt" onClick={closeMenu}>
                  Kontakt
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 p-1"
        aria-label={mobileConfig?.menuButtonLabel || 'Menu'}
        aria-expanded={isOpen}
      >
        <span
          className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-1' : ''
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-foreground transition-all duration-300 mt-1 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-foreground transition-all duration-300 mt-1 ${
            isOpen ? '-rotate-45 -translate-y-1' : ''
          }`}
        />
      </button>

      {/* Portal the overlay to document.body to escape header constraints */}
      {isMounted && createPortal(<MobileMenuOverlay />, document.body)}
    </>
  )
}
