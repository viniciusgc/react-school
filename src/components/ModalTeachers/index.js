import React, { Component } from "react";
import {
  Row,
  Col,
  Button,
  ButtonToolbar,
  ButtonGroup,
  Label,
  Input,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "./styles.scss";
import Select from "react-select";

class ModalTeachers extends Component {
  state = {
    teacherId: null,
    matterId: null,
    options: [
      { value: "1", label: "A" },
      { value: "2", label: "B" },
      { value: "3", label: "C" },
      { value: "4", label: "D" },
      { value: "5", label: "E" },
      { value: "6", label: "F" },
    ],
    degrees: [],
  };

  handleChange = (selectedOption, degreeId) => {
    let classes = selectedOption
      ? selectedOption.map((item) => ({
          classId: parseInt(item.value),
        }))
      : [];
    let oldDegrees = this.state.degrees;

    let data = {
      degreeId,
      classes,
    };

    oldDegrees = oldDegrees.filter((elem) => elem.degreeId !== data.degreeId);

    oldDegrees.push(data);

    this.setState({
      degrees: oldDegrees,
    });
  };

  render() {
    const { teacherId, matterId, degrees } = this.state;
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          Cadastro de professor
        </ModalHeader>
        <ModalBody className="body-teachers">
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label for="inputName">Nome</Label>
                <Input
                  type="select"
                  value={this.props.classSelected}
                  id="inputName"
                  onChange={(value) =>
                    this.setState({ teacherId: value.target.value })
                  }
                >
                  <option>Selecione um professor</option>
                  {this.props.teachers.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={12}>
              <FormGroup>
                <Label for="inputDegree">Matéria</Label>

                <Input
                  type="select"
                  value={this.props.classSelected}
                  id="inputDegree"
                  onChange={(value) =>
                    this.setState({ matterId: value.target.value })
                  }
                >
                  <option>Selecione uma matéria</option>
                  {this.props.matters.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={6}>Séries</Col>
            <Col md={6}>Classes</Col>
          </Row>
          {this.props.degrees.map((degree) => (
            <Row className="mt-3">
              <Col md={6}>{degree.name}</Col>
              <Col md={6}>
                <Select
                  placeholder="Selecione as classes"
                  onChange={(selectedOption) =>
                    this.handleChange(selectedOption, degree.id)
                  }
                  options={this.state.options}
                  isMulti={true}
                />
              </Col>
            </Row>
          ))}
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => this.props.handleForm(this.state)}
            disabled={!teacherId || !matterId || !degrees.length}
          >
            Criar
          </Button>{" "}
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalTeachers;
