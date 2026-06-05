"use client";

import Footer from "@/components/ui/Footer";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
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

const genresList = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const GenreContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
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

        setTotalPages(Math.min(response.data.total_pages, 500));
      } catch (error) {
        console.log(error);
      }
    };

    getGenres();
  }, [genreId, currentPage]);

  const handleGenreChange = (id: string, name: string) => {
    setCurrentPage(1);
    router.push(`/genre?id=${id}&name=${name}`);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Navigation />
      {/* zuun tal */}
      <div className="flex-1 max-w-[1280px] mx-auto w-full px-6 py-10 flex gap-10">
        <div className="w-[280px] shrink-0">
          <h3 className="text-xl font-bold mb-4">Search filter</h3>
          <p className="text-sm font-semibold mb-3 text-gray-700">Genres</p>

          <div className="flex flex-wrap gap-2">
            {genresList.map((genre) => {
              const isActive = String(genreId) === String(genre.id);
              return (
                <button
                  key={genre.id}
                  onClick={() =>
                    handleGenreChange(String(genre.id), genre.name)
                  }
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                    isActive
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {genre.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* //Baruun tal */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6">
            {genreName ? `${genreName} Movies` : "Select a genre"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>

          {movies.length > 0 && (
            <div className="my-8 flex justify-center">
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

                  {currentPage < totalPages - 1 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  {currentPage < totalPages && (
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
                  )}

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
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <GenreContent />
    </Suspense>
  );
};
export default Page;
