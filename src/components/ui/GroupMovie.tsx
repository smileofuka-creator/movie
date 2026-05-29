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
    router.push("/upcoming");
  };
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${title}?language=en-US&page=1`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWZiMDk4OGVhMWE0YWNhYjMyNTMxNjlhYzVkZmZlOSIsIm5iZiI6MTc3OTI3OTU4My4xMDYsInN1YiI6IjZhMGRhNmRmZDNjOTM0OWQxNTBlMjFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.huU2C0p6q7knEvDewSVpmN90dBFf7XPqtvjk1dy_GPg",
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results);
      });
  }, [title]);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className=" text-2xl font-bold text-black     ">{nameTitle}</h3>
        <button className="flex items-center gap-2 cursor-pointer text-sm font-medium hover:text-gray-600 transition-colors">
          <span>See more</span>
          <MoveRight className="w-[9.33px] h-[9.33px]"></MoveRight>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
        {movies.map((movie) => {
          return <MovieCard movie={movie} key={movie.id} />;
        })}
      </div>
    </div>
  );
};
