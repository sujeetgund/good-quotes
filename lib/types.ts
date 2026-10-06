export const quoteCategories = [
  "life",
  "wisdom",
  "courage",
  "discipline",
  "creativity",
  "kindness",
  "work",
  "change",
] as const;

export type QuoteCategory = (typeof quoteCategories)[number];

export type Quote = {
  id: string;
  text: string;
  author: string;
  source: string;
  category: QuoteCategory;
  tags: string[];
  year?: number;
  license: "public-domain" | "original";
};
