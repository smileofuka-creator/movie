import { MoveRight } from "lucide-react";
import MovieCard from "./MovieCard";

const TopRated = () => {
  return (
    <>
      <div className="max-w-[1440px] items-center mx-auto px-4 md:px-16 py-10">
        <div className="flex justify-between items-center">
          <h3 className=" text-2xl font-bold text-black mb-6">Top Rated </h3>
          <div className="flex items-center gap-2  text-sm font-medium hover:text-gray-600 transition-colors">
            <span>See more</span>
            <MoveRight className="w-[9.33px] h-[9.33px]"></MoveRight>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
          <MovieCard
            title="Pulp Fiction"
            rating={6.9}
            imageUrl="pulp.png"
            className="hover:bg-gray-100 transition-all cursor-pointer"
          ></MovieCard>
          {/* <MovieCard
            title="The Lord of the Rings: Fellowship of the Kings"
            rating={6.9}
            imageUrl="rings.png"
          ></MovieCard>
          <MovieCard
            title="The Good, the Bad and the Ugly"
            rating={6.9}
            imageUrl="goodbad.png"
          ></MovieCard>
          <MovieCard
            title="Forrest Gump"
            rating={6.9}
            imageUrl="forest.png"
          ></MovieCard>
          <MovieCard
            title="Fight Club"
            rating={6.9}
            imageUrl="fight.png"
          ></MovieCard>
          <MovieCard
            title="Saving Private Ryan"
            rating={6.9}
            imageUrl="ryan.png"
          ></MovieCard>
          <MovieCard
            title="City of God"
            rating={6.9}
            imageUrl="cityofgod.png"
          ></MovieCard>
          <MovieCard
            title="The Green Mile"
            rating={6.9}
            imageUrl="greenmile.png"
          ></MovieCard>
          <MovieCard
            title="Life is Beautiful"
            rating={6.9}
            imageUrl="lifeis.png"
          ></MovieCard>
          <MovieCard
            title="Terminator 2: Judgement Day"
            rating={6.9}
            imageUrl="terminator2.png"
          ></MovieCard> */}
        </div>
      </div>
    </>
  );
};

export default TopRated;
