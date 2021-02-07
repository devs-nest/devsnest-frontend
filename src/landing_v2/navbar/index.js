import React, { useState, useEffect, Fragment } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Drawer,
} from '@material-ui/core';
import { NavHashLink } from 'react-router-hash-link';
import MenuIcon from '@material-ui/icons/Menu';
import './navbar.scss';
import { menuItems } from './menuItems';
const useStyles = makeStyles({
  header: {
    backgroundColor: 'white',
    padding: '10px',
    boxShadow: '0px 0px 10px #00000029',
  },
  drawerIcon: {
    outline: '0',
    '&:focus': {
      outline: '0',
    },
  },
  desktopMenu: {
    margin: '0 50px 0 auto',
    display: 'flex',
    '& li': {
      listStyleType: 'none',
      fontSize: '20px',
      marginLeft: '20px',
      '& a': {
        color: '#9C85D2',
        '&:hover': {
          color: '#ff7d59',
          textDecoration: 'none',
        },
      },
    },
  },
  mobileMenu: {
    padding: '0',
    '& li': {
      listStyleType: 'none',
      height: '50px',
      fontSize: '20px',
      minWidth: '250px',
      padding: '15px',
      '& a': {
        color: '#9C85D2',
        '&:hover': {
          color: '#ff7d59',
          textDecoration: 'none',
        },
      },
    },
  },
});

const getMenutItems = () => {
  return menuItems.map((item) => {
    return item.type === 'internal' ? (
      <NavHashLink key={item.id} to={item.to}>
        {item.title}
      </NavHashLink>
    ) : (
      <a key={item.id} href={item.to}>
        {item.title}
      </a>
    );
  });
};

const DisplayMobile = () => {
  const classes = useStyles();
  const [state, setState] = useState({ mobileView: false, drawerOpen: false });
  const { mobileView, drawerOpen } = state;
  const handleDrawerOpen = () => {
    setState((prevState) => ({ ...prevState, drawerOpen: true }));
  };
  const handleDrawerClose = () => {
    setState((prevState) => ({ ...prevState, drawerOpen: false }));
  };
  return (
    <Fragment>
      <IconButton
        className={classes.drawerIcon}
        edge="start"
        aria-label="menu"
        aria-haspopup="true"
        onClick={handleDrawerOpen}
      >
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <ul className={classes.mobileMenu}>
          {getMenutItems().map((item, index) => (
            <li key={index} onClick={handleDrawerClose}>
              {item}
            </li>
          ))}
        </ul>
      </Drawer>
    </Fragment>
  );
};
const DisplayDesktop = () => {
  const classes = useStyles();
  return (
    <ul className={classes.desktopMenu}>
      {getMenutItems().map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};
export default function NavBar() {
  const classes = useStyles();
  const [state, setState] = useState({
    mobileView: false,
  });
  const { mobileView } = state;
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());
  }, []);
  return (
    <header>
      <AppBar position="fixed" className={classes.header}>
        <Toolbar>
          {mobileView && <DisplayMobile />}
          <NavHashLink to="/#top-header">
            <div className="nav-logo">
              <img src="./logo.jpg" alt="DevsNest Logo" />
            </div>
          </NavHashLink>
          {!mobileView && <DisplayDesktop />}
        </Toolbar>
      </AppBar>
    </header>
  );
}
