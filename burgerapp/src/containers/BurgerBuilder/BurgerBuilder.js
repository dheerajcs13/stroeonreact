import React , { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

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
    totalPrice : 40
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
        <Burger ingredients= {this.state.ingredients}/>
        <BuildControls ingredientAdded={this.addIngredientHandler} ingredientRemove={this.removeIngredientHandler} disabled={disableInfo}/>
      </Aux>
    );
  }
}



export default BurgerBuilder;
