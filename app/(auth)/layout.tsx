import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import AppLogo from '@/components/base/Logo'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <Link
        href="/"
        className={buttonVariants({
          variant: 'outline',
          className: 'absolute left-4 top-4',
        })}
      >
        <ArrowLeft className="size-4" />
        Back
      </Link>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center self-center gap-2 font-medium">
          <AppLogo />
        </Link>
        {children}
        <div className="text-balance text-center text-xs text-muted-foreground">
          By clicking continue, you agree to ou
          {' '}
          <span className="hover:text-primary hover:underline">Terms of service</span>
          {' '}
          and
          <span className="hover:text-primary hover:underline"> Privacy Policy </span>.
        </div>
      </div>
    </div>
  )
}
