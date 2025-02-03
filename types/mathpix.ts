export interface MathpixResponse {
  data: any;
  html: any;
  text: string;
  latex_simplified?: string;
  latex_styled?: string;
  mathml?: string;
  asciimath?: string;
  latex_list?: string[];
  equation_latex?: string;
  svg?: string;
  confidence: number;
  original_width?: number;
  original_height?: number;
}

export interface OCRResult {
  success: boolean;
  data?: MathpixResponse;
  error?: string;
}
