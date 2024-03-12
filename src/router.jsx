import * as React from "react";
import { Switch, Route, Router } from "wouter";
import Home from "./pages/home";
import About from "./pages/about";
import Episodes from "./pages/episodes";
import Reader from "./pages/reader";
import NotFound from "./pages/not-found";
import ScrollToTop from "./components/scroll-to-top";

export default ({ comicseries, creators }) => (
  <>
    <ScrollToTop />
    <Switch>
      <Route path="/" component={() => <Home comicseries={comicseries} creators={creators} />} />
      <Route path="/about" component={() => <About comicseries={comicseries} creators={creators} />} />
      <Route path="/episodes/" component={() => <Episodes comicseries={comicseries} creators={creators} />} />
      <Route path="/episodes/:identifier" component={() => <Reader comicseries={comicseries} creators={creators} />} />
      <Route component={() => <NotFound comicseries={comicseries} creators={creators} />} />
    </Switch>
  </>
);