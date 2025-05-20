import { FetchNewsApiFn } from "../model/apis";
import { Article } from "../model/feed";

type NYTIMEAPIMultimedia = {
  default: { url: string };
  thumbnail: { url: string };
  caption: string;
}

type NYTimesAPIItem = {
  multimedia: NYTIMEAPIMultimedia;
  headline: { main: string; };
  abstract: string;
  web_url: string;
  pub_date: string;
  section_name: string;
}

const BASE_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

export const fetchNYTimesArticles: FetchNewsApiFn = async (query: string, date: string, category: string) => {
  
  const url = new URL(BASE_URL);

  const params = url.searchParams;
  params.append('q', query || '');
  params.append('api-key', process.env.NEXT_PUBLIC_REACT_APP_NYTIMES_API_KEY!);
  if (date) {
    // Format date as YYYYMMDD
    params.append('begin_date', date.replace(/-/g, ""));
  }
  if (category) {
    params.append('fq', `news_desk:("${category}")`);
  }

  try {
    const response = await fetch(url);

    const body = await response.json();

    return body.response.docs.map((item: NYTimesAPIItem) => {

      const image = item.multimedia;

      return {
        title: item.headline.main,
        description: item.abstract,
        url: item.web_url,
        // Use a default image if no image URL is available
        imageUrl: image?.default.url ? image.default.url : '/placeholder-image.png',
        altText: image?.caption,
        fullTitle: !item.abstract,
        publishedAt: item.pub_date,
        source: 'The New York Times',
        section: item.section_name
      } as Article;
    }
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {  

    if (error.response) {
      console.error(
        `Error fetching NY Times articles: ${error.response.status} - ${error.response.statusText}`
      );

    } else {
      console.error("Error fetching NY Times articles:", error.message);
    }
    
    return [];
  }
};
