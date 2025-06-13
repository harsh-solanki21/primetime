import React, { useState } from "react";
import Header from "./components/layout/Header";
import Trending from "./components/layout/Trending";
import Search from "./components/ui/Search";
import Movies from "./components/layout/Movies";
import "./App.css";

const App: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white font-sans">
      <div className="bg-[url(./assets/background.png)] bg-cover bg-center bg-no-repeat bg-fixed h-screen absolute inset-0 z-0 opacity-30"></div>
      <Header />

      <main className="px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="max-w-7xl mx-auto">
          <section className="text-center py-16">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
              Find Your Next Favorite Movie
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-400 mb-8">
              Explore thousands of movies, get recommendations, and keep track
              of what you've watched.
            </p>
            <Search search={search} setSearch={setSearch} />
          </section>

          {!search.trim() && <Trending />}

          <Movies searchQuery={search} />
        </div>
      </main>
    </div>
  );
};

export default App;
