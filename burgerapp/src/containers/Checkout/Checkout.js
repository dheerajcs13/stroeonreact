import React , { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData'

class Checkout extends Component{
  state = {
    ingredients: null
  }
  componentDidMount(){
    // console.log(this.props);
    let qwery = new URLSearchParams(this.props.location.search);
    // console.log(qwerybyurl.entries());
    const ingredients = {};
    for (let param of qwery.entries()){
      console.log(param);
      ingredients[param[0]] = +param[1];
    }
    // const querystring = this.props.location.search.slice(1);
    // const queryarray = querystring.split('&');
    //
    // for (let i in queryarray ){
    //   let ing =  queryarray[i].split('=');
    //   ingredient[ing[0]] = ing[1];
    // }
    this.setState({ingredients : ingredients});
    // console.log(ingredient);
    // console.log(this.state);
  }
  continue = ()=>{
    this.props.history.replace('/checkout/contact-data');
  }
  cancel = ()=>{
    this.props.history.goBack();
  }
  render(){
    let checkoutSummary = "No ingredient is Added";
    if (this.state.ingredients){
      checkoutSummary = <CheckoutSummary
        ingredients = {this.state.ingredients}
        checkoutCancel = {this.cancel}
        checkoutContinue = {this.continue}/>
    }
    return(
      <div>
        {checkoutSummary}
        <Route path= {`${this.props.match.path}/contact-data`}
          render={()=>(<ContactData ingredients={this.state.ingredients} />)}
          />
      </div>
    );
  };
}

export default Checkout;
