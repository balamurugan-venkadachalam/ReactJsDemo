import React, {Component} from 'react';
import classes from './Auth.css';

class Auth extends Component {

    state ={
        controls:{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }

        }

    }


    render(){
        return(
            <div>
                <form>

                </form>
            </div>
        );

    }

}

export default Auth;