import { FetchNewsApiFn } from "../model/apis";
import { Article } from "../model/feed";

type GuardianAPIAsset = {
  file: string;
  typeData: { altText?: string }
}

type GuardianAPIElement = {
  type: string;
  assets: GuardianAPIAsset[]
}

type GuardianAPIItem = {
  elements: GuardianAPIElement[];
  fields: { trailText: string; };
  webTitle: string;
  sectionName: string;
  webUrl: string;
  webPublicationDate: string;
}

const BASE_URL = "https://content.guardianapis.com/search";

export const fetchGuardianArticles: FetchNewsApiFn = async (query: string, date: string, category: string) => {
  
  const url = new URL(BASE_URL);

  const params = url.searchParams;
  params.append('q', query || '');
  params.append('api-key', process.env.NEXT_PUBLIC_REACT_APP_GUARDIAN_API_KEY!);
  if (date) {
    params.append('from-date', date);
  }
  if (category) {
    params.append('section', category);
  }
  params.append('showFields', 'headline,trailText');
  params.append('show-elements', 'image');

  try {
    const response = await fetch(
      url,
      {
        cache: "force-cache",
        method: 'GET'
      }
    );

    const body = await response.json();

    return body.response.results.map((item: GuardianAPIItem) => {      
      const imageElement = item.elements?.find(
        (element) => element.type === "image"
      );
      const image = imageElement?.assets?.length
        ? imageElement.assets[0] : null;

      const unavailable = !Boolean(item.fields?.trailText);

      return {
        title: item.webTitle,        
        description: item.fields?.trailText,
        section: item.sectionName,
        url: item.webUrl,
        // Use a default image if no image URL is available
        imageUrl: image ? image.file : '/placeholder-image.png',
        altText: image ? image.typeData.altText : '',
        publishedAt: item.webPublicationDate,
        source: "The Guardian",
        fullTitle: unavailable
      } as Article;
    });
    
  } catch (error) {

    console.error("Error fetching Guardian articles:", error);
    
    return [];
  }
};
