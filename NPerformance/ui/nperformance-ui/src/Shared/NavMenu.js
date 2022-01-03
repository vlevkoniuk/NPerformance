import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link } from 'react-router-dom';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    render() {
    return (
      <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                <Navbar.Brand href="/">NPerformance vizualizer</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <NavDropdown title="Perormance Results" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/results/times">Requests completion times</NavDropdown.Item>
                        <NavDropdown.Item href="/results/stats">Requests statistics</NavDropdown.Item>
                        <NavDropdown.Item href="/results/byuser">Requests by users</NavDropdown.Item>
                        <NavDropdown.Item href="/results/all">All requests</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/results/export">Export</NavDropdown.Item>
                        <NavDropdown.Item href="/results/reload">Reload</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Configuration" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/configure/requests">Requests collections</NavDropdown.Item>
                        <NavDropdown.Item href="/configure/requestsbyuser">User Requests</NavDropdown.Item>
                        <NavDropdown.Item href="/configure/rules">Rules</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="/configure/open">Open</NavDropdown.Item>
                        <NavDropdown.Item href="/configure/save">Save</NavDropdown.Item>
                        <NavDropdown.Item href="/configure/reload">Reload</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                    <Nav.Link eventKey={2} href="#memes">
                        About
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
      </header>
    );
  }
}
