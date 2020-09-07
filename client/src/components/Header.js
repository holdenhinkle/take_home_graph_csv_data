import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import NavigationDropdown from './NavigationDropdown';

const Header = ({ fileNames }) => {
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand href="#home">CSV Files</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to='/'>All Files</Nav.Link>
          <NavigationDropdown fileNames={fileNames} />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;