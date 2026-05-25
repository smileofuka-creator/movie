"use client";
import { GroupMovie } from "@/components/ui/GroupMovie";
import Footer from "@/components/ui/Footer";
import { Star } from "lucide-react";

import Image from "next/image";
import { CirclePlay } from "lucide-react";

import { useParams } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

const Demo = () => {
  const params = useParams();
  console.log(params, "params");

  const [movie, setMovie] = useState<movieType[]>();
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
        setMovie(response.data.results);
      });
  }, [params.id]);
  console.log(movie);

  return (
    <div className="flex flex-col gap-10 px-10 py-8 ">
      {/* title heseg */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[#09090B] text-[32px] font-bold">Wicked</h2>
          <h5 className="text-[#71717A] text-[18px]">
            2024.11.26 · PG · 2h 40m
          </h5>
        </div>

        <div className="flex flex-col items-start">
          <p className="text-sm text-gray-500">Rating</p>
          <div className="flex items-center gap-2">
            <Star fill="#FACC15" stroke="#FACC15" size={18} />
            <div className="flex flex-col">
              <div>
                <span className="text-black font-semibold text-[16px]">
                  6.9
                </span>
                <span className="text-gray-500">/10</span>
              </div>
              <p className="text-[#71717A] text-sm">37k</p>
            </div>
          </div>
        </div>
      </div>
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
              transition
            "
          >
            <CirclePlay fill="black" size={18} />
          </button>
        </div>
      </div>
      {/* category */}
      <div></div>
      {/* description */}
      <p>
        Elphaba, a misunderstood young woman because of her green skin, and
        Glinda, a popular girl, become friends at Shiz University in the Land of
        Oz. After an encounter with the Wonderful Wizard of Oz, their friendship
        reaches a crossroads.{" "}
      </p>

      <Footer></Footer>
    </div>
  );
};

export default Demo;
