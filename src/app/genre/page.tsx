"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const genreId = searchParams.get("id");
  const [movies, setMovies] = useState<any[]>([]);
  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreId}&page=1`,

          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWZiMDk4OGVhMWE0YWNhYjMyNTMxNjlhYzVkZmZlOSIsIm5iZiI6MTc3OTI3OTU4My4xMDYsInN1YiI6IjZhMGRhNmRmZDNjOTM0OWQxNTBlMjFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.huU2C0p6q7knEvDewSVpmN90dBFf7XPqtvjk1dy_GPg",
            },
          },
        );

        setMovies(response.data.results);
        console.log("response.data", response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGenres();
  }, []);

  return (
    <div>
      page
      {movies?.map((movie) => (
        <p>{movie.title}</p>
      ))}
    </div>
  );
};

export default page;
