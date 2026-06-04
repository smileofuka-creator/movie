"use client";

import Footer from "@/components/ui/Footer";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navigation from "@/components/ui/Navigation";
import MovieCard from "@/components/ui/MovieCard";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Page = () => {
  const searchParams = useSearchParams();
  const genreId = searchParams.get("id");
  const genreName = searchParams.get("name");

  const [movies, setMovies] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!genreId) return;

    const getGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreId}&page=${currentPage}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWZiMDk4OGVhMWE0YWNhYjMyNTMxNjlhYzVkZmZlOSIsIm5iZiI6MTc3OTI3OTU4My4xMDYsInN1YiI6IjZhMGRhNmRmZDNjOTM0OWQxNTBlMjFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.huU2C0p6q7knEvDewSVpmN90dBFf7XPqtvjk1dy_GPg",
            },
          },
        );
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.log(error);
      }
    };

    getGenres();
  }, [genreId, currentPage]);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      <Navigation />
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">{genreName ?? "Genre"}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies?.slice(0, 10).map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                prevPage();
              }}
            />
          </PaginationItem>

          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(currentPage - 1);
                }}
              >
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink href="#" isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(currentPage + 1);
                }}
              >
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(totalPages);
              }}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                nextPage();
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Footer />
    </div>
  );
};

export default Page;
