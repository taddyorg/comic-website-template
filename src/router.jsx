import * as React from "react";
import { Switch, Route, Router } from "wouter";
import Home from "./pages/home";
import About from "./pages/about";
import Episodes from "./pages/episodes";
import Reader from "./pages/reader";
import NotFound from "./pages/not-found";
import ScrollToTop from "./components/scroll-to-top";

export default () => (
  <>
    <ScrollToTop />
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/episodes/" component={Episodes} />
      <Route path="/episodes/:identifier" component={Reader} />
      <Route component={NotFound} />
    </Switch>
  </>
);