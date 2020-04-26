import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "../container/Layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEye } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, FormGroup, Input, Button, Table, Alert } from "reactstrap";
import {
  fetchTeachers,
  fetchRelationships,
  fetchMatters,
  createRelationship,
} from "./actions";
import { fetchDegrees, fetchClasses, fetchStudents } from "../students/actions";
import { ModalStudents, ModalTeachers } from "../../components";
import "./styles.scss";

class Teachers extends Component {
  state = {
    degreeId: null,
    degreeName: null,
    modalStudents: false,
    ModalTeachers: false,
    degreeIdSearch: null,
    classId: null,
    teachers: [],
  };

  async componentDidMount() {
    await this.props.fetchTeachers();
    await this.props.fetchRelationships();
    await this.props.fetchClasses();
    await this.props.fetchMatters();
    this.setState({ teachers: this.props.teachers });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ teachers: nextProps.teachers });
  }

  toggleStudents = () => {
    this.setState((prevState) => ({
      modalStudents: !prevState.modalStudents,
    }));
  };

  toggleTeachers = () => {
    this.setState((prevState) => ({
      modalTeachers: !prevState.modalTeachers,
    }));
  };

  renderClassName = (item) => {
    const { classes } = this.props;
    let obj = classes.find((cls) => cls.id == item);
    return `${obj.name}, `;
  };

  renderClasses = (classes) => {
    return classes.map((item) => this.renderClassName(item.classId));
  };

  renderDegreeName = (item) => {
    const { degrees } = this.props;
    let obj = degrees.find((degree) => degree.id == item);
    return obj.name;
  };

  handleModalStudents = async (degreeId, degreeName) => {
    let searchs = {};

    await this.setState({ degreeId, degreeName });

    searchs["degreeId"] = this.state.degreeId;

    await this.props.fetchStudents(searchs);

    this.toggleStudents();
  };

  renderDegrees = (degress) => {
    return (
      <ul className="list-degrees">
        {degress.map((degree) => {
          let degreeName = this.renderDegreeName(degree.degreeId);
          return (
            <li>
              <span className="degree-name">{degreeName}</span>
              <span>{this.renderClasses(degree.classes)}</span>
            </li>
          );
        })}
      </ul>
    );
  };

  renderButtonModal = (degress) => {
    return (
      <ul className="btn-degrees">
        {degress.map((degree) => {
          let degreeName = this.renderDegreeName(degree.degreeId);
          return (
            <li>
              <Button
                color="primary"
                title="visualizar alunos"
                size="sm"
                className="ml-3"
                outline
                onClick={() =>
                  this.handleModalStudents(degree.degreeId, degreeName)
                }
              >
                <FontAwesomeIcon icon={faEye} />
              </Button>
            </li>
          );
        })}
      </ul>
    );
  };

  renderRowTable = (teachers) => {
    if (teachers.length === 0) {
      return (
        <tr>
          <td colSpan="5">
            {" "}
            <Alert color="warning" className="text-center">
              Nenhum professor foi encontrado.
            </Alert>
          </td>
        </tr>
      );
    }
    return teachers.map((item) => (
      <tr key={item.id}>
        <td>{item.teacher.name}</td>
        <td>{item.matter.name}</td>
        <td>{this.renderDegrees(item.degrees)}</td>
        <td>{this.renderButtonModal(item.degrees)}</td>
      </tr>
    ));
  };

  handleGenerateTeacher = () => {
    this.toggleTeachers();
  };

  createRelationship = async (teacherId, matterId, degrees) => {
    let data = { teacherId, matterId, degrees };
    await this.props.createRelationship(data);
    this.toggleTeachers();
  };

  handleDegreeSearch = (degreeIdSearch) => {
    const { teachers } = this.state;
    if (degreeIdSearch == "") {
      this.setState({ teachers: this.props.teachers });
      return;
    }

    let newArr = teachers.filter((item) =>
      item.degrees.find((fd) => fd.degreeId == degreeIdSearch)
    );
    this.setState({ teachers: newArr });
  };

  render() {
    const { degrees, classes, students, matters, teachersSimple } = this.props;
    const { teachers, modalStudents, modalTeachers, degreeName } = this.state;
    return (
      <Layout>
        <Row className="mt-5">
          <Col md={3}>
            <h3>{`Professores (${teachers.length})`}</h3>
          </Col>
          <Col md={7}>
            <Row>
              <Col md={{ size: 6, offset: 6 }}>
                <FormGroup>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={(value) =>
                      this.handleDegreeSearch(value.target.value)
                    }
                  >
                    <option value="">Selecione uma série</option>
                    {degrees.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
          </Col>
          <Col md={2}>
            <Button
              onClick={() => this.handleGenerateTeacher()}
              color="primary"
              className="float-right btn-block"
            >
              <FontAwesomeIcon icon={faPlus} /> <strong>NOVO</strong>
            </Button>
          </Col>
        </Row>
        <Table responsive hover>
          <thead>
            <tr>
              <th width="30%">Nome</th>
              <th>Matéria</th>
              <th width="40%">Série / Classe</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>{this.renderRowTable(teachers)}</tbody>
        </Table>

        <ModalStudents
          isOpen={modalStudents}
          toggle={() => this.toggleStudents()}
          degree={degreeName}
          students={students}
        />
        <ModalTeachers
          isOpen={modalTeachers}
          toggle={() => this.toggleTeachers()}
          degrees={degrees}
          matters={matters}
          teachers={teachersSimple}
          handleForm={({ teacherId, matterId, degrees }) =>
            this.createRelationship(teacherId, matterId, degrees)
          }
        />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { teachers, students } = state;

  return {
    ...teachers,
    ...students,
  };
};

const mapDispatchToProps = {
  fetchTeachers,
  fetchRelationships,
  fetchDegrees,
  fetchClasses,
  fetchStudents,
  fetchMatters,
  createRelationship,
};

export default connect(mapStateToProps, mapDispatchToProps)(Teachers);
