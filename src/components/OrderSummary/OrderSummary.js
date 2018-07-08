import React from 'react';
import Aux from '../../hoc/Aux';
import Button from '../UI/Button/Button';


// Fucntional component not assoicated with any stage, 
// recive some props and return JSX code
const orderSummary =(props) => {
    const ingredientsSummary = Object.keys(props.ingredients)
            .map((giKey) => {
                return (
                    <li key={giKey}>
                        <span style={{textTransform:'capitalize'}}>{giKey}</span> - {props.ingredients[giKey]}
                    </li>
                );
            });
        console.log(ingredientsSummary);
    return(
    <Aux>
        <h3>Your order</h3>
        <p>A delicious burger with following ingredients</p>
        <ul>
            {ingredientsSummary}
        </ul>
        <p><strong>Total price : {props.price}</strong></p>
        <Button btnType="Danger" clicked={props.purchaseCancel}>Cancel</Button>
        <Button btnType="Success" clicked={props.purchaseContinue}>Continue</Button>
    </Aux>
    );

};

export default orderSummary;