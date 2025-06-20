"use client"


import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'

import { GithubIcon, Loader } from 'lucide-react'
import { useTransition } from 'react'
import { toast } from 'sonner'
export default function LoginForm() {
    const [githubPending, startGithubTransition] = useTransition()

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
                    }
                }
            })
        })

    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className='text-xl'>Welcome back!</CardTitle>
                <CardDescription>Login with your Github Email Account</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                <Button disabled={githubPending} className='w-full' variant='outline' onClick={signInWithGithub}>
                    {githubPending ? (
                        <>
                            <Loader className='mr-2 size-4 animate-spin' />
                            Loading...
                        </>

                    ) : (
                        <>
                            <GithubIcon className='size-4' />
                            Sign in with Github
                        </>
                    )}
                </Button>
                <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                    <span className='relative z-10 bg-card px-2 text-muted-foreground'>Or continue with</span>
                </div>
                <div className="grid gap-3">
                    <div className="grid gap-3">
                        <Label htmlFor='email'>Email</Label>
                        <Input type='email' id='email' placeholder='m@example.com' />
                    </div>
                    <Button>Continue with Email</Button>
                </div>
            </CardContent>
        </Card>
    )

}