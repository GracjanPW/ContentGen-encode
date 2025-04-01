import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-svh p-8 text-center">
      <h1 className="text-4xl font-bold mb-6">AI Content Generator</h1>
      <p className="text-xl mb-8 max-w-2xl">
        Transform your ideas into engaging content with the power of AI. Generate high-quality articles, blog posts, and more in seconds.
      </p>
      <Button 
        size="lg" 
        onClick={() => navigate("/prompt")}
        className="text-lg px-8 py-6"
      >
        Start Creating Content
      </Button>
    </div>
  )
} 