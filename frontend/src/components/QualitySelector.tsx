import { cn } from "@/lib/utils"

interface Quality {
  id: string
  name: string
  description: string
  icon: string
}

const qualities: Quality[] = [
  {
    id: "standard",
    name: "Standard",
    description: "Balanced quality and speed",
    icon: "⚡",
  },
  {
    id: "high",
    name: "High",
    description: "Better quality, longer processing",
    icon: "✨",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Best quality, longest processing",
    icon: "🌟",
  },
]

interface QualitySelectorProps {
  selectedQuality: string
  onSelect: (qualityId: string) => void
}

export function QualitySelector({ selectedQuality, onSelect }: QualitySelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {qualities.map((quality) => (
        <button
          key={quality.id}
          onClick={() => onSelect(quality.id)}
          className={cn(
            "p-2 rounded-lg border transition-all text-center",
            "hover:border-primary hover:bg-accent/50",
            selectedQuality === quality.id && "border-primary bg-accent/50",
          )}
        >
          <div className="space-y-1">
            <div className="text-xl">{quality.icon}</div>
            <h3 className="font-semibold text-sm">{quality.name}</h3>
            <p className="text-xs text-muted-foreground">{quality.description}</p>
          </div>
        </button>
      ))}
    </div>
  )
} 