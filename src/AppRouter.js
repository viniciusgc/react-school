import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Students } from "./views";

const AppRouter = () => (
  <BrowserRouter>
    <Route path="/" component={Students} />
  </BrowserRouter>
);

export default AppRouter;
