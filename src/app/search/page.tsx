import { Suspense } from "react";
import Footer from "@/components/ui/Footer";
import { SearchResults } from "./SearchResult";
import Navigation from "@/components/ui/Navigation";

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-black dark:text-white transition-colors">
      <Navigation />
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-6 py-10">
        <Suspense
          fallback={<div className="py-10 text-gray-500">Loading...</div>}
        >
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
