import React, {Component} from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems =()=> (
    <ul className={classes.NavigationItems}>
        <NavigationItem links="/" active>BurgerBuilder</NavigationItem>
        <NavigationItem  links="/">Checkout</NavigationItem>

    </ul>
);

export default navigationItems;