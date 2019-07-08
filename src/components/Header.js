import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../logo.svg";

class Header extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
          <img
            src={logo}
            alt="logo"
            height="30"
            className="d-inline-block align-top"
          />
          Ecommerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
          </Nav>

          <Nav>
            <Navbar.Text>
              <a href="#login">Mark Otto</a>
            </Navbar.Text>

            <Nav.Link href="#deets">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
