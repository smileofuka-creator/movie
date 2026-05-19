import { MoveRight } from "lucide-react";
import MovieCard from "./MovieCard";

const Upcoming = () => {
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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
          <MovieCard
            title="Dear Santa"
            rating={6.9}
            imageUrl="Movie1.png"
          ></MovieCard>
          <MovieCard
            title="How To Train Your Dragon Live Action"
            rating={6.9}
            imageUrl="dragon.png"
          ></MovieCard>
          <MovieCard
            title="Alien Romulus"
            rating={6.9}
            imageUrl="alien.png"
          ></MovieCard>
          <MovieCard
            title="From the Ashes"
            rating={6.9}
            imageUrl="ashes.png"
          ></MovieCard>
          <MovieCard
            title="Space Dogg"
            rating={6.9}
            imageUrl="Dogg.png"
          ></MovieCard>
          <MovieCard
            title="The Order"
            rating={6.9}
            imageUrl="order.png"
          ></MovieCard>
          <MovieCard title="Y2K" rating={6.9} imageUrl="Y2K.png"></MovieCard>
          <MovieCard
            title="Solo Leveling: ReAwakening"
            rating={6.9}
            imageUrl="solo.png"
          ></MovieCard>
          <MovieCard
            title="Get Away"
            rating={6.9}
            imageUrl="get.png"
          ></MovieCard>
          <MovieCard
            title="Sonic the Hedgehog 3"
            rating={6.9}
            imageUrl="sonic.png"
          ></MovieCard>
        </div>
      </div>
    </>
  );
};

export default Upcoming;
