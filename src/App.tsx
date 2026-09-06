import { BrowserRouter } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";

// Standalone landing page — single route, no navbar. `BrowserRouter` is kept
// only because a below-fold section (WhatYouMightBeLosingSection) renders a
// react-router-dom <Link>; there is nothing else to route.
const App = () => (
  <BrowserRouter>
    <LandingPage />
  </BrowserRouter>
);

export default App;
