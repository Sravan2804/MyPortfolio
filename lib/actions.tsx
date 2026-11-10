'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { ContactFormSchema } from '@/lib/schemas'


type ContactFormInputs = z.infer<typeof ContactFormSchema>

export async function sendEmail(data: ContactFormInputs) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured in environment variables.')
    return { error: 'RESEND_API_KEY is not configured on the server. Please add it to your environment variables.' }
  }

  const resend = new Resend(apiKey)

  const result = ContactFormSchema.safeParse(data)

  if (result.error) {
    return { error: 'Please check your input values and try again.' }
  }

  try {
    const { name, email, message } = result.data
    const { data: resData, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'ramasravan007@gmail.com',
      replyTo: email,
      subject: `Contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<h3>New Contact Form Submission</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`,
    })

    if (error) {
      console.error('Resend API Error:', error)
      return { error: error.message || 'Resend failed to send the email.' }
    }

    if (!resData) {
      return { error: 'No response received from the email service.' }
    }

    return { success: true }
  } catch (error: unknown) {
    console.error('Action Catch Error:', error)
    if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: 'An unexpected error occurred while sending.' }
  }
}
