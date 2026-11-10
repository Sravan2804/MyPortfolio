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
    <section className='relative isolate'>
      {/* Background pattern */}
      <svg
        className='absolute inset-0 -z-10 h-full w-full stroke-zinc-200 opacity-75 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-zinc-700'
        aria-hidden='true'
      >
        <defs>
          <pattern
            id='83fd4e5a-9d52-42fc-97b6-718e5d7ee527'
            width={200}
            height={200}
            x='50%'
            y={-64}
            patternUnits='userSpaceOnUse'
          >
            <path d='M100 200V.5M.5 .5H200' fill='none' />
          </pattern>
        </defs>
        <svg
          x='50%'
          y={-64}
          className='overflow-visible fill-zinc-50 dark:fill-zinc-900/75'
        >
          <path
            d='M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z'
            strokeWidth={0}
          />
        </svg>
        <rect
          width='100%'
          height='100%'
          strokeWidth={0}
          fill='url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)'
        />
      </svg>

      {/* Form / Success Card */}
      <div className='relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-border/80 bg-background/95 p-8 shadow-2xl shadow-black/10 dark:shadow-white/10 backdrop-blur-3xl dark:border-white/10 dark:bg-white/[0.03] sm:p-12'>
        {isSubmitted ? (
          <div className='flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in-95 duration-500'>
            <div className='relative mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/10'>
              <div className='absolute -inset-1 rounded-full bg-primary/20 blur-md -z-10' />
              <CheckCircle2 className='h-10 w-10 text-primary' />
            </div>

            <h3 className='font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl'>
              Message <span className='text-primary'>Sent</span>
            </h3>

            <p className='mt-4 max-w-md text-base text-muted-foreground leading-relaxed'>
              Thank you for reaching out! Your note is on its way and I&apos;ll get back to you as soon as possible.
            </p>

            <Button
              onClick={() => {
                setIsSubmitted(false)
                setErrorMessage(null)
              }}
              className='mt-8 cursor-pointer rounded-full px-6'
              variant='outline'
            >
              Send another message
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(processForm)}
            className='lg:flex-auto'
            noValidate
          >
            {errorMessage && (
              <div className='mb-6 flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300 dark:bg-rose-950/40'>
                <AlertCircle className='h-5 w-5 shrink-0 text-rose-400' />
                <div className='flex-1'>
                  <p className='font-semibold text-rose-200'>Failed to send message</p>
                  <p className='mt-1 text-xs opacity-90'>{errorMessage}</p>
                </div>
              </div>
            )}

            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
              {/* Name */}
              <div>
                <Input
                  id='name'
                  type='text'
                  placeholder='Name'
                  autoComplete='given-name'
                  {...register('name')}
                />

                {errors.name?.message && (
                  <p className='ml-1 mt-2 text-sm text-rose-400'>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <Input
                  type='email'
                  id='email'
                  autoComplete='email'
                  placeholder='Email'
                  {...register('email')}
                />

                {errors.email?.message && (
                  <p className='ml-1 mt-2 text-sm text-rose-400'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className='sm:col-span-2'>
                <Textarea
                  rows={4}
                  placeholder='Message'
                  {...register('message')}
                />

                {errors.message?.message && (
                  <p className='ml-1 mt-2 text-sm text-rose-400'>
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>
            <div className='mt-6'>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full cursor-pointer disabled:opacity-50'
              >
                {isSubmitting ? 'Submitting...' : 'Contact Me'}
              </Button>
            </div>
            <p className='mt-4 text-xs text-muted-foreground'>
              By submitting this form, I agree to the{' '}
              <Link href='/privacy' className='font-bold'>
                privacy&nbsp;policy.
              </Link>
            </p>
          </form>
        )}
      </div>
    </section>
  )
}