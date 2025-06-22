'use client'
import AppLogo from "@/components/base/Logo";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import { UserDropdown } from "./UserDropdown";
import Link from "next/link";

const navagationItems = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '/courses' },
  { name: 'Dashboard', href: '/dashboard' },
]

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession()

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 mr-4">
          <AppLogo />
        </Link>
        {/* Desktop navigation  */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-2">
            {navagationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {isPending ? null : session ? (
              <UserDropdown
                name={session.user.name}
                email={session.user.email}
                image={session.user.image || ''}
              />
            ) : (
              <>
                <Link href="/login" className={buttonVariants({ variant: 'secondary' })}>Login</Link>
                <Link href="/login" className={buttonVariants()}>Get Started</Link>
              </>
            )
            }
          </div>
        </nav>
      </div>
    </header>
  )
}
