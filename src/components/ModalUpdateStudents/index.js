import React, { Component } from "react";
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

class ModalUpdateStudents extends Component {
  state = {};

  render() {
    return (
      <Modal isOpen={this.props.modalShow} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          Atualização do aluno
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={12}>
              <Input
                placeholder="Nome do aluno"
                value={this.props.name}
                onChange={(value) => this.props.updateName(value.target.value)}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={12}>
              <FormGroup>
                <Input
                  type="select"
                  value={this.props.classSelected}
                  name="select"
                  id="exampleSelect"
                  onChange={(value) =>
                    this.props.updateClassSelected(value.target.value)
                  }
                >
                  <option>Selecione uma classe</option>
                  {this.props.classes.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={this.props.update}
            disabled={
              !this.props.name ||
              this.props.classSelected == "Selecione uma classe"
            }
          >
            Atualizar
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalUpdateStudents;
