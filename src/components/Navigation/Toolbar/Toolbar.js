import React, { Component } from "react";

import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
      <div>Menu</div>
      <Logo />
      <nav>
          <NavigationItems  isAuthenticated={props.isAuth}/>
      </nav>
  </header>  
);

export default toolbar;