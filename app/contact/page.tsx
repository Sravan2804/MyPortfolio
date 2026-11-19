import ContactForm from "@/components/contact-form";
import BorderGlow from "@/components/ui/BorderGlow";
import { Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-28 pb-24 w-full">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <header className="mb-10 rounded-xl border border-border/50 bg-card/65 dark:bg-card/55 backdrop-blur-[6px] p-6 sm:p-7 shadow-md">
          <p className="font-mono text-[10px] font-semibold tracking-[0.25em] uppercase text-primary mb-2">
            CHANNELS // INQUIRIES
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Get in Touch
          </h1>
          <p className="mt-3 text-base sm:text-lg text-foreground/90 dark:text-zinc-200 leading-relaxed max-w-2xl font-serif">
            Whether you are discussing AI engineering roles, collaborative research, or high-throughput computer vision pipelines, feel free to reach out.
          </p>
        </header>

        {/* 2-Column Responsive Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Coordinates Card */}
          <div className="lg:col-span-5">
            <BorderGlow
              edgeSensitivity={28}
              glowColor="22 90 52"
              backgroundColor="var(--card)"
              borderRadius={18}
              glowRadius={36}
              glowIntensity={0.85}
              coneSpread={24}
              colors={['#e11d48', '#ffffff', '#e11d48']}
              className="w-full shadow-lg"
            >
              <div className="p-8 sm:p-10 space-y-8">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                    Direct Channels
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Available for technical consultations, full-time AI Engineering roles, and research opportunities.
                  </p>
                </div>

                <div className="space-y-5 text-sm">
                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-background text-primary">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">Limerick, Ireland</p>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-background text-primary">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Response Time</p>
                      <p className="font-medium text-foreground">Within 24 Hours</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-background text-primary">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Direct Email</p>
                      <a
                        href="mailto:contact@sravan.dev"
                        className="font-medium text-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-border hover:decoration-primary"
                      >
                        ramasravangunda@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Profiles */}
                <div className="pt-6 border-t border-border/50">
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">
                    Verified Profiles
                  </p>
                  <div className="flex items-center gap-3">
                    <a
                      href="https://github.com/Sravan2804"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-background px-4 py-2 text-xs font-medium text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      <svg fill="currentColor" viewBox="0 0 24 24" className="h-3.5 w-3.5">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                      <span>GitHub</span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/rama-sravan-28o4/"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-background px-4 py-2 text-xs font-medium text-foreground hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      <svg fill="currentColor" viewBox="0 0 448 512" className="h-3.5 w-3.5">
                        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </BorderGlow>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
