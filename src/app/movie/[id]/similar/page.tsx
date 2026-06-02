"use client";
import { movieType } from "@/app/page";
import MovieCard from "@/components/ui/MovieCard";
import Navigation from "@/components/ui/Navigation";
import Footer from "@/components/ui/Footer";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SimilarMoviesPage() {
  const params = useParams();
  const [movies, setMovies] = useState<movieType[]>([]);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/similar`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWZiMDk4OGVhMWE0YWNhYjMyNTMxNjlhYzVkZmZlOSIsIm5iZiI6MTc3OTI3OTU4My4xMDYsInN1YiI6IjZhMGRhNmRmZDNjOTM0OWQxNTBlMjFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.huU2C0p6q7knEvDewSVpmN90dBFf7XPqtvjk1dy_GPg",
        },
      })
      .then((res) => setMovies(res.data.results));
  }, [params.id]);

  return (
    <div className="flex flex-col gap-10 px-10 py-8">
      <Navigation />
      <div className="mx-auto w-full max-w-[1080px]">
        <h1 className="text-2xl font-bold mb-6">More like this</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
