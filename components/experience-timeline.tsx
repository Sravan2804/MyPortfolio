import { Briefcase, GraduationCap } from 'lucide-react'

const timeline = [
  {
    title: "AI Engineer",
    company: "Freelance / Personal Projects",
    date: "2023 - Present",
    description: "Developing agentic workflows, LLM orchestration, and advanced computer vision models for scalable deployment. Built tools like ScholarSync AI and an Anti-Gravity Resume Screener.",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    title: "Software Developer",
    company: "Various Startups",
    date: "2021 - 2023",
    description: "Built scalable web applications using Next.js, React, and serverless architectures. Specialized in crafting premium glassmorphic UI/UX and integrating robust backend services.",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    title: "B.Tech in Computer Science",
    company: "University",
    date: "2019 - 2023",
    description: "Specialized in Artificial Intelligence, Data Structures, and Machine Learning. Graduated with top honors.",
    icon: <GraduationCap className="h-5 w-5" />,
  }
]

export default function ExperienceTimeline() {
  return (
    <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
      {/* Illuminated glowing line */}
      <div className="absolute left-[39px] sm:left-1/2 sm:-ml-[1px] top-0 h-full w-[2px] bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
      
      <div className="space-y-16">
        {timeline.map((item, index) => (
          <div key={index} className={`relative flex flex-col sm:flex-row ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''} items-start sm:items-center sm:justify-between group`}>
            
            {/* Timeline Dot */}
            <div className="absolute left-[15px] sm:left-1/2 sm:-ml-6 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-primary shadow-[0_0_15px] shadow-primary/50 transition-transform duration-500 group-hover:scale-110 z-10">
              <div className="text-primary-foreground">{item.icon}</div>
            </div>

            {/* Content Box */}
            <div className="ml-24 w-full sm:ml-0 sm:w-[45%]">
              <div className={`flex flex-col p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg transition-all duration-500 hover:border-primary/50 hover:bg-white/10 hover:shadow-[0_0_30px_-5px] hover:shadow-primary/30 ${index % 2 === 0 ? 'sm:items-start' : 'sm:items-end sm:text-right'}`}>
                <span className="text-sm font-bold text-primary mb-2 tracking-wider uppercase">{item.date}</span>
                <h3 className="text-2xl font-bold text-foreground mb-1">{item.title}</h3>
                <h4 className="text-md font-medium text-muted-foreground mb-4">{item.company}</h4>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
