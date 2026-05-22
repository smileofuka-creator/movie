import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardDescription } from "./card";
import Image from "next/image";
import { CardContent } from "./card";
import { PlayIcon, Star } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

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

  return (
    <Carousel className="w-full max-w-[1440px] mx-auto  relative group">
      <CarouselContent>
        {movies.map((movie, index: number) => (
          <CarouselItem key={movie.id} className="relative w-full">
            <div className="p-1">
              <Card className="relative overflow-hidden rounded-none border-none">
                <CardContent className="p-0 relative h-[450px] md:h-[580px] w-full  ">
                  <Image
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`}
                    fill
                    className="object-cover object-center"
                    alt="movie.name"
                  />

                  <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-8 md:px-16 max-w-[500px] text-white z-10 space-y-4">
                    <p className="text-sm md:text-base text-white font-medium">
                      Now Playing:
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-1">
                      {movie.title}
                    </h1>
                    <p className="flex gap-1 items-center p-0.5">
                      <Star fill="#FACC15" stroke="#FACC15" size={18} />
                      <span className="text-white font-semibold text-[16px]">
                        {movie.vote_average}
                      </span>
                      <span className="text-gray-300">/10</span>
                    </p>
                    <p className="text-xs md:text-sm text-white leading-relaxed font-normal line-clamp-4">
                      {movie.overview}
                    </p>
                    <button className="flex items-center justify-center gap-2 bg-white text-black font-semibold px-5 py-2.5 rounded-md text-sm w-fit hover:bg-gray-200 transition-colors mt-2 shadow-lg">
                      <PlayIcon fill="black" size={14} />
                      Watch Trailer
                    </button>
                  </div>
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                    <span className="w-2 h-2 rounded-full bg-white"></span>
                    <span className="w-2 h-2 rounded-full bg-white/40"></span>
                    <span className="w-2 h-2 rounded-full bg-white/40"></span>
                  </div>
                </CardContent>
                <CardDescription></CardDescription>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 
                   w-12 h-12 rounded-full bg-white text-black border-none shadow-md cursor-pointer
                   hover:bg-gray-100 transition-all"
      />
      <CarouselNext
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 
                   w-12 h-12 rounded-full bg-white text-black border-none shadow-md cursor-pointer
                   hover:bg-gray-100 transition-all"
      />
    </Carousel>
  );
};

export default CustomCarousel;
