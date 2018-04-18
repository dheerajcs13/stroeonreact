import React , { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';


class Orders extends Component{
  state = {
    orders : [],
    loading : false
  }
  componentDidMount(){
    axios.get('/orders.json')
      .then((response)=>{
        console.log(response.data);
        this.setState({orders : response.data});
      })
      .catch(()=>{
        this.setState({error : true});
      })
  }
  render(){
    return (
      <div>
        <Order />
        <Order />
      </div>
    );
  }
}

export default Orders;
