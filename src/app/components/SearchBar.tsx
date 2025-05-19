'use client';

import React, { useState } from "react";
import styles from "./searchbar.module.css";
import { OnSearchFn } from "../model/feed";
import Form from 'next/form'

const categories = [
  "General",
  "Business",
  "Entertainment",
  "Health",
  "Science",
  "Sports",
  "Technology",
];

const SearchBar = ({ onSearch }: { onSearch: OnSearchFn }) => {
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");

  const handleSearch = () => {
    onSearch({ query, date, category, source });
  };  

  return (
    <Form className={styles['search-bar']} action={handleSearch}>
      <input
        type='text'
        placeholder='Search...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input
        type='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value=''>All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <select value={source} onChange={(e) => setSource(e.target.value)}>
        <option value=''>All Sources</option>
        <option value='newsapi'>GNewsAPI</option>
        <option value='guardian'>The Guardian</option>
        <option value='nytimes'>The New York Times</option>
      </select>
      <button type="submit">Search</button>
    </Form>
  );
};

export default SearchBar;
