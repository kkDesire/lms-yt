'use client'

import { Loader2 } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { authClient } from '@/lib/auth-client'

export default function VerifyRequestPage() {
  const router = useRouter()
  const [otp, setOtp] = useState('')
  const [emailPending, startEmailTransition] = useTransition()
  const params = useSearchParams()
  const email = params.get('email') as string
  const isOtpCompleted = otp.length === 6

  function verifyOtp() {
    startEmailTransition(async () => {
      await authClient.signIn.emailOtp({
        email,
        otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success('Email verified, you will be redirected...')
            router.push('/')
          },
          onError: (error) => {
            toast.error('Error verifying Email/OTP')
          },
        },
      })
    })
  }
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Please check your email</CardTitle>
        <CardDescription>
          We have send a verification email code to your email address. Please open the email and pas the code below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-2">
          <InputOTP
            maxLength={6}
            className="gap-2"
            value={otp}
            onChange={value => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>

            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-xs text-muted-foreground">Enter the 6-digits code sent to your email</p>
        </div>
        <Button disabled={emailPending || !isOtpCompleted} onClick={verifyOtp} className="w-full">
          {emailPending
            ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  <span>Loading...</span>
                </>

              )
            : 'Verify Account'}

        </Button>
      </CardContent>
    </Card>
  )
}
