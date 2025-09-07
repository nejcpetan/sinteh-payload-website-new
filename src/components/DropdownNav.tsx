'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Header as HeaderType } from '@/payload-types'

interface DropdownItem {
  label: string
  description?: string
  type: 'page' | 'url' | 'blog' | 'post' | 'category' | 'divider'
  page?: any
  post?: any
  category?: any
  url?: string
  newTab?: boolean
  featured?: boolean
}

interface DropdownNavProps {
  label: string
  items: DropdownItem[]
  style?: 'simple' | 'cards' | 'columns'
  className?: string
}

export function DropdownNav({ label, items, style = 'simple', className }: DropdownNavProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150) // Small delay to prevent flickering
  }

  const getItemHref = (item: DropdownItem): string => {
    switch (item.type) {
      case 'page':
        return item.page && typeof item.page === 'object' && item.page.slug
          ? `/${item.page.slug === '/' ? '' : item.page.slug}`
          : '#'
      case 'url':
        return item.url || '#'
      case 'blog':
        return '/blog'
      case 'post':
        return item.post && typeof item.post === 'object' && item.post.slug
          ? `/blog/${item.post.slug}`
          : '#'
      case 'category':
        return item.category && typeof item.category === 'object' && item.category.slug
          ? `/blog/category/${item.category.slug}`
          : '#'
      default:
        return '#'
    }
  }

  const renderDropdownContent = () => {
    const validItems = items.filter((item) => item.type !== 'divider' || items.length > 1)

    if (style === 'cards') {
      return (
        <div className="grid gap-1 p-2 min-w-[280px]">
          {validItems.map((item, index) => {
            if (item.type === 'divider') {
              return <div key={index} className="border-t border-border my-2" />
            }

            const href = getItemHref(item)
            const isExternal = href.startsWith('http')

            return (
              <Link
                key={index}
                href={href}
                target={isExternal || item.newTab ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={cn(
                  'block p-3 rounded-lg hover:bg-muted transition-colors',
                  item.featured && 'bg-primary/5 border border-primary/20',
                )}
                onClick={() => setIsOpen(false)}
              >
                <div className="font-medium text-sm text-foreground">{item.label}</div>
                {item.description && (
                  <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
                )}
              </Link>
            )
          })}
        </div>
      )
    }

    if (style === 'columns') {
      const midPoint = Math.ceil(validItems.length / 2)
      const leftColumn = validItems.slice(0, midPoint)
      const rightColumn = validItems.slice(midPoint)

      return (
        <div className="grid grid-cols-2 gap-4 p-4 min-w-[400px]">
          <div className="space-y-1">
            {leftColumn.map((item, index) => {
              if (item.type === 'divider') {
                return <div key={index} className="border-t border-border my-2" />
              }

              const href = getItemHref(item)
              const isExternal = href.startsWith('http')

              return (
                <Link
                  key={index}
                  href={href}
                  target={isExternal || item.newTab ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'block p-2 rounded-md hover:bg-muted transition-colors text-sm',
                    item.featured && 'font-medium text-primary',
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
          <div className="space-y-1">
            {rightColumn.map((item, index) => {
              if (item.type === 'divider') {
                return <div key={index} className="border-t border-border my-2" />
              }

              const href = getItemHref(item)
              const isExternal = href.startsWith('http')

              return (
                <Link
                  key={index}
                  href={href}
                  target={isExternal || item.newTab ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'block p-2 rounded-md hover:bg-muted transition-colors text-sm',
                    item.featured && 'font-medium text-primary',
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      )
    }

    // Simple style (default)
    return (
      <div className="py-2 min-w-[200px]">
        {validItems.map((item, index) => {
          if (item.type === 'divider') {
            return <div key={index} className="border-t border-border my-2" />
          }

          const href = getItemHref(item)
          const isExternal = href.startsWith('http')

          return (
            <Link
              key={index}
              href={href}
              target={isExternal || item.newTab ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className={cn(
                'block px-4 py-2 text-sm hover:bg-muted transition-colors',
                item.featured && 'font-medium text-primary bg-primary/5',
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          )
        })}
      </div>
    )
  }

  if (!isMounted) {
    return <span className={cn('text-foreground/80', className)}>{label}</span>
  }

  return (
    <div
      ref={dropdownRef}
      className={cn('relative', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          'flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors',
          isOpen && 'text-foreground',
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            'absolute top-full left-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50',
            'animate-in fade-in-0 zoom-in-95 duration-200',
          )}
        >
          {renderDropdownContent()}
        </div>
      )}
    </div>
  )
}

// Mobile dropdown component for accordion-style navigation
interface MobileDropdownNavProps {
  label: string
  items: DropdownItem[]
  isOpen: boolean
  onToggle: () => void
}

export function MobileDropdownNav({ label, items, isOpen, onToggle }: MobileDropdownNavProps) {
  const getItemHref = (item: DropdownItem): string => {
    switch (item.type) {
      case 'page':
        return item.page && typeof item.page === 'object' && item.page.slug
          ? `/${item.page.slug === '/' ? '' : item.page.slug}`
          : '#'
      case 'url':
        return item.url || '#'
      case 'blog':
        return '/blog'
      case 'post':
        return item.post && typeof item.post === 'object' && item.post.slug
          ? `/blog/${item.post.slug}`
          : '#'
      case 'category':
        return item.category && typeof item.category === 'object' && item.category.slug
          ? `/blog/category/${item.category.slug}`
          : '#'
      default:
        return '#'
    }
  }

  const validItems = items.filter((item) => item.type !== 'divider' || items.length > 1)

  return (
    <div className="border-b border-border/50">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-4 px-4 text-lg font-medium text-foreground hover:text-primary transition-colors"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown
          className={cn('h-5 w-5 transition-transform duration-200', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div className="pb-2 pl-4 space-y-1">
          {validItems.map((item, index) => {
            if (item.type === 'divider') {
              return <div key={index} className="border-t border-border/30 my-3" />
            }

            const href = getItemHref(item)
            const isExternal = href.startsWith('http')

            return (
              <Link
                key={index}
                href={href}
                target={isExternal || item.newTab ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={cn(
                  'block py-3 px-4 text-base text-foreground/80 hover:text-primary hover:bg-muted/50 rounded-lg transition-all',
                  item.featured && 'font-medium text-primary bg-primary/5',
                )}
              >
                <div>{item.label}</div>
                {item.description && (
                  <div className="text-sm text-muted-foreground mt-1">{item.description}</div>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

