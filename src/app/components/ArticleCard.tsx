import React from "react";
import styles from "./articlecard.module.css";
import { Article } from "../model/feed";

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <div 
      className={styles['article-card']}
      role="listitem"
    >
      <img
        src={article.imageUrl}
        alt={article.altText ?? article.title}
        className={styles['article-image']}
        title={article.altText ?? article.title}
      />
      <h3
        className={!article.fullTitle ? styles['truncated'] : undefined}
      >{article.title}</h3>
      {article.description && <p>{article.description}</p>}
      <a href={article.url} target='_blank' rel='noopener noreferrer'>
        Read More
      </a>
      <p>Source: {article.source} {article.section && `- ${article.section}`}</p>
      <p>Published At: {new Date(article.publishedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ArticleCard;
