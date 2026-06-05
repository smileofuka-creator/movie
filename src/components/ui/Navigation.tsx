"use client";

import { Film, Search, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import * as React from "react";

import { useTheme } from "next-themes";
import axios from "axios";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

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

            <div className="relative flex-1">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverAnchor asChild>
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
                      onFocus={() => value.trim() && setOpen(true)}
                      onKeyDown={(e) => e.key === "Enter" && handleClick()}
                      className="w-[300px] border dark:border-gray-700 bg-transparent dark:text-white rounded-md py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </PopoverAnchor>
                <PopoverContent
                  className="w-[300px] p-0 mt-1 bg-white dark:bg-gray-950 border dark:border-gray-800 rounded-md shadow-lg overflow-hidden"
                  align="start"
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  {searchResults.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => {
                        setOpen(false);
                        setValue("");
                        router.push(`/search?movie=${movie.title}`);
                      }}
                      className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors border-b dark:border-gray-900 last:border-none"
                    >
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                            : "/placeholder.png"
                        }
                        alt={movie.title}
                        className="w-10 h-14 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium truncate dark:text-white">
                          {movie.title}
                        </span>
                        <span className="text-xs text-yellow-500">
                          ⭐ {movie.vote_average?.toFixed(1)}/10
                        </span>
                      </div>
                    </div>
                  ))}
                  <div
                    onClick={handleClick}
                    className="p-3 text-center text-xs font-semibold text-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-900 border-t dark:border-gray-900 cursor-pointer"
                  >
                    See all results for "{value}"
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex items-center justify-center p-2 border dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle dark mode"
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )
          ) : (
            <div className="w-5 h-5" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
