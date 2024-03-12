import React, { useState, useEffect } from "react";
import { Router, useLocation } from "wouter";
import axios from "axios";
import config from "../data";
import ReactGA from "react-ga4";

// Import and apply Tailwind CSS stylesheet
import "./styles/index.css";

// Where all of our pages come from
import PageRouter from "./router.jsx";

// The component that adds our Meta tags to the page
import { Header, Footer, Loading } from './components'

// Home function that is reflected across the site
export default function App() {
  const [location] = useLocation();
  const [comicseries, setComicSeries] = useState(null);
  const [creators, setCreators] = useState(null);

  const isHome = location === "/";

  useEffect(() => {
    const fetchComicSeries = async () => {
      try {
        const response = await axios.get(config.sssUrl);
        if (response.data) {
          setComicSeries(response.data);
        }
      } catch (error) {
        console.error("There was an error fetching the comic series data:", error);
      }
    };

    const fetchCreators = async () => {
      try {
        const response = await axios.get(config.sssUrl);
        if (response.data && response.data.creators) {
          const creatorsRaw = response.data.creators;
          const creatorsSSSUrl = creatorsRaw.map(creator => creator.url);
          const creatorsData = await Promise.all(creatorsSSSUrl.map(url => axios.get(url).then(res => res.data)));
          setCreators(creatorsData);
        }
      } catch (error) {
        console.error("There was an error fetching the creators data:", error);
      }
    };

    fetchComicSeries();
    fetchCreators();
    
    if (config.googleAnalyticsId) {
      ReactGA.initialize(config.googleAnalyticsId);
    }
  }, []);

  if (!comicseries) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="bg-background">
        <Header comicseries={comicseries} creators={creators} showActionButton={!isHome}/>
        <main role="main">
          <PageRouter comicseries={comicseries} creators={creators}/>
        </main>
        <Footer comicseries={comicseries} creators={creators}/>
      </div>
    </Router>
  );
}