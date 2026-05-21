import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardDescription } from "./card";
import Image from "next/image";
import { CardContent } from "./card";
import { PlayIcon, Star } from "lucide-react";
const CustomCarousel = () => {
  const [movies, setMovies] = useState<movieType[]>([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWZiMDk4OGVhMWE0YWNhYjMyNTMxNjlhYzVkZmZlOSIsIm5iZiI6MTc3OTI3OTU4My4xMDYsInN1YiI6IjZhMGRhNmRmZDNjOTM0OWQxNTBlMjFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.huU2C0p6q7knEvDewSVpmN90dBFf7XPqtvjk1dy_GPg",
          },
        },
      )
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.results);
      });
  }, [title]);

  return (
    <Carousel className="w-full max-w-[1440px] mx-auto  relative group">
      <CarouselContent>
        {movies.map((movie, index: number) => (
          <CarouselItem key={movie.id} className="relative w-full">
            <div className="p-1">
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
                      Elphaba, a misunderstood young woman because of her green
                      skin, and Glinda, a popular girl, become friends at Shiz
                      University in the Land of Oz. After an encounter with the
                      Wonderful Wizard of Oz, their friendship reaches a
                      crossroads.{" "}
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
                <CardDescription></CardDescription>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 
                   w-12 h-12 rounded-full bg-white text-black border-none shadow-md cursor-pointer
                   hover:bg-gray-100 transition-all"
      />
      <CarouselNext
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 
                   w-12 h-12 rounded-full bg-white text-black border-none shadow-md cursor-pointer
                   hover:bg-gray-100 transition-all"
      />
    </Carousel>
  );
};

export default CustomCarousel;
