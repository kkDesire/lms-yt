'use client'

import { GithubIcon, Loader2, Send } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'

export default function LoginForm() {
  const router = useRouter()
  const [githubPending, startGithubTransition] = useTransition()
  const [emailPending, startEmailTransition] = useTransition()
  const [email, setEmail] = useState('')

  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/',
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed in with Github, you will be redirected...')
          },
          onError: (error) => {
            toast.error('Internal Server Error')
          },
        },
      })
    })
  }

  async function signInWithEmail() {
    startEmailTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email,
        type: 'sign-in',
        fetchOptions: {
          onSuccess: () => {
            toast.success(`OTP sent to ${email}`)
            router.push(`/verify-request?email=${email}`)
          },
          onError: (error) => {
            toast.error('Error sinding email')
          },
        },
      })
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Welcome back!</CardTitle>
        <CardDescription>Login with your Github or Email Account</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button disabled={githubPending} className="w-full" variant="outline" onClick={signInWithGithub}>
          {githubPending
            ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  <span>Loading...</span>
                </>

              )
            : (
                <>
                  <GithubIcon className="size-4" />
                  Sign in with Github
                </>
              )}
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
        <div className="grid gap-3">
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              id="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <Button onClick={signInWithEmail} disabled={emailPending}>
            {emailPending
              ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    <span>Loading...</span>
                  </>

                )
              : (
                  <>
                    <Send className="size-4" />
                    <span>Continue with Email</span>
                  </>
                )}

          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
