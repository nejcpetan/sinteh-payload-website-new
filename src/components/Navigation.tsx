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
import { getNavigationHref } from '@/lib/linkUtils'

const fallbackNavItems = [
  { type: 'anchor', anchor: '#storitve', label: 'Področja dela' },
  { type: 'anchor', anchor: '#onas', label: 'O nas' },
  { type: 'anchor', anchor: '#projekti', label: 'Študije primerov' },
  { type: 'blog', label: 'Blog' },
  { type: 'anchor', anchor: '#kontakt', label: 'Kontakt' },
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
    const requestedLocale = locale || 'sl'
    console.log(`[Navigation] Fetching header data for locale: ${requestedLocale}`)

    headerData = await payload.findGlobal({
      slug: 'header',
      locale: requestedLocale,
      fallbackLocale: false, // Disable fallback to force locale-specific data
      depth: 2,
    })

    console.log(`[Navigation] Header data fetched successfully for locale: ${requestedLocale}`)
    console.log(`[Navigation] Navigation items count: ${headerData?.navigation?.length || 0}`)
  } catch (error) {
    console.error(`[Navigation] Error fetching header data for locale ${locale}:`, error)

    // If the requested locale fails, try with fallback
    try {
      console.log(`[Navigation] Attempting fallback to 'en' locale`)
      headerData = await payload.findGlobal({
        slug: 'header',
        locale: 'en',
        fallbackLocale: false,
        depth: 2,
      })
    } catch (fallbackError) {
      console.error('[Navigation] Fallback to English also failed:', fallbackError)
    }
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
          <Link href={locale ? `/${locale}` : '/'} className="flex items-center gap-3">
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
                // Fallback navigation item - convert to use getNavigationHref
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
                      locale={locale}
                    />
                  )
                }

                // Generate locale-aware href using the utility function
                href = getNavigationHref(item, locale)
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
