'use client'

import { useState } from 'react'
import { z } from 'zod'
import Link from 'next/link'
import { toast } from 'sonner'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContactFormSchema } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { sendEmail } from '@/lib/actions'
import BorderGlow from '@/components/ui/BorderGlow'

type Inputs = z.infer<typeof ContactFormSchema>

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<Inputs>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(ContactFormSchema as any),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  })

  const processForm: SubmitHandler<Inputs> = async data => {
    setErrorMessage(null)
    const result = await sendEmail(data)

    if (result?.error) {
      const msg = typeof result.error === 'string' ? result.error : 'An error occurred while sending your message. Please try again.'
      console.error('Submission error:', result.error)
      setErrorMessage(msg)
      toast.error(msg)
      return
    }

    toast.success('Message sent successfully!')
    setIsSubmitted(true)
    reset()
  }

  return (
    <div className='w-full'>
      <BorderGlow
        edgeSensitivity={28}
        glowColor="348 85 58"
        backgroundColor="var(--card)"
        borderRadius={22}
        glowRadius={36}
        glowIntensity={0.85}
        coneSpread={24}
        colors={['#e11d48', '#8b5cf6', '#6366f1']}
        className="w-full"
      >
        <div className='p-8 sm:p-12'>
          {isSubmitted ? (
            <div className='flex flex-col items-center justify-center py-8 text-center'>
              <div className='mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary'>
                <CheckCircle2 className='h-7 w-7 text-primary' />
              </div>

              <h3 className='font-serif text-2xl font-bold tracking-tight text-foreground'>
                Message Delivered
              </h3>

              <p className='mt-3 max-w-sm text-sm text-muted-foreground leading-relaxed'>
                Thank you for reaching out. I have received your message and will respond promptly.
              </p>

              <button
                type='button'
                onClick={() => {
                  setIsSubmitted(false)
                  setErrorMessage(null)
                }}
                className='mt-6 inline-flex h-10 items-center justify-center rounded-lg border border-border px-5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary cursor-pointer'
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(processForm)}
              className='space-y-6'
              noValidate
            >
              {errorMessage && (
                <div className='flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive'>
                  <AlertCircle className='h-5 w-5 shrink-0 text-destructive' />
                  <div className='flex-1'>
                    <p className='font-semibold'>Failed to send message</p>
                    <p className='mt-1 text-xs opacity-90'>{errorMessage}</p>
                  </div>
                </div>
              )}

              <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
                {/* Name */}
                <div>
                  <label htmlFor='name' className='block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2'>
                    Your Name
                  </label>
                  <Input
                    id='name'
                    type='text'
                    placeholder='Ada Lovelace'
                    autoComplete='given-name'
                    className='rounded-lg border-border bg-card/50 focus:border-primary/60 focus:ring-primary/20'
                    {...register('name')}
                  />
                  {errors.name?.message && (
                    <p className='mt-1.5 text-xs text-destructive'>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor='email' className='block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2'>
                    Email Address
                  </label>
                  <Input
                    type='email'
                    id='email'
                    autoComplete='email'
                    placeholder='ada@example.com'
                    className='rounded-lg border-border bg-card/50 focus:border-primary/60 focus:ring-primary/20'
                    {...register('email')}
                  />
                  {errors.email?.message && (
                    <p className='mt-1.5 text-xs text-destructive'>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className='sm:col-span-2'>
                  <label htmlFor='message' className='block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2'>
                    Message
                  </label>
                  <Textarea
                    id='message'
                    rows={5}
                    placeholder='Tell me about your project, idea, or role...'
                    className='rounded-lg border-border bg-card/50 focus:border-primary/60 focus:ring-primary/20'
                    {...register('message')}
                  />
                  {errors.message?.message && (
                    <p className='mt-1.5 text-xs text-destructive'>
                      {errors.message.message}
                    </p>
                  )}
                </div>
              </div>

              <div className='pt-2'>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full h-11 rounded-lg bg-primary text-primary-foreground font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer'
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </Button>
              </div>

              <p className='text-xs text-muted-foreground text-center'>
                Your privacy is respected. No spam or third-party sharing.
              </p>
            </form>
          )}
        </div>
      </BorderGlow>
    </div>
  )
}
