import ContactForm from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container max-w-3xl px-4 sm:px-6">
        <header className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">
            Inquiries &amp; Collaboration
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Get in Touch
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-xl">
            Whether you are discussing AI engineering roles, collaborative research, or specialized LLM systems, feel free to reach out.
          </p>
        </header>

        <ContactForm />
      </div>
    </div>
  )
}
