import { MoveRight } from "lucide-react";
import MovieCard from "./MovieCard";

const Popular = () => {
  return (
    <>
      <div className="max-w-[1440px] items-center mx-auto px-4 md:px-16 py-10">
        <div className="flex justify-between items-center">
          <h3 className=" text-2xl font-bold text-black mb-6">Popular</h3>
          <div className="flex items-center gap-2 cursor-pointer text-sm font-medium hover:text-gray-600 transition-colors">
            <span>See more</span>
            <MoveRight className="w-[9.33px] h-[9.33px]"></MoveRight>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-items-center">
          <MovieCard
            title="The Shawshank Redemption"
            rating={6.9}
            imageUrl="shawshank.png"
          ></MovieCard>
          {/* <MovieCard
            title="The Godfather"
            rating={6.9}
            imageUrl="father.png"
          ></MovieCard>
          <MovieCard
            title="The Dark Knight"
            rating={6.9}
            imageUrl="dark.png"
          ></MovieCard>
          <MovieCard
            title="12 Angry Men"
            rating={6.9}
            imageUrl="angry.png"
          ></MovieCard>
          <MovieCard
            title="The Lord of the Rings: The  Return of the King"
            rating={6.9}
            imageUrl="lord.png"
          ></MovieCard>
          <MovieCard
            title="Internstellar"
            rating={6.9}
            imageUrl="Internstellar.png"
          ></MovieCard>
          <MovieCard
            title="Se7en"
            rating={6.9}
            imageUrl="Se7en.png"
          ></MovieCard>
          <MovieCard
            title="It’s a Wonderful life"
            rating={6.9}
            imageUrl="wonderful.png"
          ></MovieCard>
          <MovieCard
            title="Seven samurai"
            rating={6.9}
            imageUrl="samurao.png"
          ></MovieCard>
          <MovieCard
            title="The Silence of the Lambs"
            rating={6.9}
            imageUrl="silence.png"
          ></MovieCard> */}
        </div>
      </div>
    </>
  );
};

export default Popular;
