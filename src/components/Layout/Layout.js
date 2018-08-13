import React,{Component} from 'react';

import Aux from '../../hoc/Aux'

import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import {connect} from 'react-redux';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }


    render(){
        return (
            <Aux>
            <Toolbar isAuth = {this.props.isAuthenticated}/>   
            <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    isAuth = {this.props.isAuthenticated} />         

            <main className={classes.Content}>
                {this.props.children}
            </main>

            </Aux>    
        )
    }

}

const mapStateToProps=state=> {
    console.log('Layout -> ',state.auth);
    console.log('Layout state.auth.token !== null -> ',state.auth.token !== null);
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps) (Layout);