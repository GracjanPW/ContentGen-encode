import { cn } from "@/lib/utils"

interface Layout {
  id: string
  name: string
  description: string
  aspectRatio: string
  previewClass: string
}

const layouts: Layout[] = [
  {
    id: "landscape",
    name: "Landscape",
    description: "16:9 - Perfect for YouTube and social media",
    aspectRatio: "aspect-video",
    previewClass: "w-full h-[80px]",
  },
  {
    id: "portrait",
    name: "Portrait",
    description: "9:16 - Ideal for Instagram Stories and TikTok",
    aspectRatio: "aspect-[9/16]",
    previewClass: "w-[50px] h-[90px] mx-auto",
  },
  {
    id: "square",
    name: "Square",
    description: "1:1 - Great for Instagram posts",
    aspectRatio: "aspect-square",
    previewClass: "w-[80px] h-[80px] mx-auto",
  },
  {
    id: "vertical",
    name: "Vertical",
    description: "4:5 - Perfect for Instagram feed",
    aspectRatio: "aspect-[4/5]",
    previewClass: "w-[70px] h-[90px] mx-auto",
  },
]

interface LayoutSelectorProps {
  selectedLayout: string
  onSelect: (layoutId: string) => void
}

export function LayoutSelector({ selectedLayout, onSelect }: LayoutSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {layouts.map((layout) => (
        <button
          key={layout.id}
          onClick={() => onSelect(layout.id)}
          className={cn(
            "p-2 rounded-lg border transition-all",
            "hover:border-primary hover:bg-accent/50",
            selectedLayout === layout.id && "border-primary bg-accent/50",
          )}
        >
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm">{layout.name}</h3>
              <span className="text-xs text-muted-foreground">
                {layout.aspectRatio.replace('aspect-', '')}
              </span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">{layout.description}</p>
            <div className={cn(
              "bg-muted rounded-md overflow-hidden",
              layout.previewClass
            )}>
              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                <span className="text-[10px] text-muted-foreground">
                  Preview
                </span>
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
} 