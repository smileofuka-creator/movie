"use client";
import { GroupMovie } from "@/components/ui/GroupMovie";
import Footer from "@/components/ui/Footer";
import Image from "next/image";
import { Star, CirclePlay } from "lucide-react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: any[];
  production_countries: any[];
  release_date: string;
  revenue: number;
  runtime: number;
  softcore: boolean;
  spoken_languages: any[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const Demo = () => {
  const params = useParams();
  console.log(params, "params");

  const [movie, setMovie] = useState<any>();
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWZiMDk4OGVhMWE0YWNhYjMyNTMxNjlhYzVkZmZlOSIsIm5iZiI6MTc3OTI3OTU4My4xMDYsInN1YiI6IjZhMGRhNmRmZDNjOTM0OWQxNTBlMjFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.huU2C0p6q7knEvDewSVpmN90dBFf7XPqtvjk1dy_GPg",
        },
      })
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
      });
  }, [params.id]);
  console.log(movie);

  return (
    <div className="flex flex-col gap-10 px-10 py-8">
      {/* 2 zurag */}
      <div className="flex w-full  gap-6">
        {/* <Image src="/witchsmall.png" alt="small" width={290} height={428} /> */}
        <div className="">
          {/* <Image src="/witchMedium.png" alt="medium" width={760} height={428} /> */}
          <button
            className="
              absolute
              bottom-5
              left-5
              flex
              items-center
              gap-2
              bg-white
              text-black
              font-semibold
              px-5
              py-2.5
              rounded-md
              text-sm
              hover:bg-gray-200
              transition"
          >
            <CirclePlay fill="black" size={18} />
          </button>
        </div>
      </div>

      {/* genre heseg */}

      <div className="flex gap-2">
        {movie?.genres.map((genre) => {
          console.log(genre, "genre");
          return (
            <p key={genre.id} className="border px-2 py-1 rounded text-sm">
              {genre.name}
            </p>
          );
        })}
      </div>
      {/* title heseg */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[#09090B] text-[32px] font-bold">
            {movie?.original_title}
          </h2>
          <h5 className="text-[#71717A] text-[18px]">
            {movie?.release_date} · {movie?.genres[0]?.name} · {movie?.runtime}{" "}
            min
          </h5>
        </div>

        <div className="flex flex-col items-start">
          <p className="text-sm text-gray-500">Rating</p>
          <div className="flex items-center gap-2">
            <Star fill="#FACC15" stroke="#FACC15" size={18} />
            <div className="flex flex-col">
              <div>
                <span className="text-black font-semibold text-[16px]">
                  {movie?.vote_average}
                </span>
                <span className="text-gray-500">/10</span>
              </div>
              <p className="text-[#71717A] text-sm">
                {movie?.vote_count?.toLocaleString()} votes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* category */}
      <div></div>
      {/* description */}
      <p>{movie?.overview}</p>

      <Footer></Footer>
    </div>
  );
};

export default Demo;
