import React from 'react'
import {Navbar, NavItem} from 'react-materialize'

const Nav = () =>
  <nav>
    <Navbar className='ben accent' brand='Bens Fancy News Site' right>
      <NavItem href='get-started.html'>Getting started</NavItem>
      <NavItem href='components.html'>Components</NavItem>
    </Navbar>
  </nav>

export default Nav
