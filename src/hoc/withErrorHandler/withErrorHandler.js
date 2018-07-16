import React, {Component} from 'react';
import Model from '../../components/UI/Model/Model';
import Aux from '../Aux';
//import axios from 'axios';

const withErrorHandler =(WrappedComponent, axios)=>{
    // return function which receives props
    return class extends Component {
        state ={
            error: null
        }

        componentWillMount(){
            this.requestInstance = axios.interceptors.response.use(res => res , error=> { 
                this.setState({error: error});
                return 
            });
            
            this.responseInstance = axios.interceptors.request.use(res => {
                this.setState({error: null});
                return res;
            });
            
        }

        componentWillUnMount(){
            axios.interceptors.request.eject(this.requestInstance);
            axios.interceptors.response.eject(this.responseInstance);
        }

        errorConfirmedHander = () =>{
            this.setState({error: null});
        }

        render(){
            return (
                <Aux>
                    <Model show ={this.state.error} modalClosed={this.errorConfirmedHander}>
                        {this.state.error ? this.state.error.message : null}
                    </Model>
                    <WrappedComponent {...this.props} />
                </Aux>
    
            )   

        }
        
    }
}

export default withErrorHandler;