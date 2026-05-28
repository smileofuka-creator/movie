"use client";

import Footer from "@/components/ui/Footer";
import Image from "next/image";

import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Play, MoveRight, Star } from "lucide-react";
import Navigation from "@/components/ui/Navigation";
import Description from "../components/Description";
import { MoreMovie } from "../components/MoreMovies";
import ReactPlayer from "react-player";

interface Genre {
  id: number;
  name: string;
}

interface MovieDetial {
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

  const [movie, setMovie] = useState<MovieDetial>();
  const [watchkey, setWatchkey] = useState("");
  const [IsTrailerShowed, setIsTrailerShowed] = useState(false);

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}?language=en-US`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWZiMDk4OGVhMWE0YWNhYjMyNTMxNjlhYzVkZmZlOSIsIm5iZiI6MTc3OTI3OTU4My4xMDYsInN1YiI6IjZhMGRhNmRmZDNjOTM0OWQxNTBlMjFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.huU2C0p6q7knEvDewSVpmN90dBFf7XPqtvjk1dy_GPg",
        },
      })
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
      });

    axios
      .get(
        `https://api.themoviedb.org/3//movie/${params.id}/videos?language=en-US`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWZiMDk4OGVhMWE0YWNhYjMyNTMxNjlhYzVkZmZlOSIsIm5iZiI6MTc3OTI3OTU4My4xMDYsInN1YiI6IjZhMGRhNmRmZDNjOTM0OWQxNTBlMjFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.huU2C0p6q7knEvDewSVpmN90dBFf7XPqtvjk1dy_GPg",
          },
        },
      )
      .then((response) => {
        console.log(response, "data");
        setWatchkey(response.data.results[1].key);
      });
  }, [params.id]);
  console.log(movie);

  const handleOnClick = () => setIsTrailerShowed(!IsTrailerShowed);

  return (
    <div className="flex flex-col gap-10 px-10 py-8">
      <Navigation></Navigation>
      <div className="mx-auto w-full max-w-[1080px]">
        {/* title section */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-[#09090B] text-[32px] font-bold">
              {movie?.original_title}
            </h2>
            <h5 className="text-[#71717A] text-[18px]">
              {movie?.release_date} · {movie?.genres?.[0]?.name} ·{" "}
              {movie?.runtime} min
            </h5>
          </div>

          <div className="flex flex-col items-start">
            <p className="text-sm text-black">Rating</p>
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

        {/* 2 images */}
        <div className="mt-6 flex w-full gap-6">
          <Image
            src={`https://image.tmdb.org/t/p/w300/${movie?.poster_path}`}
            width={290}
            height={428}
            className="rounded-md object-cover"
            alt={movie?.title || "movie.image"}
          />

          <div className="relative w-[760px] h-[428px]">
            {IsTrailerShowed ? (
              <ReactPlayer
                src={`https://www.youtube.com/watch?v=${watchkey}`}
                width={760}
                height={428}
                volume={1}
              />
            ) : (
              <Image
                src={`https://image.tmdb.org/t/p/w300/${movie?.backdrop_path}`}
                width={760}
                height={428}
                alt={movie?.title || "movie.image"}
              />
            )}

            {!IsTrailerShowed && (
              <button
                onClick={handleOnClick}
                className="absolute bottom-5 left-5 flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                <Play />
                Play trailer
              </button>
            )}
          </div>
        </div>

        {/* genres */}
        <div className="mt-6 flex flex-wrap gap-2 rounded-full">
          {movie?.genres?.map((genre) => (
            <p key={genre.id} className="rounded border px-2 py-1 text-sm">
              {genre.name}
            </p>
          ))}
        </div>

        <Description movie={movie} movieId={params.id} />

        {/* description  heseg */}

        {/* <div className="mt-6 flex flex-col gap-8">
          <p>{movie?.overview}</p>

          <div className="flex flex-col gap-4">
            <div className="flex gap-[53px]">
              <h3 className="w-20 text-[16px] font-bold">Director</h3>
              <p>Jon M. Chu</p>
              https://api.themoviedb.org/3/movie/${params.id}
              credits?language=en-US
            </div>
            <div className="border-b" />

            <div className="flex gap-[53px]">
              <h3 className="w-20 text-[16px] font-bold">Writers</h3>
              <p>—</p>
            </div>
            <div className="border-b" />

            <div className="flex gap-[53px]">
              <h3 className="w-20 text-[16px] font-bold">Stars</h3>
              <p>—</p>
            </div>
            <div className="border-b" />
          </div>
        </div> */}

        {/* More movies */}
        <MoreMovie title="similar" nameTitle="More Movies" />

        {/* <div className="w-full flex justify-between items-center mb-4">
          <h3 className=" text-2xl font-bold text-black ">More</h3>
          <button className="flex items-center gap-2 cursor-pointer text-sm font-medium hover:text-gray-600 transition-colors">
            <span>See more</span>
            <MoveRight className="w-[9.33px] h-[9.33px]"></MoveRight>
          </button>
        </div> */}
      </div>

      <Footer />
    </div>
  );
};

export default Demo;
