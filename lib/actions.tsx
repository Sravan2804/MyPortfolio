'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { ContactFormSchema } from '@/lib/schemas'


type ContactFormInputs = z.infer<typeof ContactFormSchema>
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data)

  if (result.error) {
    return { error: result.error.format() }
  }

  try {
    const { name, email, message } = result.data
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'ramasravan007@gmail.com', // Must be your verified Resend account email
      reply_to: email, // This allows you to reply directly to the visitor
      subject: `Contact form submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<h3>New Contact Form Submission</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`,
    })

    if (error) {
      console.error('Resend API Error:', error)
      throw new Error(error.message || 'Failed to send email')
    }

    if (!data) {
      throw new Error('No data returned from Resend')
    }

    return { success: true }
  } catch (error) {
    console.error('Action Catch Error:', error)
    return { error: String(error) }
  }
}
