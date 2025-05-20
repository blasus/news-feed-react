'use client';

import { useEffect, useState } from "react";
import { Article, Filter } from "./model/feed";
import SearchBar from "./components/SearchBar";
import ArticleCard from "./components/ArticleCard";
import { fetchGuardianArticles } from "./services/guardianService";
import { fetchNewsAPIArticles } from "./services/newsAPIService";
import { fetchNYTimesArticles } from "./services/nyTimesService";
import Loader from "./components/Loader";

export default function Home() {

  const [newsAPIArticles, setNewsAPIArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [filters, setFilters] = useState<Filter>({
    query: "",
    date: "",
    category: "",
    source: "",
  });

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);

      try {

        let newsArticles: Article[] = [];

        if (filters.source === "newsapi") {
          // Fetch only CNN Articles
          newsArticles = await fetchNewsAPIArticles(
            filters.query,
            filters.date,
            filters.category
          );

        } else if (filters.source === "guardian") {
          // Fetch only Guardian Articles
          newsArticles = await fetchGuardianArticles(
            filters.query,
            filters.date,
            filters.category
          );

        } else if (filters.source === "nytimes") {
          // Fetch only NY Times Articles
          newsArticles = await fetchNYTimesArticles(
            filters.query,
            filters.date,
            filters.category
          );

        } else {
          // Fetch articles from all sources for the initial load
          const cnnArticles = await fetchNewsAPIArticles(filters.query, filters.date, filters.category);
          const guardianArticles = await fetchGuardianArticles(filters.query, filters.date, filters.category);
          const nyTimesArticles = await fetchNYTimesArticles(filters.query, filters.date, filters.category);

          newsArticles = [
            ...cnnArticles,
            ...guardianArticles,
            ...nyTimesArticles
          ]
            .sort(
              (a, b) => 
                new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
            );
        }

        setNewsAPIArticles(newsArticles);

      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles(); // Fetch articles on component mount and whenever filters change
  }, [filters]);
  

  const handleSearch = (searchParams: Filter) => {
    setFilters(searchParams);
  };

  return (
    <main className="home">
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <Loader />
      ) : (
        <section className="article-sections">
          <h2>Top Articles</h2>
          <div 
            className="article-list"
            role="list"
          >
            {newsAPIArticles.length > 0 ? (
              newsAPIArticles.map((article, index) => (
                <ArticleCard key={index} article={article} />
              ))
            ) : (
              <p>No articles found</p>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
