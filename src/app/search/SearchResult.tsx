"use client";
import { movieType } from "@/app/page";
import MovieCard from "@/components/ui/MovieCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const BEARER =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWZiMDk4OGVhMWE0YWNhYjMyNTMxNjlhYzVkZmZlOSIsIm5iZiI6MTc3OTI3OTU4My4xMDYsInN1YiI6IjZhMGRhNmRmZDNjOTM0OWQxNTBlMjFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.huU2C0p6q7knEvDewSVpmN90dBFf7XPqtvjk1dy_GPg"; // токеноо хэвээр үлдээ

export const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("movie");

  const [movies, setMovies] = useState<movieType[]>([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    setNotFound(false);

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1
                `,
        {
          headers: { Authorization: BEARER },
        },
      )
      .then((response) => {
        const results = response.data.results;
        setMovies(results);
        setNotFound(results.length === 0);
      })
      .finally(() => setLoading(false));
  }, [query]);

  if (!query) return <p>seaching...</p>;
  if (loading) return <p>loading...</p>;
  if (notFound) return <p>"{query}" not found</p>;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};
