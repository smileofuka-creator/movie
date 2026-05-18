import Image from "next/image";
import { Card, CardContent } from "./card";
import { Star } from "lucide-react";

const MovieCard = ({ rating, imageUrl, title }) => {
  return (
    <Card className="w-[230px] bg-[#F4F4F5]">
      <Image src={`/${imageUrl}`} alt={title} width={230} height={340} />
      <CardContent>
        <p className="flex gap-1 items-center p-0.5">
          <Star fill="#FACC15" stroke="#FACC15" size={16} />
          <span className="text-black font-semibold text-[16px]">{rating}</span>
          <span className="text-gray-500">/10</span>
        </p>
        <p
          className="text-[#09090B] text-[18px]
"
        >
          {title}
        </p>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
