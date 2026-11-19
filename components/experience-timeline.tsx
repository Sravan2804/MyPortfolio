import { Briefcase, GraduationCap } from 'lucide-react'
import BorderGlow from '@/components/ui/BorderGlow'

const timeline = [
  {
    title: "MEngg. in Computer Vision and Artificial Intelligence",
    company: "University of Limerick",
    date: "2025 - 2026",
    description: "Specializing in advanced Computer Vision architectures, Generative AI engineering, and high-performance neural inference systems.",
    icon: GraduationCap,
    type: "Education"
  },
  {
    title: "AI Engineer",
    company: "Personal & Open Source Projects",
    date: "2023 - Present",
    description: "Building production-grade agentic frameworks, multi-agent LLM systems, and computer vision pipelines. Created ScholarSync AI and intelligent automation tools.",
    icon: Briefcase,
    type: "Experience"
  },
  {
    title: "Software Engineering Intern",
    company: "RINL-Vizag Steel Plant",
    date: "July 2024 - Aug 2024",
    description: "Architected and deployed a real-time asset telemetry system using Python and computer vision QR tracking to automate monitoring across transit operations.",
    icon: Briefcase,
    type: "Experience"
  },
  {
    title: "B.Tech in Computer Science & Engineering",
    company: "Andhra University",
    date: "2021 - 2025",
    description: "Graduated with top honors. Focused on Machine Learning algorithms, Data Structures, and Distributed Software Systems.",
    icon: GraduationCap,
    type: "Education"
  }
]

export default function ExperienceTimeline() {
  return (
    <div className="relative pl-6 sm:pl-8 border-l border-border/60 ml-3 sm:ml-4 space-y-10">
      {timeline.map((item, index) => {
        const IconComponent = item.icon
        return (
          <div key={index} className="relative group">
            {/* Timeline node marker */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-6 flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border border-border bg-background text-primary group-hover:border-primary/80 transition-colors">
              <IconComponent className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </div>

            {/* Experience Card with BorderGlow */}
            <BorderGlow
              edgeSensitivity={30}
              glowColor="345 80 65"
              backgroundColor="#120F17"
              borderRadius={18}
              glowRadius={30}
              glowIntensity={0.85}
              coneSpread={24}
              colors={['#ff2a85', '#e01e72', '#b5179e']}
              className="w-full"
            >
              <div className="p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-primary">
                    {item.date}
                  </span>
                  <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground/80 px-2 py-0.5 rounded border border-border/50">
                    {item.type}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-foreground mb-1">
                  {item.title}
                </h3>
                <h4 className="text-sm font-medium text-muted-foreground mb-3">
                  {item.company}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </BorderGlow>
          </div>
        )
      })}
    </div>
  )
}
