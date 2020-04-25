import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "./styles.scss";

class ModalTeachers extends Component {
  state = {};

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          Cadastro de professor
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={12}>
              <Input placeholder="Nome do professor" />
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalTeachers;
