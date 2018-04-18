import React , { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
// import classes from './BurgerBuilder.css';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order.js';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const INGREDIENT_PRICE = {
  salad : 10,
  bacon : 20,
  cheese : 15,
  meat : 30
}

class BurgerBuilder extends Component {
  state = {
    ingredients:null,
    totalPrice : 40,
    canOrder : false,
    orderInProgress : false,
    loading : false,
    error : false,
  }

  componentDidMount(){
    axios.get('https://burger-app-fc908.firebaseio.com/Ingredients.json')
      .then((response)=>{
        this.setState({ingredients : response.data});
      })
      .catch(()=>{
        this.setState({error : true});
      })
  }

  initializeIngredients(){
      const ingredients =  {
        salad : 0,
        bacon : 0,
        cheese : 0,
        meat : 0
      }
    this.setState({ingredients : ingredients,totalPrice : 40});
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
  hideloader= ()=>{
    this.setState({canOrder : false})
    this.setState({loading : false})
    this.setState({orderInProgress : false});
    this.initializeIngredients();
  }
  purchaseContinuehandler = ()=>{
    // alert('You Continue!')
  //   this.setState({loading : true});
  //   const order = {
  //     ingredients : this.state.ingredients,
  //     price : this.state.totalPrice,
  //     customer : {
  //       userId: "xyz",
  //       name : "dheeraj",
  //       address: {
  //         street : "5th Block"
  //       }
  //     },
  //     deliveryMethod : "fastest"
  //   }
  //   axios.post('/orders.json',order)
  //     .then(response=>{
  //       this.hideloader();
  //       console.log(response)
  //       })
  //     .catch(error=>{
  //       this.hideloader();
  //       console.log(error)})

  const ingredientsString = [];
  for(let i in this.state.ingredients){
    ingredientsString.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.ingredients[i]));
  }
  let queryString = ingredientsString.join('&');
  this.props.history.push({
    pathname : '/checkout',
    search: '?' + queryString
  });
  }


  render(){
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo ){
      disableInfo[key] = disableInfo[key]<= 0
    }
      let orderSummary =   null;

    if(this.state.loading){
      orderSummary = <Spinner />
    }
    let burger = this.state.error ? "Ingredeints can't be loaded": <Spinner />;
    if(this.state.ingredients){
      burger = (
        <Aux>
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
      orderSummary = (<OrderSummary
                               ingredients={this.state.ingredients}
                               orderCancel={this.purchaseCancelhandler}
                               orderContinue={this.purchaseContinuehandler}
                               totalprice={this.state.totalPrice}/>);
    }
    return (
      <Aux>
        <Modal show ={this.state.orderInProgress} hidemodal={this.purchaseCancelhandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}



export default withErrorHandler(BurgerBuilder,axios);
