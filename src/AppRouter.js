import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Students, Teachers } from "./views";

const AppRouter = () => (
  <BrowserRouter>
    <Route path="/" component={Students} exact />
    <Route path="/teachers" component={Teachers} exact />
  </BrowserRouter>
);

export default AppRouter;
