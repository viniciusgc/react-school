import React, { useState } from "react";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import "./style.scss";
import logo from "../../assets/img/brand/logo-evolucional.png";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* <Navbar expand="md" className="main-nav">
        <NavbarBrand href="/">
          <img src={logo} className="main-logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem active={window.location.pathname.indexOf("/") >= 0}>
              <NavLink href="/">Alunos</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar> */}
      <Navbar light expand="md" className="main-nav">
        <NavbarBrand href="/">
          <img src={logo} className="main-logo" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem
              active={window.location.pathname.indexOf("/") >= 0}
              className="nav-item"
            >
              <NavLink href="/" className="nav-link">
                Alunos
              </NavLink>
            </NavItem>
            <NavItem
              active={window.location.pathname.indexOf("/teachers") >= 0}
              className="nav-item"
            >
              <NavLink href="/" className="nav-link">
                Professores
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
