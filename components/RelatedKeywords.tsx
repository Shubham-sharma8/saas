import React from 'react'
import { Badge } from '@/components/ui/badge'

interface RelatedKeywordsProps {
  keywords: string[]
  onKeywordClick: (keyword: string) => void
}

export const RelatedKeywords: React.FC<RelatedKeywordsProps> = ({ keywords, onKeywordClick }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {keywords.map((keyword, index) => (
        <Badge
          key={index}
          variant="secondary"
          className="cursor-pointer hover:bg-secondary/80 transition-colors"
          onClick={() => onKeywordClick(keyword)}
        >
          {keyword}
        </Badge>
      ))}
    </div>
  )
}

