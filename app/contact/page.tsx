import ContactForm from "@/components/contact-form";

export default function ContactPage() {
    return (
        <section className="pb-24 pt-40">
            <div className="container max-w-4xl">
                <h1 className="title mb-6 text-center text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                    Let&apos;s <span className="text-primary">Connect</span>
                </h1>
                <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-muted-foreground">
                    Whether you have a question, a project in mind, or just want to say hi, I&apos;d love to hear from you. Drop a message below!
                </p>
                <ContactForm />
            </div>
        </section>
    )
}
