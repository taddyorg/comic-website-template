import React from "react";
import { Router } from "wouter";

// Import and apply Tailwind CSS stylesheet
import "./styles/index.css";

// Where all of our pages come from
import PageRouter from "./router.jsx";

// The component that adds our Meta tags to the page
import Seo from './components/seo.jsx';
import Footer from './components/footer.jsx';

// Home function that is reflected across the site
export default function Home() {
  return (
    <Router>
      <div className="bg-background">
        <Seo />
        <main role="main">
          <PageRouter />
        </main>
        <Footer/>
      </div>
    </Router>
  );
}