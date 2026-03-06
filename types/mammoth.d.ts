declare module "mammoth" {
  interface ConversionResult {
    value: string;
    messages: Array<{ type: string; message: string; error?: Error }>;
  }

  interface ConvertOptions {
    buffer?: Buffer | ArrayBuffer;
    path?: string;
  }

  export function convertToHtml(options: ConvertOptions): Promise<ConversionResult>;
  export function extractRawText(options: ConvertOptions): Promise<ConversionResult>;
}
