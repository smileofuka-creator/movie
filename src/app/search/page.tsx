import Footer from "@/components/ui/Footer";
import { SearchResults } from "./SearchResult";
import Navigation from "@/components/ui/Navigation";

export default function SearchPage() {
  return (
    <main className="max-w-[1280px] mx-auto px-4 py-8">
      <div className="flex  flex-col ">
        <Navigation />
        <SearchResults />
        <Footer />
      </div>
    </main>
  );
}
