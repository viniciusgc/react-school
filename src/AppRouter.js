import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./views";

const AppRouter = () => (
  <BrowserRouter>
    <Route path="/" component={Home} />
  </BrowserRouter>
);

export default AppRouter;
