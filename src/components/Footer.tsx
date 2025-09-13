import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Footer as FooterType, Media } from '@/payload-types'
import type { Locale } from '@/lib/i18n/config'

function getLinkHref(link: any) {
  switch (link.type) {
    case 'page':
      return link.page?.slug ? `/${link.page.slug === '/' ? '' : link.page.slug}` : '#'
    case 'url':
      return link.url || '#'
    case 'anchor':
      return link.anchor || '#'
    default:
      return '#'
  }
}

export default async function Footer({ locale }: { locale?: Locale }) {
  const payload = await getPayload({ config })

  let footerData: FooterType | null = null

  try {
    footerData = await payload.findGlobal({
      slug: 'footer',
      locale: locale || 'sl',
      fallbackLocale: 'en',
      depth: 2,
    })
  } catch (error) {
    console.error('Error fetching footer data:', error)
  }

  // Fallback data if global not found
  const fallbackData = {
    logo: null,
    copyright: '© 2025 SINTEH PRO. Vse pravice pridržane.',
    companyInfo: {
      address: [
        { line: 'Cesta na Ostrožno 8' },
        { line: '3000 Celje' },
        { line: 'Slovenija - EU' },
      ],
      phone: '+386 (3) 426 36 46',
      email: 'info@sinteh.pro',
    },
    footerColumns: [
      {
        title: 'PODROČJA DELA',
        links: [
          { label: 'Avtomatizacija', type: 'anchor', anchor: '#storitve' },
          { label: 'Servis za ABB in Schneider Electric', type: 'anchor', anchor: '#storitve' },
          { label: 'Industrijska varnost', type: 'anchor', anchor: '#storitve' },
        ],
      },
      {
        title: 'PODJETJE',
        links: [
          { label: 'O nas', type: 'anchor', anchor: '#onas' },
          { label: 'Študije primerov', type: 'anchor', anchor: '#projekti' },
          { label: 'Kontakt', type: 'anchor', anchor: '#kontakt' },
        ],
      },
      {
        title: 'PRAVNO',
        links: [
          { label: 'Politika zasebnosti', type: 'url', url: '#' },
          { label: 'Pogoji storitve', type: 'url', url: '#' },
          { label: 'Nastavitve piškotkov', type: 'url', url: '#' },
        ],
      },
    ],
    bottomLinks: [
      { label: 'Politika zasebnosti', type: 'url', url: '#' },
      { label: 'Pogoji storitve', type: 'url', url: '#' },
      { label: 'Nastavitve piškotkov', type: 'url', url: '#' },
    ],
  }

  const data = footerData || fallbackData

  return (
    <footer className="mt-24 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Main footer content with prettier glass effect */}
        <div className="rounded-3xl border border-border/60 bg-gradient-to-br from-white/90 to-slate-50/80 backdrop-blur-sm shadow-xl shadow-slate-200/50 px-6 py-8 md:px-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
            {/* Company info with logo */}
            <div className="lg:col-span-1">
              <div className="h-8 w-[160px] relative mb-6">
                {data.logo && typeof data.logo === 'object' && (data.logo as Media).url ? (
                  <Image
                    src={(data.logo as Media).url!}
                    alt={(data.logo as Media).alt || 'Company Logo'}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="flex items-center h-full">
                    <span className="text-xl font-bold text-slate-900">SINTEH PRO</span>
                  </div>
                )}
              </div>

              {data.companyInfo?.address && (
                <div className="space-y-1 mb-6">
                  <p className="text-[10px] tracking-widest font-semibold text-slate-500 uppercase mb-2">
                    Naslov:
                  </p>
                  {data.companyInfo.address.map((addr, index) => (
                    <p key={index} className="text-slate-700">
                      {addr.line}
                    </p>
                  ))}
                </div>
              )}

              <div className="space-y-1">
                <p className="text-[10px] tracking-widest font-semibold text-slate-500 uppercase mb-2">
                  Kontakt:
                </p>
                {data.companyInfo?.phone && (
                  <p className="text-slate-700">Tel: {data.companyInfo.phone}</p>
                )}
                {data.companyInfo?.email && (
                  <p className="text-slate-700">E-pošta: {data.companyInfo.email}</p>
                )}
              </div>
            </div>

            {/* Dynamic footer columns */}
            {data.footerColumns?.map((column, columnIndex) => (
              <div key={columnIndex}>
                <h4 className="text-[10px] tracking-widest font-semibold text-slate-500 uppercase mb-4">
                  {column.title}
                </h4>
                <ul className="space-y-3">
                  {column.links?.map((link, linkIndex) => {
                    const href = getLinkHref(link)
                    const isExternal =
                      link.type === 'url' && 'url' in link && link.url?.startsWith('http')
                    const hasNewTab = 'newTab' in link && link.newTab

                    return (
                      <li key={linkIndex}>
                        <Link
                          href={href}
                          className="text-slate-700 hover:text-green-600 hover:underline transition-colors duration-200"
                          target={isExternal || hasNewTab ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                        >
                          {link.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section with prettier styling */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 py-6">
          <p className="font-medium">
            {data.copyright?.replace('{year}', new Date().getFullYear().toString()) ||
              `© ${new Date().getFullYear()} SINTEH PRO. Vse pravice pridržane.`}
          </p>

          {data.bottomLinks && data.bottomLinks.length > 0 && (
            <div className="flex items-center gap-6">
              {data.bottomLinks.map((link, index) => {
                const href = getLinkHref(link)
                const isExternal = link.type === 'url' && link.url?.startsWith('http')

                return (
                  <Link
                    key={index}
                    href={href}
                    className="hover:text-green-600 hover:underline transition-colors duration-200"
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
