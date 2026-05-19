import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MovieCard from "@/components/ui/MovieCard";
import {
  Film,
  MoveRight,
  PlayIcon,
  RemoveFormatting,
  Search,
  Star,
} from "lucide-react";
import { Play } from "next/font/google";
import Image from "next/image";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <div>
      <div>
        <nav className="w-full max-w-[1440px]   top-0 z-50 h-16 flex items-center">
          <div className="max-w-[1280px] mx-auto w-full px-4 md:px-16 flex items-center  gap-4">
            <Film className="w-5 h-5" />
            <span className="font-bold text-lg italic tracking-tight">
              Movie Z
            </span>
          </div>
          <div className="flex items-center flex-1 max-w-[600px] gap-2">
            <button className="flex items-center gap-2 border-gray-200 h-10 px-3 text-sm">
              Genre
            </button>
            <div>
              <Search />
              <input type="text" placeholder="Search ..." />
            </div>
          </div>
        </nav>
        <Carousel className="w-full max-w-[1440px] mx-auto  relative group">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-0">
                  <Card className="relative overflow-hidden rounded-none border-none">
                    <CardContent className="p-0 relative h-[450px] md:h-[580px] w-full  ">
                      <Image
                        src="/Feature.png"
                        fill
                        className="object-cover object-center"
                        alt="Feauture"
                      />

                      <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-8 md:px-16 max-w-[500px] text-white z-10 space-y-4">
                        <p className="text-sm md:text-base text-white font-medium">
                          Now Playing:
                        </p>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-1">
                          Wicked
                        </h1>
                        <p className="flex gap-1 items-center p-0.5">
                          <Star fill="#FACC15" stroke="#FACC15" size={18} />
                          <span className="text-white font-semibold text-[16px]">
                            {6.9}
                          </span>
                          <span className="text-gray-500">/10</span>
                        </p>
                        <p className="text-xs md:text-sm text-white leading-relaxed font-normal line-clamp-4">
                          Elphaba, a misunderstood young woman because of her
                          green skin, and Glinda, a popular girl, become friends
                          at Shiz University in the Land of Oz. After an
                          encounter with the Wonderful Wizard of Oz, their
                          friendship reaches a crossroads.{" "}
                        </p>
                        <button className="flex items-center justify-center gap-2 bg-white text-black font-semibold px-5 py-2.5 rounded-md text-sm w-fit hover:bg-gray-200 transition-colors mt-2 shadow-lg">
                          <PlayIcon fill="black" size={14} />
                          Watch Trailer
                        </button>
                      </div>
                      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                        <span className="w-2 h-2 rounded-full bg-white"></span>
                        <span className="w-2 h-2 rounded-full bg-white/40"></span>
                        <span className="w-2 h-2 rounded-full bg-white/40"></span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 
                   w-12 h-12 rounded-full bg-white text-black border-none shadow-md 
                   hover:bg-gray-100 transition-all"
          />
          <CarouselNext
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 
                   w-12 h-12 rounded-full bg-white text-black border-none shadow-md 
                   hover:bg-gray-100 transition-all"
          />
        </Carousel>
        <div />
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

        <div className="max-w-[1440px] items-center mx-auto px-4 md:px-16 py-10">
          <div className="flex justify-between items-center">
            <h3 className=" text-2xl font-bold text-black mb-6">Popular</h3>
            <div className="flex items-center gap-2 cursor-pointer text-sm font-medium hover:text-gray-600 transition-colors">
              <span>See more</span>
              <MoveRight className="w-[9.33px] h-[9.33px]"></MoveRight>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
            <MovieCard
              title="The Shawshank Redemption"
              rating={6.9}
              imageUrl="shawshank.png"
            ></MovieCard>
            <MovieCard
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
            ></MovieCard>
          </div>
        </div>

        <div className="max-w-[1440px] items-center mx-auto px-4 md:px-16 py-10">
          <div className="flex justify-between items-center">
            <h3 className=" text-2xl font-bold text-black mb-6">Top Rated </h3>
            <div className="flex items-center gap-2 cursor-pointer text-sm font-medium hover:text-gray-600 transition-colors">
              <span>See more</span>
              <MoveRight className="w-[9.33px] h-[9.33px]"></MoveRight>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
            <MovieCard
              title="Pulp Fiction"
              rating={6.9}
              imageUrl="pulp.png"
            ></MovieCard>
            <MovieCard
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
            ></MovieCard>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}
