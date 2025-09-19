import { redirect } from 'next/navigation'
import { defaultLocale } from '@/lib/i18n/config'

// This page handles the root path and redirects to the default locale
export default function HomePage() {
  // Redirect to the default locale
  redirect(`/${defaultLocale}`)
}
