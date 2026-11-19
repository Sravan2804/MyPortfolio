import ExperienceTimeline from "@/components/experience-timeline"
import TechMarquee from "@/components/tech-marquee"
import BorderGlow from "@/components/ui/BorderGlow"
import { GraduationCap, Brain, Compass } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 w-full">
      {/* Intro Section */}
      <section className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-20">
        <header className="mb-8 rounded-xl border border-border/50 bg-card/65 dark:bg-card/55 backdrop-blur-[6px] p-6 sm:p-8 shadow-md">
          <p className="font-mono text-[10px] font-semibold tracking-[0.25em] uppercase text-primary mb-2">
            BACKGROUND // EXPERTISE
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            About Me
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Narrative Card */}
          <div className="lg:col-span-7 rounded-xl border border-border/50 bg-card/65 dark:bg-card/55 backdrop-blur-[6px] p-7 sm:p-9 space-y-5 text-base sm:text-lg text-foreground/90 dark:text-zinc-200 leading-relaxed font-sans shadow-md flex flex-col justify-center">
            <p>
              I am an AI and Software Engineer dedicated to engineering intelligent, high-throughput systems that translate state-of-the-art machine learning research into tangible, production-grade applications.
            </p>
            <p>
              Currently completing my Master of Engineering in Computer Vision and Artificial Intelligence at the University of Limerick, I specialize in generative AI orchestration, multimodal architectures, and real-time inference optimization.
            </p>
            <p className="text-foreground font-medium font-sans text-sm sm:text-base pt-2">
              My engineering philosophy revolves around rigorous model evaluation, low-latency deployment, and building autonomous agent loops that solve complex enterprise challenges reliably.
            </p>
          </div>

          {/* Right Column: Key Engineering Factsheet Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <BorderGlow
              edgeSensitivity={28}
              glowColor="22 90 52"
              backgroundColor="var(--card)"
              borderRadius={16}
              glowRadius={32}
              glowIntensity={0.85}
              coneSpread={22}
              colors={['#e11d48', '#ffffff', '#e11d48']}
              className="w-full shadow-lg"
            >
              <div className="p-7 space-y-5 text-sm">
                <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                  <GraduationCap className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Education</p>
                    <p className="font-semibold text-foreground">M.Eng Computer Vision &amp; AI</p>
                    <p className="text-xs text-muted-foreground">University of Limerick</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pb-3 border-b border-border/50">
                  <Brain className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Specialization</p>
                    <p className="font-semibold text-foreground">Agentic Workflows &amp; Computer Vision</p>
                    <p className="text-xs text-muted-foreground">LLM Chains, YOLOv8, PyTorch</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Compass className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Base</p>
                    <p className="font-semibold text-foreground">Limerick, Ireland</p>
                    <p className="text-xs text-primary font-medium">Available for Opportunities</p>
                  </div>
                </div>
              </div>
            </BorderGlow>
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee Section */}
      <section className="w-full mb-24 overflow-hidden">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-6">
          <div className="rounded-xl border border-border/40 bg-card/30 dark:bg-card/25 backdrop-blur-[2px] p-6 sm:p-7 shadow-md">
            <p className="font-mono text-[10px] font-semibold tracking-[0.25em] uppercase text-primary mb-1">
              TOOLING // FRAMEWORKS
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Technologies &amp; Frameworks
            </h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
              Specialized engineering tooling across deep learning, multimodal computer vision, and autonomous agent orchestration.
            </p>
          </div>
        </div>
        <TechMarquee />
      </section>

      {/* Timeline Section */}
      <section className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="mb-14 flex justify-center">
          <div className="inline-block rounded-xl border border-border/40 bg-card/30 dark:bg-card/25 backdrop-blur-[2px] px-8 py-3.5 shadow-md">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground font-serif tracking-tight">
              CHRONOLOGY // <span className="text-primary">JOURNEY</span>
            </h2>
          </div>
        </div>
        <ExperienceTimeline />
      </section>
    </div>
  )
}
