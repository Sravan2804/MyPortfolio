import ExperienceTimeline from "@/components/experience-timeline"
import TechMarquee from "@/components/tech-marquee"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Intro Section */}
      <section className="container max-w-4xl pt-40 pb-24 mx-auto text-center px-4">
        <h1 className="title text-5xl font-extrabold tracking-tight md:text-7xl mb-8">
          About <span className="text-primary">Me</span>
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          I am a passionate AI & Software Engineer dedicated to building intelligent, scalable, and beautifully designed applications. With a strong background in Machine Learning and full-stack development, I bridge the gap between complex algorithms and seamless user experiences. I thrive on turning ambitious ideas into polished, production-ready products.
        </p>
      </section>

      {/* Marquee Section */}
      <section className="w-full mb-32 overflow-hidden">
        <TechMarquee />
      </section>

      {/* Timeline Section */}
      <section className="container max-w-5xl mx-auto px-4">
        <h2 className="title text-4xl font-bold text-center mb-20 text-foreground">
          My <span className="text-primary">Journey</span>
        </h2>
        <ExperienceTimeline />
      </section>
    </div>
  )
}