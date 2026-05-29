import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "./card";
import Image from "next/image";
import { CardContent } from "./card";
import { Play, Star } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ReactPlayer from "react-player";

interface nowMovie {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  original_language: string;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_count: number;
  popularity: number;
  backdrop_path: string;
}

const CustomCarousel = () => {
  const [movies, setMovies] = useState<nowMovie[]>([]);
  const [watchkeys, setWatchkeys] = useState<Record<number, string>>({});

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
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
  }, []);

  const handleOnClick = (movieId: number) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWZiMDk4OGVhMWE0YWNhYjMyNTMxNjlhYzVkZmZlOSIsIm5iZiI6MTc3OTI3OTU4My4xMDYsInN1YiI6IjZhMGRhNmRmZDNjOTM0OWQxNTBlMjFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.huU2C0p6q7knEvDewSVpmN90dBFf7XPqtvjk1dy_GPg",
          },
        },
      )
      .then((response) => {
        const trailer = response.data.results.find(
          (v: { type: string; key: string }) => v.type === "Trailer",
        );
        setWatchkeys((prev) => ({
          ...prev,
          [movieId]: trailer?.key || "",
        }));
      });
  };

  return (
    <Carousel className="w-full mx-auto relative group">
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem key={movie.id} className="relative w-full">
            <Card className="relative overflow-hidden rounded-none border-none">
              <CardContent className="p-0 relative h-[450px] md:h-[580px] w-full">
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
                  fill
                  className="object-cover object-center"
                  alt={movie.title}
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent z-[1]" />

                {/* Текст хэсэг */}
                <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-8 md:px-16 w-[90%] sm:w-[60%] md:max-w-[500px] text-white z-10 space-y-4">
                  <p className="text-sm md:text-base font-medium">
                    Now Playing:
                  </p>
                  <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                    {movie.title}
                  </h1>
                  <p className="flex gap-1 items-center">
                    <Star fill="#FACC15" stroke="#FACC15" size={18} />
                    <span className="font-semibold text-[16px]">
                      {movie.vote_average}
                    </span>
                    <span className="text-gray-300">/10</span>
                  </p>
                  <p className="text-xs md:text-sm leading-relaxed line-clamp-3">
                    {movie.overview}
                  </p>
                  {/* <button
                    onClick={() => handleOnClick(movie.id)}
                    className="flex items-center gap-2 bg-white text-black font-semibold px-5 py-2.5 rounded-md text-sm hover:bg-gray-200 transition w-fit"
                  >
                    <Play fill="black" size={18} />
                    Watch Trailer
                  </button> */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <DialogTitle>
                        <button
                          onClick={() => handleOnClick(movie.id)}
                          className="flex items-center gap-2 bg-white text-black font-semibold px-5 py-2.5 rounded-md text-sm hover:bg-gray-200 transition w-fit"
                        >
                          <Play fill="black" size={18} />
                          Watch Trailer
                        </button>
                      </DialogTitle>
                    </DialogTrigger>

                    <DialogContent className="max-w-4xl p-0 overflow-hidden">
                      <ReactPlayer
                        src={`https://www.youtube.com/watch?v=${watchkeys[movie.id]}`}
                        width="100%"
                        height="500px"
                        controls
                      />
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Dots
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  <span className="w-2 h-2 rounded-full bg-white" />
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                </div> */}
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white text-black border-none shadow-md cursor-pointer hover:bg-gray-100 transition-all" />
      <CarouselNext className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white text-black border-none shadow-md cursor-pointer hover:bg-gray-100 transition-all" />
    </Carousel>
  );
};

export default CustomCarousel;
