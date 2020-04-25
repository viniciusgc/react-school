import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, FormGroup, Input, Button } from "reactstrap";
import Layout from "../container/Layout";
import { Table, Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faEdit } from "@fortawesome/free-solid-svg-icons";
import Chart from "react-apexcharts";
import { ModalUpdateStudents } from "../../components";
import {
  fetchStudents,
  fetchClasses,
  fetchDegrees,
  createStudents,
  updateStudents,
} from "./actions";
import "./styles.scss";

class Students extends Component {
  state = {
    id: null,
    name: "",
    classSelected: null,
    degrees: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    classes: [1, 2, 3, 4, 5, 6],
    classId: null,
    degreeId: null,
    modalShow: false,
    chartOpts: [],
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "EF",
          "1º EM",
          "2º EM",
          "3º EM",
          "Cursinho",
          "Em Casa",
          "Outros ",
          "4º EF",
          "5º EF",
          "6º EF",
          "7º EF",
          "8º EF",
          "9º EF",
        ],
      },
    },
    series: [
      {
        name: "series-1",
        data: [],
      },
    ],
  };

  async componentDidMount() {
    await this.props.fetchStudents();
    await this.props.fetchClasses();
    await this.props.fetchDegrees();
  }

  componentWillReceiveProps(nextProps) {
    this.renderChartOptions(nextProps);
  }

  renderChartOptions = ({ students }) => {
    let chartOpts = [];
    for (let index = 1; index <= 13; index++) {
      chartOpts.push(students.filter((data) => data.degreeId == index).length);
    }
    let series = [
      {
        name: "series-1",
        data: chartOpts,
      },
    ];

    this.setState({ series });
  };

  toggle = () => {
    this.setState((prevState) => ({
      modalShow: !prevState.modalShow,
    }));
  };

  handleClassSearch = async (classId) => {
    if (classId === "Selecione uma classe") classId = null;
    await this.setState({ classId });
    this.handleSearch();
  };

  handleDegreeSearch = async (degreeId) => {
    if (degreeId === "Selecione uma classe") degreeId = null;
    await this.setState({ degreeId });
    this.handleSearch();
  };

  handleSearch = () => {
    let searchs = {};

    if (this.state.classId) searchs["classId"] = this.state.classId;
    if (this.state.degreeId) searchs["degreeId"] = this.state.degreeId;

    this.props.fetchStudents(searchs);
  };

  handleGenerateStudent = async () => {
    const { degrees, classes } = this.state;
    for (let index = 1; index <= 20; index++) {
      const { students } = this.props;
      let data = {
        ra: Math.floor(Math.random() * 900000) + 100000,
        name: `Nome do aluno ${students.length + index}`,
        degreeId: degrees[Math.floor(Math.random() * degrees.length)],
        classId: classes[Math.floor(Math.random() * classes.length)],
      };

      this.props.createStudents(data);
    }
  };

  handleOpenModal = (id, name, classSelected) => {
    this.setState({ id, name, classSelected });
    this.toggle();
  };

  handleUpdateStudents = () => {
    const { id, name, classSelected } = this.state;
    this.props.updateStudents(id, { name, classId: classSelected });
    this.toggle();
  };

  renderRowTable = (students) => {
    if (students.length === 0) {
      return (
        <tr>
          <td colSpan="5">
            {" "}
            <Alert color="warning" className="text-center">
              Nenhum aluno foi encontrado.
            </Alert>
          </td>
        </tr>
      );
    }
    return students.map((student) => (
      <tr key={student.id}>
        <td>{student.name}</td>
        <td>{student.ra}</td>
        <td>{student.degree.name}</td>
        <td>{student.class.name}</td>
        <td>
          <Button
            onClick={() =>
              this.handleOpenModal(student.id, student.name, student.classId)
            }
            color="primary"
            title="editar"
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </td>
      </tr>
    ));
  };

  renderListStudents = (students, classes, degrees) => (
    <>
      <Row className="mt-5">
        <Col md={3}>
          <h3>{`Alunos (${students.length})`}</h3>
        </Col>
        <Col md={7}>
          <Row>
            <Col md={6}>
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
            <Col md={6}>
              <FormGroup>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  onChange={(value) =>
                    this.handleClassSearch(value.target.value)
                  }
                >
                  <option>Selecione uma classe</option>
                  {classes.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Col>
        <Col md={2}>
          <Button
            onClick={() => this.handleGenerateStudent()}
            color="primary"
            className="float-right btn-block"
          >
            <FontAwesomeIcon icon={faCog} /> <strong>GERAR</strong>
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={12}>
          <Table responsive hover>
            <thead>
              <tr>
                <th width="30%">Nome</th>
                <th>R.A</th>
                <th>Série</th>
                <th>Classe</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>{this.renderRowTable(students)}</tbody>
          </Table>
        </Col>
      </Row>
    </>
  );

  render() {
    const { students, classes, degrees } = this.props;
    const { id, name, classSelected, modalShow } = this.state;

    return (
      <Layout>
        <Row className="mt-5">
          <Col md={12}>
            <h1 className="title">Painel do aluno</h1>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={12}>
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              height={200}
            />
          </Col>
        </Row>
        {this.renderListStudents(students, classes, degrees)}

        <ModalUpdateStudents
          name={name}
          classSelected={classSelected}
          classes={classes}
          modalShow={modalShow}
          toggle={this.toggle}
          updateName={(name) => this.setState({ name })}
          updateClassSelected={(classSelected) =>
            this.setState({ classSelected })
          }
          update={() => this.handleUpdateStudents()}
        />
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const { students } = state;

  return { ...students };
};

const mapDispatchToProps = {
  fetchStudents,
  fetchClasses,
  fetchDegrees,
  createStudents,
  updateStudents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Students);
