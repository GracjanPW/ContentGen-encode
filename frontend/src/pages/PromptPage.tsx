import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { LayoutSelector } from "@/components/LayoutSelector"
import { QualitySelector } from "@/components/QualitySelector"
import { OverlayFormatSelector } from "@/components/OverlayFormatSelector"
import { ContentPreview } from "@/components/ContentPreview"
import { useState } from "react"


export function PromptPage() {
  const navigate = useNavigate()
  const [selectedLayout, setSelectedLayout] = useState("landscape")
  const [selectedQuality, setSelectedQuality] = useState("standard")
  const [selectedFormat, setSelectedFormat] = useState("none")
  const [prompt, setPrompt] = useState("")
  const [overlayFile, setOverlayFile] = useState<File | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setOverlayFile(file)
    }
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    try {
      const formData = new FormData()
      formData.append("prompt", prompt)
      formData.append("layout", selectedLayout)
      formData.append("quality", selectedQuality)
      formData.append("overlayFormat", selectedFormat)
      if (overlayFile) {
        formData.append("overlayFile", overlayFile)
      }

      // Log request data
      console.log("Request Data:", {
        prompt,
        layout: selectedLayout,
        quality: selectedQuality,
        overlayFormat: selectedFormat,
        hasOverlayFile: !!overlayFile,
        overlayFileName: overlayFile?.name,
        overlayFileSize: overlayFile ? `${(overlayFile.size / 1024 / 1024).toFixed(2)}MB` : null
      })

      // Mock API call
      const response = await fetch("/api/generate-content", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to generate content")
      }

      const data = await response.json()
      console.log("Generated content:", data)
      
      // Navigate to results page with the generated video data
      navigate("/results", { 
        state: { 
          videoUrl: data.videoUrl,
          prompt,
          layout: selectedLayout,
          quality: selectedQuality,
          overlayFormat: selectedFormat
        }
      })
    } catch (error) {
      console.error("Error generating content:", error)
      // Handle error (show toast, etc.)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-svh p-6 bg-gradient-to-b from-background to-background/95">
      <div className="w-full max-w-5xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Create Your Content
          </h1>
          <p className="text-muted-foreground">
            Generate amazing videos with AI
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Prompt and Options */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="text-primary">Your Prompt</span>
              </h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-[200px] p-3 rounded-md border border-input bg-background/50 backdrop-blur-sm text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Enter your content prompt here..."
              />
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="text-primary">Quality Level</span>
              </h2>
              <QualitySelector
                selectedQuality={selectedQuality}
                onSelect={setSelectedQuality}
              />
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="text-primary">Overlay Format</span>
              </h2>
              <OverlayFormatSelector
                selectedFormat={selectedFormat}
                onSelect={setSelectedFormat}
              />
              
              {selectedFormat !== "none" && (
                <div className="mt-3">
                  <label className="block text-sm font-medium mb-1">
                    Upload Overlay Video
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors"
                  />
                  {overlayFile && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Selected: {overlayFile.name}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right column - Layout and Preview */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <span className="text-primary">Choose Layout</span>
              </h2>
              <LayoutSelector
                selectedLayout={selectedLayout}
                onSelect={setSelectedLayout}
              />
            </div>

            <ContentPreview
              layout={selectedLayout}
              overlayFormat={selectedFormat}
              prompt={prompt}
              overlayFile={overlayFile}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <Button 
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all" 
            size="lg"
            disabled={!prompt.trim() || (selectedFormat !== "none" && !overlayFile) || isGenerating}
            onClick={handleGenerate}
          >
            {isGenerating ? "Generating..." : "Generate Content"}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="w-full hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
} 