import { MoveRight } from "lucide-react";
import MovieCard from "./MovieCard";
interface UpcomingProps {
  movies: any[];
}
const Upcoming = ({ movies = [] }: UpcomingProps) => {
  return (
    <>
      <div className="max-w-[1440px] items-center mx-auto px-4 md:px-16 py-10">
        <div className="w-full flex justify-between items-center">
          <h3 className=" text-2xl font-bold text-black mb-6">Upcoming</h3>
          <div className="flex items-center gap-2 cursor-pointer text-sm font-medium hover:text-gray-600 transition-colors">
            <span>See more</span>
            <MoveRight className="w-[9.33px] h-[9.33px]"></MoveRight>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
          {movies.length > 0 &&
            movies.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.name}
                rating={movie.vote_average}
                imageUrl={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Upcoming;
