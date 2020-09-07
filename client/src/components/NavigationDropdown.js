import React from 'react';
import { NavDropdown } from 'react-bootstrap';
import NavigationDropdownItem from './NavigationDropdownItem';

const NavigationDropdown = ({ fileNames }) => {
  const dropdownItems = fileNames.map((fileName, i) => (
    <NavigationDropdownItem key={i} fileName={fileName} />
  ))

  return (
    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
      {dropdownItems}
    </NavDropdown>
  )
}

export default NavigationDropdown;