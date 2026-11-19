import ExperienceTimeline from "@/components/experience-timeline"
import TechMarquee from "@/components/tech-marquee"

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      {/* Intro Section */}
      <section className="container max-w-4xl px-4 sm:px-6 mb-20">
        <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">
          Background &amp; Expertise
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-6">
          About Me
        </h1>
        <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
          <p>
            I am an AI and Software Engineer dedicated to engineering intelligent, high-throughput systems that translate state-of-the-art machine learning research into tangible, production-grade applications.
          </p>
          <p>
            Currently completing my Master of Engineering in Computer Vision and Artificial Intelligence at the University of Limerick, I specialize in generative AI orchestration, multimodal architectures, and real-time inference optimization.
          </p>
        </div>
      </section>

      {/* Tech Stack Marquee Section */}
      <section className="w-full mb-24 overflow-hidden">
        <div className="container max-w-4xl px-4 sm:px-6 mb-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Technologies &amp; Frameworks
          </p>
        </div>
        <TechMarquee />
      </section>

      {/* Timeline Section */}
      <section className="container max-w-4xl px-4 sm:px-6">
        <header className="mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-2">
            Career &amp; Education
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Professional Journey
          </h2>
        </header>
        <ExperienceTimeline />
      </section>
    </div>
  )
}
