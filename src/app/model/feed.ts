export type Filter = {
  query: string;
  date: string;
  category: string;
  source: string;
}

export type Article = {
  imageUrl: string;
  title: string;
  section: string;
  description: string;
  altText?: string;
  url: string;
  source: string;
  publishedAt: string;
  fullTitle: boolean;
}

export type OnSearchFn = (searchParams: Filter) => void;