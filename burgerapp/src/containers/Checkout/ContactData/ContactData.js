import React , { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-order.js';
class ContactData extends Component {
  state = {
    name : '',
    email : '',
    address : {
      street : '',
      pinCode : ''
    },
    loading : false,
  }

  placeorder = (e)=>{
    e.preventDefault();
    console.log(this.props.ingredients);
      this.setState({loading : true});
      const order = {
        ingredients : this.props.ingredients,
        price : this.state.totalPrice,
        customer : {
          userId: "xyz",
          name : this.state.name,
          email : this.state.email,
          address: {
            street : this.state.street,
            pinCode: this.state.pinCode
          }
        },
        deliveryMethod : "fastest"
      }
      console.log(order);
      axios.post('/orders.json',order)
        .then(response=>{
          // this.hideloader();
          console.log(response)
          })
        .catch(error=>{
          // this.hideloader();
          console.log(error)})
  }

  render(){
    return(
      <div className={classes.ContactData}>
        <h4>Enter your Contacts</h4>
        <form>
          <input type="text" name="name" placeholder="Your Name"/>
          <input type="email" name="email" placeholder="Your Email"/>
          <input type="text" name="street" placeholder="Street"/>
          <input type="number" pattern="[0-9]{6}" maxLength="6" name="pinCode" placeholder="pinCode"/>
          <Button btnType="Success" clicked={this.placeorder}>Order</Button>
        </form>
      </div>
    );
  }
}

export default ContactData;
