import Image from 'next/image'

interface LogoBeltBlockProps {
  logos: Array<{
    logo: {
      url: string
      alt?: string
    }
    alt: string
  }>
}

export function LogoBeltBlock({ logos }: LogoBeltBlockProps) {
  return (
    <section className="w-full bg-background">
      <div className="relative py-8 overflow-hidden">
        <div className="marquee whitespace-nowrap">
          {[...logos, ...logos, ...logos].map((logoItem, i) => (
            <span key={i} className="inline-block mx-8 align-middle opacity-95">
              <span className="relative block h-8 w-[150px] brightness-0">
                <Image src={logoItem.logo.url} alt={logoItem.alt} fill className="object-contain" />
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
