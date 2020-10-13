import React from 'react';
import { Navbar } from 'react-bootstrap';

function Header(props) {
  return(
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Softhouse Social Auth</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
