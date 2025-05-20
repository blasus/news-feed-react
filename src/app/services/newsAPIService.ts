import { FetchNewsApiFn } from "../model/apis";

type GNewsAPIItem = {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedAt: string;
  source: { name: string; };
}

const SEARCH_BASE_URL = 'https://gnews.io/api/v4/search';
const HEADLINE_URL = 'https://gnews.io/api/v4/top-headlines';

export const fetchNewsAPIArticles: FetchNewsApiFn = async (query: string, date: string, category: string) => {
  
  const url = new URL(query ? SEARCH_BASE_URL : HEADLINE_URL);

  const params = url.searchParams;
  params.append('q', query || '');
  params.append('category', category || '');
  params.append('lang', 'en');
  params.append('apikey', process.env.NEXT_PUBLIC_REACT_APP_NEWS_API_KEY!);
  if (date) {
    params.append('from', date);
  }
  
  try {
    const response = await fetch(url);
    const body = await response.json();
    
    if (response.ok && body.articles.length > 0) {
      
      return body.articles.map((item: GNewsAPIItem) => ({
        title: item.title,
        description: item.description,
        url: item.url,
        // Use a default image if no image URL is available
        imageUrl: item.image || '/placeholder-image.png',
        publishedAt: item.publishedAt,
        source: item.source.name,
      }));

    } else {
      console.warn("No articles found for the provided query, date, or category.");

      return [];
    }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {    
    console.error(
      "Error fetching GNewsAPI articles:",
      error.response ? error.response.data : error.message
    );

    return [];
  }
};
