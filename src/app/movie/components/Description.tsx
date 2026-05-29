// interface DescriptionProps {
//   movie?: {
//     overview?: string;
//   };
// }

// const Description = ({ movie }: DescriptionProps) => {
//   return (
//     <div className="mt-6 flex flex-col gap-8">
//       <p>{movie?.overview}</p>

//       <div className="flex flex-col gap-4">
//         <div className="flex gap-[53px]">
//           <h3 className="w-20 text-[16px] font-bold">Director</h3>
//           <p>Jon M. Chu</p>
//           {/* https://api.themoviedb.org/3/movie/${params.id}
//           credits?language=en-US */}
//         </div>
//         <div className="border-b" />

//         <div className="flex gap-[53px]">
//           <h3 className="w-20 text-[16px] font-bold">Writers</h3>
//           <p>—</p>
//         </div>
//         <div className="border-b" />

//         <div className="flex gap-[53px]">
//           <h3 className="w-20 text-[16px] font-bold">Stars</h3>
//           <p>—</p>
//         </div>
//         <div className="border-b" />
//       </div>
//     </div>
//   );
// };

// export default Description;

"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CrewMember {
  job: string;
  name: string;
}

interface CastMember {
  name: string;
  order: number;
}

interface DescriptionProps {
  movie?: {
    overview?: string;
  };
}

const Description = ({ movie }: DescriptionProps) => {
  const params = useParams();
  const [director, setDirector] = useState("");
  const [writers, setWriters] = useState<string[]>([]);
  const [stars, setStars] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}/credits?language=en-US`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWZiMDk4OGVhMWE0YWNhYjMyNTMxNjlhYzVkZmZlOSIsIm5iZiI6MTc3OTI3OTU4My4xMDYsInN1YiI6IjZhMGRhNmRmZDNjOTM0OWQxNTBlMjFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.huU2C0p6q7knEvDewSVpmN90dBFf7XPqtvjk1dy_GPg",
          },
        },
      )
      .then((response) => {
        // Director
        const dir = response.data.crew.find(
          (c: CrewMember) => c.job === "Director",
        );
        setDirector(dir?.name || "—");

        // Writers
        const wri = response.data.crew
          .filter(
            (c: CrewMember) => c.job === "Writer" || c.job === "Screenplay",
          )
          .map((c: CrewMember) => c.name);
        setWriters(wri);

        // Stars — эхний 3 жүжигчин
        const st = response.data.cast
          .filter((c: CastMember) => c.order < 3)
          .map((c: CastMember) => c.name);
        setStars(st);
      });
  }, [params.id]);

  return (
    <div className="mt-6 flex flex-col gap-8">
      <p>{movie?.overview}</p>

      <div className="flex flex-col gap-4">
        <div className="flex gap-[53px]">
          <h3 className="w-20 text-[16px] font-bold">Director</h3>
          <p>{director}</p>
        </div>
        <div className="border-b" />

        <div className="flex gap-[53px]">
          <h3 className="w-20 text-[16px] font-bold">Writers</h3>
          <p>{writers.length > 0 ? writers.join(", ") : "—"}</p>
        </div>
        <div className="border-b" />

        <div className="flex gap-[53px]">
          <h3 className="w-20 text-[16px] font-bold">Stars</h3>
          <p>{stars.length > 0 ? stars.join(", ") : "—"}</p>
        </div>
        <div className="border-b" />
      </div>
    </div>
  );
};

export default Description;
