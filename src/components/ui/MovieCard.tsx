import Image from "next/image";
import { Card, CardContent } from "./card";
import { Star } from "lucide-react";
import type { movieType } from "@/app/page";

const MovieCard = ({ movie }: { movie: movieType }) => {
  return (
    <Card className="w-[230px] bg-[#F4F4F5] overflow-hidden ">
      <div className="relative w-full h-[340px] overflow-hidden">
        <Image
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt={movie.title || movie.name}
          fill
          sizes="230px"
          className="object-cover transition-all duration-300 hover:opacity-90 
        "
        />
      </div>
      <CardContent>
        <p className="flex gap-1 items-center p-0.5">
          <Star fill="#FACC15" stroke="#FACC15" size={16} />
          <span className="text-black font-semibold text-[16px]">
            {movie.vote_average}
          </span>
          <span className="text-gray-500">/10</span>
        </p>
        <p
          className="text-[#09090B] text-[18px]
"
        >
          {movie.title || movie.name}
        </p>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
