//Created this page for result of search bar in header
//returns searched books
import React from "react";
import { useLocation } from "react-router-dom";
import BookCard from "../components/BookCard";
import "../components/ProductCard.css";

// Import books and manga lists
import { booksList as booksData } from "./Books";
import { mangaList as mangaData } from './Manga';

const Result = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q")?.toLowerCase() || "";

  // Combine all books and manga into a single list
  const combinedList = [...booksData, ...mangaData];

  // Filter the combined list based on the search query
  const filteredResults = combinedList.filter((item) =>
    item.title.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="books-container">
      {filteredResults.length > 0 ? (
        filteredResults.map((item) => (
          <BookCard key={`${item.id}-${item.title}`} book={item} />
        ))
      ) : (
        <p style={{ padding: "20px", fontSize: "18px" }}>
          No results found for "<strong>{searchQuery}</strong>"
        </p>
      )}
    </div>
  );
};

export default Result;
