import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, useNavigate  } from 'react-router-dom';


export function NavMenu () {
    const navigate = useNavigate();
        
    const handleRequestsClick = () => {
        navigate("/configure/requests");
    }
    
    return (
      <header>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                <Navbar.Brand onClick={() => navigate("/")}>NPerformance vizualizer</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <NavDropdown title="Perormance Results" id="collasible-nav-dropdown">
                        <NavDropdown.Item onClick={() => navigate("/results/times")}>Requests completion times</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("/results/stats")}>Requests statistics</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("/results/byuser")}>Requests by users</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("/results/all")}>All requests</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => navigate("/results/export")}>Export</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("/results/reload")}>Reload</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Configuration" id="collasible-nav-dropdown">
                        <NavDropdown.Item onClick={() => navigate("/configure/requests")}>Requests collections</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("/configure/requestsbyuser")}>User Requests</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("/configure/rules")}>Rules</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => navigate("/configure/open")}>Open</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("/configure/save")}>Save</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => navigate("/configure/reload")}>Reload</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Nav>
                    <Nav.Link eventKey={2} onClick={() => navigate("/about")}>
                        About
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
      </header>
    );
}
