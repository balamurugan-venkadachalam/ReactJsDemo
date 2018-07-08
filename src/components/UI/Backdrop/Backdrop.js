import React, { Component } from "react";
import Aux from "../../../hoc/Aux";
import classes from "./Backdrop.css";

const backDrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backDrop;