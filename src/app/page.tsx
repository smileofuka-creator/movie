"use client";

import CustomCarousel from "@/components/ui/CustomCarousel";

import Footer from "@/components/ui/Footer";

import { GroupMovie } from "@/components/ui/GroupMovie";

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
      <CustomCarousel />
      <div>
        <GroupMovie title="upcoming"></GroupMovie>
        <GroupMovie title="top_rated"></GroupMovie>
        <GroupMovie title="popular"></GroupMovie>
        <Footer></Footer>
      </div>
    </div>
  );
}
