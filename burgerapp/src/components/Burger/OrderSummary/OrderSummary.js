import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'
const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
        .map(ingky => {
          return (
            <li key={ingky}>
              <span style = {{textTransform : 'capitalize'}}>{ingky}: </span>
              {props.ingredients[ingky]}
            </li>
          )
        })
  return(
    <Aux>
      <h3>Your Order</h3>
      <p>Here is your Burger</p>
        <ul>
              {ingredientSummary}
        </ul>
      <p>proceed to checkout</p>
      <p>Total price : {props.totalprice}</p>
      <Button btnType='Danger' clicked={props.orderCancel}>Cancel</Button>
      <Button btnType='Success' clicked={props.orderContinue}>Continue</Button>
    </Aux>
  );
}

export default orderSummary;
