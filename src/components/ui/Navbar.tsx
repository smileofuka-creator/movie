import { Film, Search } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="w-full max-w-[1440px]   top-0 z-50 h-16 flex items-center">
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-16 flex items-center  gap-4">
        <Film className="w-5 h-5" />
        <span className="font-bold text-lg italic tracking-tight">Movie Z</span>
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
  );
};
