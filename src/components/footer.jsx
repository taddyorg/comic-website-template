import * as React from "react";
import { Link } from "wouter";

export default function Footer() {
  
  return (
    <footer className="py-4 flex justify-center items-center w-full h-full">
      <div className="text-center">
        <div className="mb-2">
          <Link href="/" className="text-primary hover:underline">Home</Link>
          <span className="text-primary"> | </span>
          <Link href="/episodes" className="text-primary hover:underline">Episodes</Link>
          <span className="text-primary"> | </span>
          <Link href="/about" className="text-primary hover:underline">About</Link>
        </div>
        <div>
          <p className="text-primary"> Website made using 
            <a href="https://taddy.org" target="_blank" rel="noopener noreferrer" className="ml-1 underline">
              Taddy Ink
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
