interface DescriptionProps {
  movie?: {
    overview?: string;
  };
}

const Description = ({ movie }: DescriptionProps) => {
  return (
    <div className="mt-6 flex flex-col gap-8">
      <p>{movie?.overview}</p>

      <div className="flex flex-col gap-4">
        <div className="flex gap-[53px]">
          <h3 className="w-20 text-[16px] font-bold">Director</h3>
          <p>Jon M. Chu</p>
          {/* https://api.themoviedb.org/3/movie/${params.id}
          credits?language=en-US */}
        </div>
        <div className="border-b" />

        <div className="flex gap-[53px]">
          <h3 className="w-20 text-[16px] font-bold">Writers</h3>
          <p>—</p>
        </div>
        <div className="border-b" />

        <div className="flex gap-[53px]">
          <h3 className="w-20 text-[16px] font-bold">Stars</h3>
          <p>—</p>
        </div>
        <div className="border-b" />
      </div>
    </div>
  );
};

export default Description;
