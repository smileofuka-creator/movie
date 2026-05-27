"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import type { movieType } from "../page";
import MovieCard from "@/components/ui/MovieCard";
import Router, { useParams } from "next/navigation";
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

const Upcoming = () => {
  const params = useParams();

  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<movieType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
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
        console.log(response.data.results);
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, params.category]);

  if (isLoading) {
    return (
      <div className="w-full flex items-center flex-col gap-4">
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-4">
          <Skeleton className="w-[120px] h-[32px] rounded-md" />
        </div>

        {/* Movie cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center w-full">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-2">
              <Skeleton className="w-[230px] h-[320px] rounded-xl" />
              <Skeleton className="w-[180px] h-[20px] rounded-md" />
              <Skeleton className="w-[100px] h-[16px] rounded-md" />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-[40px] h-[40px] rounded-md" />
          ))}
        </div>
      </div>

      // <div className="w-full flex items-center flex-col gap-4">
      //   <div className="w-full flex justify-between items-center mb-4">
      //     <Skeleton className="w-[40px]" />
      //   </div>
      //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
      //     {Array.from({ length: 20 }).map((_, index) => {
      //       return (
      //         <Skeleton
      //           key={index + Math.random()}
      //           className="w-[230px] h-[400px]"
      //         />
      //       );
      //     })}
      //   </div>
      // </div>
    );
  }
  return (
    <div className="w-full">
      <Navigation></Navigation>
      <div className="w-full flex justify-between items-center mb-4">
        <h3 className=" text-2xl font-bold text-black     ">
          {params.category}
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
        {movies?.map((movie) => {
          return <MovieCard movie={movie} key={movie.id} />;
        })}
      </div>
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => setPage(page - 1)}
                href="#"
                isActive
              >
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setPage(page)} href="#">
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink onClick={() => setPage(page + 1)} href="#">
                {page}
              </PaginationLink>
            </PaginationItem>

            {/* {Array.from({ length: movies?.total_pages }).map((_, index) => {
                          return (
                            <PaginationItem key={index + Math.random()}>
                              <PaginationLink
                                onClick={() => setPage(index + 1)}
                                href="#"
                                isActive={page === index + 1}
                              >
                                {index + 1}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })} */}

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                onClick={() => setPage(movies?.total_pages)}
                href="#"
              >
                {movies?.total_pages}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={nextPage} href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
export default Upcoming;

// <PaginationLink
//               onClick={() => setPage(1)}
//               href="#"
//               isActive={page === 1}
//             >
//               1
//             </PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink
//               onClick={() => setPage(2)}
//               href="#"
//               isActive={page === 2}
//             >
//               2
//             </PaginationLink>
//           </PaginationItem>
//           <PaginationItem>
//             <PaginationLink
//               onClick={() => setPage(3)}
//               href="#"
//               isActive={page === 3}
//             >
//               3
//             </PaginationLink>
