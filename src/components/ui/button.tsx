'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant =
  | 'default'
  | 'secondary'
  | 'ghost'
  | 'outline'
  | 'outlineLight'
  | 'contrast'
  | 'link'
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  asChild?: boolean
}

const baseStyles =
  'inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 disabled:opacity-50 disabled:pointer-events-none font-medium'

const variantStyles: Record<ButtonVariant, string> = {
  default: 'bg-brand text-white hover:bg-brand-600 shadow-sm data-[state=open]:bg-brand-600',
  secondary: 'bg-surface text-foreground hover:bg-muted border border-border',
  ghost: 'bg-transparent hover:bg-foreground/5 text-foreground',
  outline: 'bg-transparent border border-border text-foreground hover:bg-foreground/5',
  outlineLight:
    'bg-transparent border border-white/40 text-white hover:bg-white/5 hover:border-white/60',
  contrast: 'bg-white text-[#0f1720] hover:bg-white/90',
  link: 'bg-transparent underline-offset-4 hover:underline text-brand',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
  icon: 'h-10 w-10 p-0',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', asChild, children, ...props }, ref) => {
    const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className)

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        ...(children.props || {}),
        className: cn(classes, (children.props as any)?.className),
      })
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
