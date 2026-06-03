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
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import * as React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
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

const Navigation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState<string>("");
  const [genres, setGenres] = useState<any[]>([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?language=en`,

          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWZiMDk4OGVhMWE0YWNhYjMyNTMxNjlhYzVkZmZlOSIsIm5iZiI6MTc3OTI3OTU4My4xMDYsInN1YiI6IjZhMGRhNmRmZDNjOTM0OWQxNTBlMjFhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.huU2C0p6q7knEvDewSVpmN90dBFf7XPqtvjk1dy_GPg",
            },
          },
        );

        setGenres(response.data.genres);
        console.log("response.data");
      } catch (error) {
        console.log(error);
      }
    };
    getGenres();
  }, []);

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
          {/* <NavigationMenuContent>
            <ul className="grid grid-cols-2 gap-1 p-2 w-[300px]">
              {genres?.map((genre) => (
                <li key={genre.id}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={`/genre?id=${genre.id}`}
                      className="block px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {genre.name}
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent> */}

          <div className="relative flex items-center">
            <Search
              className="absolute left-3 w-4 h-4 text-gray-400 cursor-pointer"
              onClick={handleClick}
            />
            <input
              onChange={handleChange}
              value={value}
              type="text"
              placeholder="Search..."
              className="w-[300px] border dark:border-gray-700 bg-transparent dark:text-white rounded-md py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
            />
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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
