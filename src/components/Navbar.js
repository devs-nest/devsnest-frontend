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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { login } from '../actions/loginActions';
import logo from '../assets/images/logo.jpg';

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
    title: 'Challanges',
    to: '/challanges',
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

function Navbar({ loginState }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const navItems = loginState.loggedIn ? loginMenuItems : homeMenuItems;

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
        <BSNav className={!loginState.loggedIn ? 'ml-auto' : ''} navbar>
          {navItems.map((item) => (
            <NavItem key={item.id}>
              <NavLink href={item.to}>{item.title}</NavLink>
            </NavItem>
          ))}
        </BSNav>
      </Collapse>
    </BSNavbar>
  );
}

const mapStateToProps = (state) => {
  return {
    loginState: state.loginState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      login,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
