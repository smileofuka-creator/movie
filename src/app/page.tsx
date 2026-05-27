"use client";

import CustomCarousel from "@/components/ui/CustomCarousel";

import Footer from "@/components/ui/Footer";

import { GroupMovie } from "@/components/ui/GroupMovie";
import Navigation from "@/components/ui/Navigation";

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
      <Navigation></Navigation>
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
