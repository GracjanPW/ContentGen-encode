import { cn } from "@/lib/utils"

interface OverlayFormat {
  id: string
  name: string
  description: string
  preview: string
}

const formats: OverlayFormat[] = [
  {
    id: "none",
    name: "No Overlay",
    description: "Just the generated video",
    preview: "🎬",
  },
  {
    id: "top",
    name: "Top Overlay",
    description: "Gameplay video on top",
    preview: "🎮",
  },
  {
    id: "bottom",
    name: "Bottom Overlay",
    description: "Gameplay video on bottom",
    preview: "🎮",
  },
  {
    id: "split",
    name: "Split Screen",
    description: "Side by side layout",
    preview: "🖥️",
  },
]

interface OverlayFormatSelectorProps {
  selectedFormat: string
  onSelect: (formatId: string) => void
}

export function OverlayFormatSelector({ selectedFormat, onSelect }: OverlayFormatSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {formats.map((format) => (
        <button
          key={format.id}
          onClick={() => onSelect(format.id)}
          className={cn(
            "p-2 rounded-lg border transition-all text-center",
            "hover:border-primary hover:bg-accent/50",
            selectedFormat === format.id && "border-primary bg-accent/50",
          )}
        >
          <div className="space-y-1">
            <div className="text-xl">{format.preview}</div>
            <h3 className="font-semibold text-sm">{format.name}</h3>
            <p className="text-xs text-muted-foreground">{format.description}</p>
          </div>
        </button>
      ))}
    </div>
  )
} 