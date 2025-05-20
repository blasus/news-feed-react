import { Article } from "./feed";

export type FetchNewsApiFn = (query: string, date: string, category: string) => Promise<Article[]>;