import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Row, Col, Alert } from "reactstrap";
import Layout from "../container/Layout";

class Home extends Component {
  state = {};
  render() {
    return (
      <Layout>
        <Row className="mt-5">
          <Col md={12}>Teste</Col>
        </Row>
      </Layout>
    );
  }
}

export default Home;
