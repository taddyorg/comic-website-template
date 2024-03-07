import React, { useState, useEffect } from "react";
import { Router, useLocation } from "wouter";
import axios from "axios";
import config from "../data";

// Import and apply Tailwind CSS stylesheet
import "./styles/index.css";

// Where all of our pages come from
import PageRouter from "./router.jsx";

// The component that adds our Meta tags to the page
import { Header, Footer, Loading } from './components'

// Home function that is reflected across the site
export default function App() {
  const [location, setLocation] = useLocation();
  const [comicseries, setComicSeries] = useState(null);

  const isHome = location === "/";

  useEffect(() => {
    axios.get(config.sssUrl)
      .then(response => {
        setComicSeries(response.data);
      })
      .catch(error => console.error("There was an error fetching the data:", error));
  }, []);

  if (!comicseries) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="bg-background">
        <Header comicseries={comicseries} showActionButton={!isHome}/>
        <main role="main">
          <PageRouter comicseries={comicseries}/>
        </main>
        <Footer comicseries={comicseries}/>
      </div>
    </Router>
  );
}