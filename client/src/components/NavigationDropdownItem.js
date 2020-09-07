import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

const NavigationDropdownItem = ({ fileName, history, match }) => {
  return (
    <NavDropdown.Item as={Link} to={fileName} onClick={() => history.push(`${match.path}${fileName}`)}>{fileName}</NavDropdown.Item>
  )
}

export default withRouter(NavigationDropdownItem);