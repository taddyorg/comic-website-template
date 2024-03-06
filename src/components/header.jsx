import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "wouter";

export default function Header({ comicseries, showActionButton }) {
  const [creators, setCreators] = useState(null);
  
  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const creatorsRaw = comicseries.creators;
        const creatorsSSSUrl = creatorsRaw.map(creator => creator.url);
        const creatorsData = await Promise.all(creatorsSSSUrl.map(url => axios.get(url).then(res => res.data)));
        setCreators(creatorsData);
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      }
    };
    fetchCreators();
  }, []);

  return (
    <header className="py-3 flex justify-between bg-header-background">
      <div className="flex flex-col pl-2">
        <Link
          href='/'
          className="text-2xl font-bold">{comicseries.name}
        </Link>
        {creators && (
          <Link
            href="/about"
            className="text-sm font-bold">by {creators.map(creator => creator.name).join(", ")}
          </Link>
        )}
      </div>
      {
        showActionButton && (
          <div className="flex items-center pr-2">
            <Link href="/" className="rounded-lg bg-primary font-bold text-white py-2 px-4">Home</Link>
          </div>
        )
      }
    </header>
  );
}