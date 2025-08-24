import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ProjectsBlockProps {
  badge?: string
  title: string
  subtitle?: string
  projects: Array<{
    title: string
    category: string
    image: {
      url: string
      alt?: string
    }
    description: string
    stack?: Array<{
      technology: string
    }>
    link?: string
  }>
  button?: {
    text: string
    type: 'page' | 'url' | 'anchor'
    page?: {
      slug?: string
    }
    url?: string
    anchor?: string
  }
}

export function ProjectsBlock({ badge, title, subtitle, projects, button }: ProjectsBlockProps) {
  return (
    <section className="w-full bg-background text-foreground">
      <div className="mx-auto max-w-7xl container-px py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto">
          {badge && (
            <span className="inline-block rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium">
              {badge}
            </span>
          )}
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold">{title}</h2>
          {subtitle && <p className="mt-2 text-foreground/70">{subtitle}</p>}
        </div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <Card
              key={i}
              className="group overflow-hidden rounded-2xl border border-border bg-surface/60 backdrop-blur-sm hover:shadow-lg transition-all"
            >
              <div className="relative aspect-video">
                {/* gradient ring/glow */}
                <div
                  aria-hidden
                  className="absolute -inset-[6px] rounded-2xl bg-[radial-gradient(65%_50%_at_20%_10%,_rgba(107,196,65,0.22),transparent_60%)]"
                />
                <Image
                  src={project.image.url}
                  alt={project.image.alt || project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/15 px-2 py-1 text-[11px] font-medium text-white backdrop-blur">
                  {project.category}
                </span>
                <h3 className="absolute left-3 bottom-3 right-3 text-white text-lg font-semibold drop-shadow">
                  {project.title}
                </h3>
              </div>

              <CardHeader className="pb-2">
                <CardTitle className="text-base">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-foreground/70">{project.description}</p>
                {project.stack && project.stack.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.stack.map((stackItem, idx) => (
                      <span
                        key={idx}
                        className="rounded-full border border-border/60 px-2.5 py-1 text-[11px] text-foreground/80"
                      >
                        {stackItem.technology}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-4">
                  <a
                    href={project.link || '#kontakt'}
                    className="text-sm text-brand hover:underline"
                  >
                    Preberi več →
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {button && (
          <div className="mt-12 text-center">
            <Button variant="secondary" asChild>
              <a
                href={
                  button.type === 'page'
                    ? `/${button.page?.slug === '/' ? '' : button.page?.slug || ''}`
                    : button.type === 'url'
                      ? button.url || '#'
                      : button.anchor || '#'
                }
                target={
                  button.type === 'url' && button.url?.startsWith('http') ? '_blank' : undefined
                }
                rel={
                  button.type === 'url' && button.url?.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
              >
                {button.text}
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
