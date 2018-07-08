import React, {Component} from 'react';
import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';


// Fucntional component not assoicated with any stage, 
// recive some props and return JSX code
class Model extends Component {

    componentDidUpdate(){
        console.log('Inside Model componentDidUpdate');
    }

    shouldComponentUpdate(nextProps, nextStage){
        return nextProps.show != this.props.show || nextProps.children != this.props.children;
    }

    componentWillUpdate(){
        console.log('Inside Model componentWillUpdate');
    }

    render(){
        return (
            <Aux>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div className={classes.Modal} 
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                }}>
        
            {this.props.children}
        </div>
        </Aux>

        );
    }



}



export default Model;