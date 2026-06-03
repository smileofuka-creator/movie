"use client";

import CustomCarousel from "@/components/ui/CustomCarousel";
import Footer from "@/components/ui/Footer";
import { GroupMovie } from "@/components/ui/GroupMovie";
import Navigation from "@/components/ui/Navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

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

const GroupMovieSkeleton = () => (
  <div className="w-full flex flex-col gap-4 mb-8">
    {/* Title */}
    <Skeleton className="w-[150px] h-[28px] rounded-md" />
    {/* Movie cardin heseg */}
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2 flex-shrink-0">
          <Skeleton className="w-[200px] h-[300px] rounded-xl" />
          <Skeleton className="w-[160px] h-[20px] rounded-md" />
          <Skeleton className="w-[100px] h-[16px] rounded-md" />
        </div>
      ))}
    </div>
  </div>
);

const CarouselSkeleton = () => (
  <Skeleton className="w-full h-[500px] rounded-2xl mb-8" />
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-6 py-8">
        {isLoading ? (
          <div className="flex flex-col gap-8">
            <CarouselSkeleton />
            <GroupMovieSkeleton />
            <GroupMovieSkeleton />
            <GroupMovieSkeleton />
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <CustomCarousel />
            <GroupMovie title="upcoming" nameTitle="Upcoming" />
            <GroupMovie title="top_rated" nameTitle="Top rated" />
            <GroupMovie title="popular" nameTitle="Popular" />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
