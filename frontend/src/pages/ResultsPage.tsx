import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

interface ResultsState {
  videoUrl: string
  prompt: string
  layout: string
  quality: string
  overlayFormat: string
}

export function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as ResultsState

  if (!state?.videoUrl) {
    return (
      <div className="flex flex-col items-center justify-center min-h-svh p-6">
        <h1 className="text-2xl font-bold text-destructive mb-4">No video data found</h1>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-svh p-6 bg-gradient-to-b from-background to-background/95">
      <div className="w-full max-w-5xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Your Generated Content
          </h1>
          <p className="text-muted-foreground">
            Here's your AI-generated video
          </p>
        </div>

        <div className="space-y-4">
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted/50 border border-border">
            <video
              src={state.videoUrl}
              controls
              className="w-full h-full"
              autoPlay
              loop
              muted
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Prompt</h2>
            <p className="text-muted-foreground">{state.prompt}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Layout</h3>
              <p className="text-sm text-muted-foreground capitalize">{state.layout}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Quality</h3>
              <p className="text-sm text-muted-foreground capitalize">{state.quality}</p>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-medium">Overlay</h3>
              <p className="text-sm text-muted-foreground capitalize">{state.overlayFormat}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            className="flex-1"
            onClick={() => navigate("/")}
          >
            Create Another
          </Button>
          <Button 
            variant="outline"
            className="flex-1"
            onClick={() => {
              // Add download functionality here
              window.open(state.videoUrl, '_blank')
            }}
          >
            Download Video
          </Button>
        </div>
      </div>
    </div>
  )
} 