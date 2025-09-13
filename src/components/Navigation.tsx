import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Header as HeaderType, Media } from '@/payload-types'
import type { Locale } from '@/lib/i18n/config'
import { MobileNav } from '@/components/MobileNav'
import { DropdownNav } from '@/components/DropdownNav'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'

const fallbackNavItems = [
  { href: '#storitve', label: 'Področja dela' },
  { href: '#onas', label: 'O nas' },
  { href: '#projekti', label: 'Študije primerov' },
  { href: '/blog', label: 'Blog' },
  { href: '#kontakt', label: 'Kontakt' },
]

export default async function Navigation({
  className,
  locale,
}: {
  className?: string
  locale?: Locale
}) {
  const payload = await getPayload({ config })

  let headerData: HeaderType | null = null

  try {
    headerData = await payload.findGlobal({
      slug: 'header',
      locale: locale || 'sl',
      fallbackLocale: 'en',
      depth: 2,
    })
  } catch (error) {
    console.error('Error fetching header data:', error)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border',
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
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
              <span className="text-xl font-bold text-foreground">
                {headerData?.siteName || 'SINTEH PRO'}
              </span>
            )}
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {(headerData?.navigation || fallbackNavItems).map((item, index) => {
              // Handle different link types if using header data
              let href = '#'
              let label = item.label || 'Menu Item'

              if ('href' in item) {
                // Fallback navigation item
                href = item.href
                label = item.label
                return (
                  <Link
                    key={index}
                    href={href}
                    className="text-foreground/80 hover:text-foreground transition"
                  >
                    {label}
                  </Link>
                )
              } else {
                // Header global navigation item
                // Check if this is a dropdown menu
                if ('navType' in item && item.navType === 'dropdown' && item.dropdownItems) {
                  return (
                    <DropdownNav
                      key={index}
                      label={item.label}
                      items={item.dropdownItems}
                      style={item.dropdownStyle}
                    />
                  )
                }

                // Regular navigation link
                switch (item.type) {
                  case 'page':
                    href =
                      item.page && typeof item.page === 'object' && item.page.slug
                        ? `/${item.page.slug === '/' ? '' : item.page.slug}`
                        : '#'
                    break
                  case 'url':
                    href = item.url || '#'
                    break
                  case 'blog':
                    href = '/blog'
                    break
                  case 'post':
                    href =
                      item.post && typeof item.post === 'object' && item.post.slug
                        ? `/blog/${item.post.slug}`
                        : '#'
                    break
                  case 'category':
                    href =
                      item.category && typeof item.category === 'object' && item.category.slug
                        ? `/blog/category/${item.category.slug}`
                        : '#'
                    break
                }

                const isExternal = href.startsWith('http')

                return (
                  <Link
                    key={index}
                    href={href}
                    className="text-foreground/80 hover:text-foreground transition"
                    target={isExternal || ('newTab' in item && item.newTab) ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    {label}
                  </Link>
                )
              }
            })}
          </nav>
          <div className="flex items-center gap-2">
            <LocaleSwitcher currentLocale={locale || 'sl'} className="hidden sm:flex" />
            <Button size="sm" className="hidden sm:flex" asChild>
              <a href="#kontakt">Kontakt</a>
            </Button>
            <MobileNav
              headerData={headerData}
              fallbackNavItems={fallbackNavItems}
              locale={locale || 'sl'}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
