"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import type { movieType } from "../page";
import MovieCard from "@/components/ui/MovieCard";
import { useParams } from "next/navigation";
import Navigation from "@/components/ui/Navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import Footer from "@/components/ui/Footer";

const Upcoming = () => {
  const params = useParams();

  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<movieType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const nextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.category}?language=en-US&page=${page}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWZiMDk4OGVhMWE0YWNhYjMyNTMxNjlhYzVkZmZlOSIsIm5iZiI6MTc3OTI3OTU4My4xMDYsInN1YiI6IjZhMGRhNmRmZDNjOTM0OWQxNTBlMjFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.huU2C0p6q7knEvDewSVpmN90dBFf7XPqtvjk1dy_GPg",
          },
        },
      )
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, params.category]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-10 px-10 py-8">
        <div className="mx-auto w-full max-w-[1080px]">
          <Skeleton className="w-[200px] h-[32px] rounded-md mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array.from({ length: 20 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <Skeleton className="w-full h-[280px] rounded-xl" />
                <Skeleton className="w-[80%] h-[20px] rounded-md" />
                <Skeleton className="w-[50%] h-[16px] rounded-md" />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="w-[40px] h-[40px] rounded-md" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 px-10 py-8">
      <Navigation />
      <div className="mx-auto w-full max-w-[1080px]">
        <h1 className="text-2xl font-bold mb-6">{params.category}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                {page > 1 && (
                  <PaginationLink onClick={() => setPage(page - 1)} href="#">
                    {page - 1}
                  </PaginationLink>
                )}
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => setPage(page)} href="#" isActive>
                  {page}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => setPage(page + 1)} href="#">
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => setPage(totalPages)} href="#">
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={nextPage} href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Upcoming;
