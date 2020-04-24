import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import Header from "./Header";
import { Container } from "reactstrap";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
