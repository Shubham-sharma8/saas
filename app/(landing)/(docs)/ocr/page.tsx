import OCRUploader from '@/components/ocr/ocr-uploader'
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  return (
    <main className="min-h-screen p-3 mt-12 md:p-10 py-10  lg:p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <OCRUploader />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

