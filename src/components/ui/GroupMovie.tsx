"use client";
import { movieType } from "@/app/page";
import MovieCard from "@/components/ui/MovieCard";
import axios from "axios";
import { MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const GroupMovie = ({
  title,
  nameTitle,
}: {
  nameTitle: string;
  title: string;
}) => {
  const router = useRouter();
  const [movies, setMovies] = useState<movieType[]>([]);

  const pushToSeeMorePage = () => {
    router.push(`/${title}`);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${title}?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      )
      .then((response) => {
        setMovies(response.data.results.slice(0, 10));
      });
  }, [title]);

  return (
    <div className="w-full flex flex-col gap-4 mb-8">
      {" "}
      <div className="w-full flex justify-between items-center">
        <h3 className="w-[150px] h-[28px] text-2xl font-bold dark:text-white">
          {nameTitle}
        </h3>
        <button
          onClick={pushToSeeMorePage}
          className="flex items-center gap-2 cursor-pointer text-sm font-medium text-indigo-500 hover:text-indigo-700 transition-colors"
        >
          <span>See more</span>
          <MoveRight className="w-4 h-4" />
        </button>
      </div>
      <div className="flex gap-4 overflow-hidden">
        {" "}
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-[200px]">
            {" "}
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};
