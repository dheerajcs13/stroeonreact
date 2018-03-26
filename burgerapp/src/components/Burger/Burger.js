import React from 'react';
import classes from './Burger.css'
import BurgerIng from './BurgerIng/BurgerIng';
const Burger = (props) => {
  return (
    <div className= {classes.Burger}>
      <BurgerIng type="bread-top" />
      <BurgerIng type="cheese" />
      <BurgerIng type="bread-bottom" />
    </div>
  );
}

export default Burger;
