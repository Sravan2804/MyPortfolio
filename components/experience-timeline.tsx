import { Briefcase, GraduationCap } from 'lucide-react'
import BorderGlow from '@/components/ui/BorderGlow'

const timeline = [
  {
    title: "MEngg. in Computer Vision & Artificial Intelligence",
    company: "University of Limerick",
    date: "2025 - 2026",
    description: "Specializing in advanced Computer Vision, Autonomous Agent Workflows, LLM Orchestration, and Real-World Machine Learning Systems.",
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    title: "AI Engineer",
    company: "Autonomous Agentic Workflows & CV Systems",
    date: "2023 - Present",
    description: "Architecting agentic research orchestrators, vision telemetry pipelines, and production inference systems. Built tools including ScholarSync AI and Resume Screener.",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    title: "Software Engineering Intern",
    company: "RINL-Vizag Steel Plant",
    date: "July 2024 - Aug 2024",
    description: "Designed and deployed a Python-based real-time asset tracking system, integrating QR identification and live location tracking APIs to automate monitoring of daily vehicle movements.",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    title: "B.Tech in Computer Science & Engineering",
    company: "Andhra University",
    date: "2021 - 2025",
    description: "Specialized in Artificial Intelligence, Data Structures, and Machine Learning. Graduated with top honors.",
    icon: <GraduationCap className="h-5 w-5" />,
  }
]

export default function ExperienceTimeline() {
  return (
    <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
      {/* Illuminated glowing line */}
      <div className="absolute left-[23px] sm:left-1/2 sm:-ml-[1px] top-0 h-full w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent" />
      
      <div className="space-y-16">
        {timeline.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-col sm:flex-row ${
              index % 2 === 0 ? 'sm:flex-row-reverse' : ''
            } items-start sm:items-center sm:justify-between group`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-[3px] sm:left-1/2 sm:-ml-6 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border-4 border-background bg-primary shadow-[0_0_15px] shadow-primary/50 transition-transform duration-500 group-hover:scale-110 z-10">
              <div className="text-primary-foreground">{item.icon}</div>
            </div>

            {/* Content Box with BorderGlow */}
            <div className="ml-14 w-full sm:ml-0 sm:w-[45%]">
              <BorderGlow
                edgeSensitivity={30}
                glowColor="22 90 52"
                backgroundColor="var(--card)"
                borderRadius={18}
                glowRadius={32}
                glowIntensity={0.85}
                coneSpread={24}
                colors={['#e11d48', '#ffffff', '#e11d48']}
                className="w-full shadow-lg"
              >
                <div
                  className={`flex flex-col p-6 ${
                    index % 2 === 0 ? 'sm:items-start sm:text-left' : 'sm:items-end sm:text-right'
                  }`}
                >
                  <span className="text-xs font-mono font-bold text-primary mb-2 tracking-wider uppercase">
                    {item.date}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1 font-serif">
                    {item.title}
                  </h3>
                  <h4 className="text-sm sm:text-base font-medium text-foreground/80 dark:text-zinc-300 mb-3">
                    {item.company}
                  </h4>
                  <p className="text-sm text-foreground/90 dark:text-zinc-200 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </BorderGlow>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
