import React, { useState, useContext, useEffect } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { UserProfileContext } from "../Providers/UserProfileProvider";

export default function Header() {

  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);


  if (isLoggedIn === true) {
    // This is returning JSON
    const userProfile = sessionStorage.getItem("userProfile");
    // Parsing the JSON returned above into an object so we can use it
    var currentUser = JSON.parse(userProfile)
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={RRNavLink} to="/">Critter Care</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */}
            {isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to={`/critters${currentUser.id}`}>My Critters</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to={`/critter/create`}>New Critter</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to={`/food/${currentUser.id}`}>My Critter Food</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to={`/food/create`}>New Critter Food</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to={`/medicine/${currentUser.id}`}>My Critter Meds</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to={`/medicine/create`}>New Critter Meds</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to={`/userProfile/${currentUser.id}`}>My Profile</NavLink>
                </NavItem>
              </>
            }
          </Nav>
          <Nav navbar>
            {isLoggedIn &&
              <>
                <NavItem>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                </NavItem>
              </>
            }
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
