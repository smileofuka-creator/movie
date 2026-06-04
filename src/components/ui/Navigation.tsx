// "use client";
// import { Film, Search, Moon } from "lucide-react";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import * as React from "react";
// import { createRoot } from "react-dom/client";
// import { DarkModeSwitch } from "react-toggle-dark-mode";
// import { useTheme } from "next-themes";

// const Navigation = () => {
//   const searchParams = useSearchParams();
//   const search = searchParams.get("movie");
//   const router = useRouter();
//   const { theme, setTheme } = useTheme();

//   const [value, setValue] = useState<string>("");
//   const handleChange = (e) => {
//     const { value } = e.target;
//     setValue(value);
//   };

//   const handleClick = () => {
//     router.push(`/search?movie=${value}`);
//   };

//   const toggleDarkMode = (checked: boolean) => {
//     setTheme(checked ? "dark" : "light"); // ✅ next-themes-тэй холбох
//   };

//   return (
//     <nav className="bg-[#FFFFFF] w-full bg-white flex justify-center">
//       <div className="w-full max-w-[1280px] h-[60px] px-4 flex items-center justify-between">
//         <Link href="/" className="flex items-center gap-2">
//           <div className="text-[#4338CA] p-2 rounded-md">
//             <Film className="bg-white w-5 h-5" />
//           </div>

//           <span className="text-[#4338CA] italic font-bold text-[16px]">
//             Movie Z
//           </span>
//         </Link>

//         <div className="w-[480px] h-[36px] gap-3 flex items-center">
//           <button className="border px-4 py-2 rounded-md text-sm hover:bg-gray-100">
//             Genre
//           </button>

//           <div className="relative">
//             <Search
//               className="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
//               onClick={handleClick}
//             />

//             <input
//               onChange={handleChange}
//               type="text"
//               placeholder="Search..."
//               className="w-[300px] border rounded-md py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>
//         </div>
//         <button
//           onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//           className="border dark:border-gray-700 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white transition-colors"
//         >
//           <DarkModeSwitch
//             style={{ marginBottom: "2rem" }}
//             checked={isDarkMode}
//             onChange={toggleDarkMode}
//             size={120}
//           />
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navigation;

"use client";

import { Film, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import * as React from "react";

import { useTheme } from "next-themes";
import axios from "axios";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [value, setValue] = useState<string>("");
  const [genres, setGenres] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?language=en`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
            },
          },
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    getGenres();
  }, []);

  useEffect(() => {
    if (!value.trim()) {
      setSearchResults([]);
      setOpen(false);
      return;
    }

    const getMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${value}&language=en-US&page=1`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
            },
          },
        );
        setSearchResults(response.data.results.slice(0, 5));
        setOpen(true);
      } catch (error) {
        console.log(error);
      }
    };

    getMovies();
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (value.trim()) {
      router.push(`/search?movie=${value}`);
    }
  };

  const toggleDarkMode = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b dark:border-gray-800 w-full flex justify-center transition-colors">
      <div className="w-full max-w-[1280px] h-[60px] px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-[#4338CA] p-2 rounded-md">
            <Film className="w-5 h-5" />
          </div>
          <span className="text-[#4338CA] dark:text-indigo-400 italic font-bold text-[16px]">
            Movie Z
          </span>
        </Link>

        {/* Search & Genre */}
        <div className="w-[480px] h-[36px] gap-3 flex items-center relative z-50">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Genre</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {genres?.map((genre) => (
                    <NavigationMenuLink
                      href={`/genre?id=${genre.id}`}
                      key={genre.id}
                    >
                      {genre.name}
                    </NavigationMenuLink>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="relative flex items-center">
            {/* Dropdown */}
            <div className="relative flex items-center">
              <Search
                className="absolute left-3 w-4 h-4 text-gray-400 cursor-pointer z-10"
                onClick={handleClick}
              />
              <input
                onChange={handleChange}
                value={value}
                type="text"
                placeholder="Search..."
                onKeyDown={(e) => e.key === "Enter" && handleClick()}
                className="w-[300px] border dark:border-gray-700 bg-transparent dark:text-white rounded-md py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger className="absolute opacity-0 w-full h-full top-0 left-0 pointer-events-none" />{" "}
                <DropdownMenuContent className="w-[300px] p-0">
                  {searchResults.map((movie) => (
                    <DropdownMenuItem
                      key={movie.id}
                      onClick={() => {
                        setOpen(false);
                        router.push(`/search?movie=${movie.title}`);
                      }}
                      className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                    >
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                            : "/placeholder.png"
                        }
                        alt={movie.title}
                        className="w-10 h-14 object-cover rounded"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {movie.title}
                        </span>
                        <span className="text-xs text-yellow-500">
                          ⭐ {movie.vote_average?.toFixed(1)}/10
                        </span>
                        <span className="text-xs text-gray-400">
                          {movie.release_date?.slice(0, 4)}
                        </span>
                      </div>
                      <span className="ml-auto text-xs text-gray-400">
                        See more →
                      </span>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleClick}
                    className="justify-center text-indigo-500 cursor-pointer"
                  >
                    See all results for "{value}"
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* <Search
              className="absolute left-3 w-4 h-4 text-gray-400 cursor-pointer"
              onClick={handleClick}
            />
            <input
              onChange={handleChange}
              value={value}
              type="text"
              placeholder="Search..."
              className="w-[300px] border dark:border-gray-700 bg-transparent dark:text-white rounded-md py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
            /> */}
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-center p-2 border dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          {mounted ? (
            <DarkModeSwitch
              checked={theme === "dark"}
              onChange={toggleDarkMode}
              size={20}
            />
          ) : (
            <div className="w-5 h-5" />
          )}

          {/* <DarkModeSwitch
            checked={theme === "dark"}
            onChange={(checked: boolean) =>
              setTheme(checked ? "dark" : "light")
            }
            size={20}
          /> */}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
