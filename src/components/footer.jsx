import * as React from "react";
import { Link } from "wouter";

export default function Footer() {
  
  return (
    <footer>
      <div>
        <Link href="/">Home</Link>
        <span>|</span>
        <Link href="/episodes">Episodes</Link>
        <span>|</span>
        <Link href="/about">About</Link>
      </div>
    </footer>
  );
}