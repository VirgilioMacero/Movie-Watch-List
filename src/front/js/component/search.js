import React, { useState } from "react";
export const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const onChange = async (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&query=${encodeURIComponent(
          e.target.value
        )}&include_adult=false`
      );
      const data = await response.json();
      if (!data.errors) {
        setResults(data.results);
        setError(null);
      } else {
        setResults([]);
        setError("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error searching movies:", error);
      setResults([]);
      setError("An error occurred. Please try again.");
    }
  };
  return (
    <div className="w-100">
      <div className="add-content">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Search to Title here ..."
            value={query}
            onChange={onChange}
          />
        </div>
        {/* Render search results */}
        {error && <div className="error">{error}</div>}
        {results.length > 0 && (
          <ul className="results">
            {results.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};