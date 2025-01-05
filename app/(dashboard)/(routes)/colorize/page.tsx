"use client"

import { useState } from "react"
import Image from "next/image"
import { Widget } from "@uploadcare/react-widget"
import axios from "axios"
import { Download, Upload } from 'lucide-react'
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heading } from "@/components/heading"
import { Loaderimage } from "@/components/loader"

export default function ColorizePage() {
  const [originalImage, setOriginalImage] = useState("")
  const [colorizedImages, setColorizedImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = async (fileInfo: any) => {
    try {
      setIsLoading(true)
      setColorizedImages([])
      
      if (!fileInfo?.cdnUrl) {
        throw new Error("No image URL received from upload")
      }

      const transformedUrl = `${fileInfo.cdnUrl}-/format/jpeg/`
      setOriginalImage(transformedUrl)
      

      const response = await axios.post("/api/colorize", {
        imageUrl: transformedUrl
      })


      if (response.data.colorizedUrls && response.data.colorizedUrls.length > 0) {
        setColorizedImages(response.data.colorizedUrls)
        toast.success("Images colorized successfully!")
      } else {
        throw new Error(response.data.error || "Failed to colorize image")
      }
    } catch (err) {
      console.error('Colorization error:', err)
      toast.error(err instanceof Error ? err.message : "Failed to colorize image. Please try again.")
      setColorizedImages([])
    } finally {
      setIsLoading(false)
    }
  }

  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
    } catch (err) {
      console.error("Failed to download image:", err)
      toast.error("Failed to download image")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Heading
        title="Image Colorization"
        description="Upload a black and white image and see it come to life with AI-powered colorization"
        icon={<Upload className="w-10 h-10" />}
        iconColor="text-blue-500"
        bgColor="bg-blue-500/10"
      />

      <div className="flex-1 p-4 lg:p-8 space-y-6">
        <Card className="w-full max-w-3xl mx-auto">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex justify-center">
                <Widget
                  publicKey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY || ""}
                  onChange={handleImageUpload}
                  clearable
                  imageShrink="800x800"
                  imagePreviewMaxSize={5 * 1024 * 1024}
                  tabs="file camera url facebook gdrive gphotos dropbox onedrive"
                  previewStep
                  validators={[
                    (fileInfo: any) => {
                      if (fileInfo.size > 5 * 1024 * 1024) {
                        throw new Error('File size should not exceed 5MB');
                      }
                    }
                  ]}
                />
              </div>

              {isLoading && (
                <div className="flex justify-center p-8">
                  <Loaderimage />
                </div>
              )}

              {originalImage && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-center">Original</h3>
                  <div className="relative aspect-square">
                    <Image
                      src={originalImage}
                      alt="Original image"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => downloadImage(originalImage, "original.jpg")}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Original
                  </Button>
                </div>
              )}

              {colorizedImages.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center">Colorized Versions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {colorizedImages.map((url, index) => (
                      <div key={index} className="space-y-2">
                        <div className="relative aspect-square">
                          <Image
                            src={url}
                            alt={`Colorized image ${index + 1}`}
                            fill
                            className="object-contain rounded-lg"
                          />
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => downloadImage(url, `colorized_${index + 1}.png`)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Colorized {index + 1}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

