import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "wouter";

export default function Header({ comicseries, creators, showActionButton }) {
  return (
    <header className="py-3 flex justify-between bg-header-background">
      <div className="flex flex-col pl-2">
        <Link
          href='/'
          className="text-2xl font-bold text-primary">{comicseries.name}
        </Link>
        {creators  
          ?  <Link
              href="/about"
              className="text-sm font-bold text-primary">by {creators.map(creator => creator.name).join(", ")}
            </Link>
          : <div className="text-sm font-bold my-2" />
        }
      </div>
      {
        showActionButton && (
          <div className="flex items-center pr-2">
            <Link href="/" className="rounded-lg bg-button-background font-bold text-button py-2 px-4">Home</Link>
          </div>
        )
      }
    </header>
  );
}