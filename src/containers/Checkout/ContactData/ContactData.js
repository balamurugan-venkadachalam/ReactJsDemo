import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'

class ComponentData extends Component {

    sate = {
        name:'',
        email:'',
        address:{
            street:'',
            postcode:''
        }
    }

    orderHandler=(event)=>{
        event.preventDefault();
        console.log(this.props.ingredients);

    }

    render(){
        console.log('inside ComponentData render method');
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact data </h4>
                <form>
                    <input type="text" name="name" placeholder="Your name place" />
                    <input type="text" name="email" placeholder="Your email id" />
                    <input type="text" name="street" placeholder="Your street" />
                    <input type="text" name="postcode" placeholder="Your post code" />
                    <Button btnType="Success" clicked={this.orderHandler}> Order</Button>
                </form>
            </div>
        );
    }

}

export default ComponentData;