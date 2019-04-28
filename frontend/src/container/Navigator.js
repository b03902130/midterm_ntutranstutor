import React, { Component } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import renderURI from '../renderURI';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Navigator extends Component {
    constructor(props) {
        super(props);
        this.linkstyle = {
            color: "gray",
            textDecoration: 'none'
        }
        this.activeStyle = {
            fontWeight: "bold",
            color: "#0080ff",
        }
    }
    render() {
        return (
            <Navbar bg="white" expand="lg" style={{boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.1)"}} >
                <Navbar.Brand><NavLink to="/" style={{ color: "black", fontWeight: "bold", textDecoration: 'none' }}>台大轉學生家教平台</NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link><NavLink to="/teachers" style={this.linkstyle} activeStyle={this.activeStyle}>教師</NavLink></Nav.Link>
                        <Nav.Link><NavLink to="/subjects" style={this.linkstyle} activeStyle={this.activeStyle}>科目</NavLink></Nav.Link>
                        <Nav.Link><NavLink to="/about" style={this.linkstyle} activeStyle={this.activeStyle}>關於</NavLink></Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        <Nav.Link onClick={this.props.testSession}>連線狀態</Nav.Link>
                        {
                            !this.props.user ? <Nav.Link href={renderURI("/auth/google")}>登入（powered by Google）</Nav.Link> :
                                <NavDropdown title={this.props.user.name} id="basic-nav-dropdown" alignRight  >
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={this.props.logout}>登出</NavDropdown.Item>
                                </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    };
}

export default Navigator;
