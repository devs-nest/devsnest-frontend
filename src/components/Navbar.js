import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { HashLink as Link } from 'react-router-hash-link';
import {
  Collapse,
  Nav as BSNav,
  Navbar as BSNavbar,
  NavbarToggler,
  NavItem,
} from 'reactstrap';
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from 'reactstrap';

import { logout } from '../actions/loginActions';
import default_user from '../assets/images/default_user.png';
import logo from '../assets/images/logo.jpg';
import useActions from '../hooks/useActions';

const homeMenuItems = [
  {
    title: 'Vision',
    to: '/#our-vision',
  },
  {
    title: 'Curriculum',
    to: '/#curriculum',
  },
  {
    title: 'Join Now',
    to: '/#community',
  },
  {
    title: 'FAQs',
    to: '/faqs#read',
  },
];

const loginMenuItems = [
  {
    title: 'Challenges',
    to: '/challenges',
  },
  {
    title: 'Leaderboard',
    to: '/leaderboard',
  },
  {
    title: 'Groups',
    to: '/groups',
  },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const loginState = useSelector((state) => state.loginState);
  const actions = useActions({ logout });

  const toggle = () => setIsOpen(!isOpen);

  const navItems = loginState.loggedIn ? loginMenuItems : homeMenuItems;

  const offsetScroll = (e, offset) =>
    window.scroll({
      top: e.offsetTop - offset,
      left: 0,
      behavior: 'smooth',
    });

  return (
    <BSNavbar color="white" light expand="md" className="shadow-sm">
      <Link to="/" className="navbar-brand">
        <img
          src={logo}
          alt="Devsnest logo"
          height="72"
          width="72"
          className="d-inline-block align-top nav-logo"
        />
      </Link>

      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        {!loginState.isLoading && (
          <BSNav navbar>
            {navItems.map((item, index) => (
              <NavItem key={index}>
                <Link
                  to={item.to}
                  className="nav-link"
                  onClick={() => setIsOpen(false)}
                  scroll={(e) => offsetScroll(e, 70)}
                >
                  {item.title}
                </Link>
              </NavItem>
            ))}

            {loginState.loggedIn ? (
              <NavItem className="nav-item-profile">
                <UncontrolledDropdown>
                  <DropdownToggle tag="div" className="nav-link">
                    <img
                      src={loginState.user.image_url || default_user}
                      height="36"
                      width="36"
                      className="rounded-pill"
                      alt={loginState.user.name}
                    />
                    <span className="ml-3">{loginState.user.name}</span>
                  </DropdownToggle>
                  <DropdownMenu className="nav-menu">
                    <Link to="/" className="dropdown-item">
                      Dashboard
                    </Link>
                    <DropdownItem divider />
                    <DropdownItem tag="div" onClick={() => actions.logout()}>
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </NavItem>
            ) : (
              <NavItem>
                <Link
                  className="nav-link"
                  to="/login"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </NavItem>
            )}
          </BSNav>
        )}
      </Collapse>
    </BSNavbar>
  );
}

export default Navbar;
