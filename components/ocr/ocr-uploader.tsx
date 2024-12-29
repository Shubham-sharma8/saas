'use client'

import { useState, useEffect, useRef } from 'react'
import * as React from "react"
import * as LR from "@uploadcare/blocks"
import { Heading } from '@/components/heading'

import { PACKAGE_VERSION } from "@uploadcare/blocks"
import { processImage } from '@/app/(landing)/(docs)/(ActionsImage)/process-image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger,  } from '@/components/ui/new-tabs'
import { Loader2, FileText, ImageIcon, Calculator, Copy, Check, Eye } from 'lucide-react'
import { 

  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";

import { copyToClipboard } from '@/utils/clipboard'
import { useToast } from '@/components/ui/use-toast'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import type { MathpixResponse } from '@/types/mathpix'
import 'katex/dist/katex.min.css'
import st from "./styles.module.css"

// Register Uploadcare Blocks
LR.registerBlocks(LR)

export default function OCRUploader() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<MathpixResponse[]>([])
  const [uploadedUrl, setUploadedUrl] = useState<string[]>([])
  const [renderedMath, setRenderedMath] = useState<string>('')
  const [copying, setCopying] = useState<Record<string, boolean>>({})
  const [mathml, setMathml] = useState<string>('')
  const [asciimath, setAsciimath] = useState<string>('')
  const [svg, setSvg] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const { toast } = useToast()

  const ctxProviderRef = useRef<any>(null)

  useEffect(() => {
    const ctxProvider = ctxProviderRef.current
    if (!ctxProvider) return

    const handleChangeEvent = async (e: any) => {
      const successFiles = e.detail.allEntries.filter((f: any) => f.status === "success")
      if (successFiles.length > 0) {
        successFiles.forEach(async (file: any) => {
          const cdnUrl = `${file.cdnUrl}-/format/jpeg/`
          await handleUploadComplete({ uuid: file.uuid, cdnUrl })
        })
      }
    }

    ctxProvider.addEventListener("change", handleChangeEvent)
    return () => {
      ctxProvider.removeEventListener("change", handleChangeEvent)
    }
  }, [])

  useEffect(() => {
    //This effect is not needed anymore since we are not using result.latex_styled
  }, [results])

  const handleUploadComplete = async (info: { uuid: string, cdnUrl: string }) => {
    setUploadedUrl((prev) => [...(prev || []), info.cdnUrl])
    setLoading(true)
    setError(null)

    try {
      const response = await processImage(info.cdnUrl)
      if (response.success && response.data) {
        setResults((prev) => [...prev, response.data as MathpixResponse])
      } else {
        setError(response.error || 'Failed to process image')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (text: string, format: string) => {
    setCopying({ ...copying, [format]: true })
    const success = await copyToClipboard(text)
    
    if (success) {
      toast({
        title: "Copied!",
        description: `${format} copied to clipboard. You can now paste it in ${format === 'Word Equation' ? 'Microsoft Word' : 'your document'}.`,
      })
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to copy to clipboard",
      })
    }

    setTimeout(() => {
      setCopying({ ...copying, [format]: false })
    }, 2000)
  }

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      <Heading
              title="OCR Processor"
              description="AI powered OCR document processor that extracts text, math equations, and tables from images."
              icon={<img src="https://cdn-icons-png.flaticon.com/128/5261/5261894.png" alt="OCR Icon" className="w-full h-full object-contain" />}
              iconColor="text-violet-500"
              bgColor="bg-violet-500/10 dark:bg-white"
            />
      <Card>
        <CardContent className="pt-6">
          <div className="justify-center">
            <div className={st.center}>
              <lr-config
                ctx-name="my-uploader"
                pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY!}
                source-list="local, url, camera, dropbox, gdrive, onedrive, gphotos"
                multiple={true}
                img-only={true}
              ></lr-config>
              <lr-file-uploader-inline
                ctx-name="my-uploader"
                css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@${PACKAGE_VERSION}/web/lr-file-uploader-regular.min.css`}
              ></lr-file-uploader-inline>
              <lr-upload-ctx-provider
                ctx-name="my-uploader"
                ref={ctxProviderRef}
              ></lr-upload-ctx-provider>
            </div>
            {loading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing image...
              </div>
            )}

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <div className="overflow-x-auto pb-4">
          <div className={`grid gap-4 min-w-[300px] ${
            results.length === 1 
              ? 'max-w-2xl mx-auto' 
              : 'grid-cols-1 lg:grid-cols-2'
          }`}>
            {results.map((result, index) => (
              <Card key={index}>
                <CardContent className="pt-6 space-y-4 px-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Results</h2>
                    <div className="text-sm text-muted-foreground">
                      Confidence: {result?.confidence ? `${(result.confidence * 100).toFixed(2)}%` : 'N/A'}
                    </div>
                  </div>

                  <Tabs defaultValue="rendered" className="w-full">
                    <TabsList className="grid  w-full grid-cols-4 sm:grid-cols-4 gap-1">
                      <TabsTrigger value="rendered">Rendered</TabsTrigger>
                      <TabsTrigger value="text">Text</TabsTrigger>
                      <TabsTrigger value="html">HTML</TabsTrigger>
                      <TabsTrigger value="latex">LaTeX</TabsTrigger>
                    </TabsList>
                    <TabsContent value="rendered" className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-medium">
                            <Calculator className="w-4 h-4" />
                            Rendered Math
                          </div>
                          <Button
                            variant="brutal"
                            size="sm"
                            onClick={() => setIsDialogOpen(true)} // Open dialog when clicked
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View in Dialog
                          </Button>
                        </div>

                        {/* Rendered Math Content */}
                        <div 
                          className="p-6 bg-white rounded-lg shadow-sm border min-h-[100px]"
                          dangerouslySetInnerHTML={{ 
                            __html: result.html || '<p class="text-muted-foreground">No content to display</p>' 
                          }}
                        />

                        {/* Dialog Component */}
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Rendered Output</DialogTitle>
                            </DialogHeader>
                            <div 
                              className="mt-4"
                              dangerouslySetInnerHTML={{ __html: result.html }}
                            />
                            <DialogFooter>
                              <Button onClick={() => setIsDialogOpen(false)}>
                                Close
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        {/* Additional Copy Buttons */}
                        <div className="space-y-2 sm:space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex items-center gap-2 font-medium">
                              <Calculator className="w-4 h-4" />
                              MathML (MS Word) - Desktop only
                            </div>
                            <Button
                              variant="brutal"
                              size="sm"
                              className="w-full sm:w-auto"
                              onClick={() => handleCopy(result.data?.find((item: { type: string }) => item.type === 'mathml')?.value || '', 'MathML')}
                              disabled={!result.data?.find((item: { type: string }) => item.type === 'mathml')?.value || copying['MathML']}
                            >
                              {copying['MathML'] ? (
                                <Check className="w-4 h-4 mr-2" />
                              ) : (
                                <Copy className="w-4 h-4 mr-2" />
                              )}
                              Copy MathML (MS Word)
                            </Button>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex items-center gap-2 font-medium">
                              <Calculator className="w-4 h-4" />
                              MathML
                            </div>
                            <Button
                              variant="brutal"
                              size="sm"
                              className="w-full sm:w-auto"
                              onClick={() => handleCopy(result.data?.find((item: { type: string }) => item.type === 'mathml')?.value || '', 'MathML')}
                              disabled={!result.data?.find((item: { type: string }) => item.type === 'mathml')?.value || copying['MathML']}
                            >
                              {copying['MathML'] ? (
                                <Check className="w-4 h-4 mr-2" />
                              ) : (
                                <Copy className="w-4 h-4 mr-2" />
                              )}
                              Copy MathML
                            </Button>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex items-center gap-2 font-medium">
                              <Calculator className="w-4 h-4" />
                              AsciiMath
                            </div>
                            <Button
                              variant="brutal"
                              size="sm"
                              className="w-full sm:w-auto"
                              onClick={() => handleCopy(result.data?.find((item: { type: string }) => item.type === 'asciimath')?.value || '', 'AsciiMath')}
                              disabled={!result.data?.find((item: { type: string }) => item.type === 'asciimath')?.value || copying['AsciiMath']}
                            >
                              {copying['AsciiMath'] ? (
                                <Check className="w-4 h-4 mr-2" />
                              ) : (
                                <Copy className="w-4 h-4 mr-2" />
                              )}
                              Copy AsciiMath
                            </Button>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex items-center gap-2 font-medium">
                              <Calculator className="w-4 h-4" />
                              HTML
                            </div>
                            <Button
                              variant="brutal"
                              size="sm"
                              className="w-full sm:w-auto"
                              onClick={() => handleCopy(result.html || '', 'HTML')}
                              disabled={!result.html || copying['HTML']}
                            >
                              {copying['HTML'] ? (
                                <Check className="w-4 h-4 mr-2" />
                              ) : (
                                <Copy className="w-4 h-4 mr-2" />
                              )}
                              Copy HTML
                            </Button>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                            <div className="flex items-center gap-2 font-medium">
                              <Calculator className="w-4 h-4" />
                              View Original
                            </div>
                            {uploadedUrl[index] && (
                              <Button
                                variant="brutal"
                                className="w-full sm:w-auto"
                                onClick={() => window.open(uploadedUrl[index], '_blank')}
                              >
                                <ImageIcon className="w-4 h-4 mr-2" />
                                View Original
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="text" className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-medium">
                            <FileText className="w-4 h-4" />
                            Extracted Text
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={() => handleCopy(result.text || '', 'Text')}
                            disabled={!result.text || copying['Text']}
                          >
                            {copying['Text'] ? (
                              <Check className="w-4 h-4 mr-2" />
                            ) : (
                              <Copy className="w-4 h-4 mr-2" />
                            )}
                            Copy Text
                          </Button>
                        </div>
                        <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap">
                          {result.text}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="html" className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-medium">
                            <FileText className="w-4 h-4" />
                            HTML Output
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={() => handleCopy(result.html || '', 'HTML')}
                            disabled={!result.html || copying['HTML']}
                          >
                            {copying['HTML'] ? (
                              <Check className="w-4 h-4 mr-2" />
                            ) : (
                              <Copy className="w-4 h-4 mr-2" />
                            )}
                            Copy HTML
                          </Button>
                        </div>
                        {result.html && (
                          <>
                            <div 
                              className="p-4 bg-white rounded-lg shadow-sm border"
                              dangerouslySetInnerHTML={{ __html: (result.html) }}
                            />
                            <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap font-mono text-sm">
                              {result.html}
                            </div>
                          </>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="latex" className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-medium">
                            <FileText className="w-4 h-4" />
                            LaTeX
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto"
                            onClick={() => handleCopy(result.latex_styled || '', 'LaTeX')}
                            disabled={!result.latex_styled || copying['LaTeX']}
                          >
                            {copying['LaTeX'] ? (
                              <Check className="w-4 h-4 mr-2" />
                            ) : (
                              <Copy className="w-4 h-4 mr-2" />
                            )}
                            Copy LaTeX
                          </Button>
                        </div>
                        <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap font-mono text-sm">
                          {result.latex_styled}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

