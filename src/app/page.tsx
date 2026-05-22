"use client";

import CustomCarousel from "@/components/ui/CustomCarousel";

import Footer from "@/components/ui/Footer";

import { GroupMovie } from "@/components/ui/GroupMovie";
import { Film, Moon, Search } from "lucide-react";

export interface movieType {
  title: string;
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: [string];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  softcore: boolean;
  vote_average: number;
  vote_count: number;
}

export default function Home() {
  return (
    <div className="flex justify-center flex-col items-center">
      <nav className="bg-[#FFFFFF] w-full bg-white flex justify-center">
        <div className="w-full max-w-[1280px] h-[60px] px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-[#4338CA] p-2 rounded-md">
              <Film className="bg-white w-5 h-5" />
            </div>

            <span className="text-[#4338CA] italic font-bold text-[16px]">
              Movie Z
            </span>
          </div>

          <div className="w-[480px] h-[36px] gap-3 flex items-center">
            <button className="border px-4 py-2 rounded-md text-sm hover:bg-gray-100">
              Genre
            </button>

            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search..."
                className="w-[300px] border rounded-md py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <button className="border p-2 rounded-md hover:bg-gray-100">
            <Moon className="w-5 h-5" />
          </button>
        </div>
      </nav>
      <CustomCarousel />
      <div className="gap-13">
        <GroupMovie title="upcoming" nameTitle="Upcoming"></GroupMovie>
        <GroupMovie title="top_rated" nameTitle="Top rated"></GroupMovie>
        <GroupMovie title="popular" nameTitle="Popular"></GroupMovie>
        <Footer></Footer>
      </div>
    </div>
  );
}
