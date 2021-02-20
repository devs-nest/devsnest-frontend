import React, { useState } from 'react';
import {
  Collapse,
  Navbar as BSNavbar,
  NavbarToggler,
  NavbarBrand,
  Nav as BSNav,
  NavItem,
  NavLink,
} from 'reactstrap';
import logo from '../assets/images/logo.jpg';
import { menuItems } from '../constants';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <BSNavbar color="white" light expand="md" className="shadow-sm">
      <NavbarBrand href="/" className="d-flex align-items-center">
        <img
          src={logo}
          alt="Devsnest logo"
          height="72"
          width="72"
          class="d-inline-block align-top nav-logo"
        />
      </NavbarBrand>

      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <BSNav className="ml-auto" navbar>
          {menuItems.map((item) => (
            <NavItem key={item.id}>
              <NavLink href={item.to}>{item.title}</NavLink>
            </NavItem>
          ))}
        </BSNav>
      </Collapse>
    </BSNavbar>
  );
}

export default Navbar;
