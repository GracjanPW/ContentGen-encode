import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

interface ContentPreviewProps {
  layout: string
  overlayFormat: string
  prompt: string
  overlayFile: File | null
}

export function ContentPreview({ layout, overlayFormat, prompt, overlayFile }: ContentPreviewProps) {
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [dividerPosition, setDividerPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (overlayFile) {
      const url = URL.createObjectURL(overlayFile)
      setVideoPreview(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [overlayFile])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()
    const position = overlayFormat === "split" 
      ? ((e.clientX - rect.left) / rect.width) * 100
      : ((e.clientY - rect.top) / rect.height) * 100
    setDividerPosition(Math.max(20, Math.min(80, position)))
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const getLayoutClass = () => {
    switch (layout) {
      case "landscape":
        return "w-[533px] h-[300px]" // 16:9
      case "portrait":
        return "w-[169px] h-[300px] mx-auto" // 9:16
      case "square":
        return "w-[300px] h-[300px] mx-auto" // 1:1
      case "vertical":
        return "w-[240px] h-[300px] mx-auto" // 4:5
      default:
        return "w-[533px] h-[300px]"
    }
  }

  const getOverlayClass = () => {
    switch (overlayFormat) {
      case "top":
        return "flex flex-col"
      case "bottom":
        return "flex flex-col"
      case "split":
        return "flex"
      default:
        return ""
    }
  }

  const getTextClass = () => {
    switch (layout) {
      case "portrait":
        return "text-[10px] max-w-[140px]"
      case "vertical":
        return "text-[11px] max-w-[200px]"
      case "square":
        return "text-sm max-w-[250px]"
      default:
        return "text-sm max-w-[400px]"
    }
  }

  const renderOverlayContent = (isOverlay: boolean) => {
    if (isOverlay) {
      if (videoPreview) {
        return (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <video
              ref={videoRef}
              src={videoPreview}
              className="max-w-full max-h-full object-contain"
              muted
              playsInline
            />
          </div>
        )
      }
      return (
        <div className="text-center p-2">
          <div className="text-xl mb-1">🎮</div>
          <p className={cn("text-muted-foreground break-words", getTextClass())}>
            Upload Video
          </p>
        </div>
      )
    }
    return (
      <div className="text-center p-2">
        <div className="text-xl mb-1">🎬</div>
        <p className={cn("text-muted-foreground break-words", getTextClass())}>
          {prompt || "Generated AI Content"}
        </p>
      </div>
    )
  }

  const renderDivider = () => {
    if (overlayFormat === "none") return null

    return (
      <div
        className={cn(
          "absolute bg-primary/20 cursor-col-resize hover:bg-primary/40 transition-colors",
          overlayFormat === "split" ? "w-1 h-full top-0" : "h-1 w-full left-0",
          isDragging && "bg-primary/60"
        )}
        style={{
          [overlayFormat === "split" ? "left" : "top"]: `${dividerPosition}%`,
          transform: overlayFormat === "split" ? "translateX(-50%)" : "translateY(-50%)",
        }}
        onMouseDown={handleMouseDown}
      />
    )
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-muted-foreground">Preview</h3>
      <div className="w-full h-[300px] flex items-center justify-center">
        <div 
          ref={containerRef}
          className={cn(
            "bg-muted/50 rounded-lg overflow-hidden border border-border relative",
            getLayoutClass(),
            getOverlayClass()
          )}
        >
          {overlayFormat === "none" ? (
            <div className="w-full h-full flex items-center justify-center bg-primary/5">
              {renderOverlayContent(false)}
            </div>
          ) : (
            <>
              {overlayFormat === "top" && (
                <>
                  <div 
                    className="bg-primary/10 flex items-center justify-center"
                    style={{ height: `${dividerPosition}%` }}
                  >
                    {renderOverlayContent(true)}
                  </div>
                  <div 
                    className="bg-primary/5 flex items-center justify-center"
                    style={{ height: `${100 - dividerPosition}%` }}
                  >
                    {renderOverlayContent(false)}
                  </div>
                </>
              )}
              {overlayFormat === "bottom" && (
                <>
                  <div 
                    className="bg-primary/5 flex items-center justify-center"
                    style={{ height: `${dividerPosition}%` }}
                  >
                    {renderOverlayContent(false)}
                  </div>
                  <div 
                    className="bg-primary/10 flex items-center justify-center"
                    style={{ height: `${100 - dividerPosition}%` }}
                  >
                    {renderOverlayContent(true)}
                  </div>
                </>
              )}
              {overlayFormat === "split" && (
                <>
                  <div 
                    className="bg-primary/10 flex items-center justify-center"
                    style={{ width: `${dividerPosition}%` }}
                  >
                    {renderOverlayContent(true)}
                  </div>
                  <div 
                    className="bg-primary/5 flex items-center justify-center"
                    style={{ width: `${100 - dividerPosition}%` }}
                  >
                    {renderOverlayContent(false)}
                  </div>
                </>
              )}
              {renderDivider()}
            </>
          )}
        </div>
      </div>
    </div>
  )
} 