import React, { Component } from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'
class OrderSummary extends Component {
  componentWillUpdate(){
    console.log("ordersummary updated");
  }
// this could be functional component 

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
          .map(ingky => {
            return (
              <li key={ingky}>
                <span style = {{textTransform : 'capitalize'}}>{ingky}: </span>
                {this.props.ingredients[ingky]}
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
          <p>Total price : {this.props.totalprice}</p>
          <Button btnType='Danger' clicked={this.props.orderCancel}>Cancel</Button>
          <Button btnType='Success' clicked={this.props.orderContinue}>Continue</Button>
        </Aux>
      );
  }
}

export default OrderSummary;
