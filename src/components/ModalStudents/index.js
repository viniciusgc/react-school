import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import user from "../../assets/img/user.png";
import "./styles.scss";

class ModalStudents extends Component {
  state = {};

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          Alunos do {this.props.degree}
        </ModalHeader>
        <ModalBody className="body-students">
          <ul className="list-students">
            {this.props.students.map((student) => (
              <li key={student.id}>
                <Row>
                  <Col md={2}>
                    <img src={user} />
                  </Col>
                  <Col md={10} className="align-image">
                    <span>{student.name}</span>
                  </Col>
                </Row>
              </li>
            ))}
          </ul>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalStudents;
