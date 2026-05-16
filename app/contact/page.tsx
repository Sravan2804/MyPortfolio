import ContactForm from "@/components/contact-form";

export default function ContactPage() {
    return (
        <section className="pb-24 pt-12">
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                    lets talk
                </h2>

            </div>
            <ContactForm />
        </section>
    )
}
