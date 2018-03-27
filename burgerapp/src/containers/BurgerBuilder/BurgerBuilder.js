import React , { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
// import classes from './BurgerBuilder.css';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICE = {
  salad : 10,
  bacon : 20,
  cheese : 15,
  meat : 30
}


class BurgerBuilder extends Component {
  state = {
    ingredients:{
      salad : 0,
      bacon : 0,
      cheese : 0,
      meat : 0
    },
    totalPrice : 40,
    canOrder : false,
    orderInProgress : false
  }

  checkCanOrder(ing){
    let orderamount = Object.keys(ing)
        .map(ingk=>{
          return ing[ingk]
        })
        .reduce((acc,crr)=>{
          return acc+crr
        },0);
    this.setState({canOrder : (orderamount > 0)});
  }

  addIngredientHandler = (type)=>{
    const oldCount = this.state.ingredients[type];
    const newCount = oldCount + 1;
    const updatedingredients = {
      ...this.state.ingredients
    }
    updatedingredients[type] = newCount;
    const priceAdd = INGREDIENT_PRICE[type] ;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdd;
    this.setState({
      ingredients : updatedingredients,
      totalPrice : newPrice
    })
    this.checkCanOrder(updatedingredients);
  }
  removeIngredientHandler = (type)=>{
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
      return;
    }
    const newCount = oldCount - 1;
    const updatedingredients = {
      ...this.state.ingredients
    }
    updatedingredients[type] = newCount;
    const priceRemove = INGREDIENT_PRICE[type] ;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceRemove;
    this.setState({
      ingredients : updatedingredients,
      totalPrice : newPrice
    })
    this.checkCanOrder(updatedingredients);
  }

  purchasehandler = ()=>{
    this.setState({orderInProgress : true});
  }

  purchaseCancelhandler = ()=>{
    this.setState({orderInProgress : false});
  }

  purchaseContinuehandler = ()=>{
    alert('You Continue!')
    this.setState({orderInProgress : false});
  }


  render(){
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo ){
      disableInfo[key] = disableInfo[key]<= 0
    }
    return (
      <Aux>
        <Modal show ={this.state.orderInProgress} hidemodal={this.purchaseCancelhandler}>
            <OrderSummary
            ingredients={this.state.ingredients}
            orderCancel={this.purchaseCancelhandler}
            orderContinue={this.purchaseContinuehandler}
            totalprice={this.state.totalPrice}/>
        </Modal>
        <Burger ingredients= {this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemove={this.removeIngredientHandler}
          disabled={disableInfo}
          price = {this.state.totalPrice}
          validorder = {this.state.canOrder}
          ordering = {this.purchasehandler}/>

      </Aux>
    );
  }
}



export default BurgerBuilder;
