import React from 'react';
import classes from './Burger.css'
import BurgerIng from './BurgerIng/BurgerIng';
const Burger = (props) => {
  let addedIngredient = Object.keys(props.ingredients)
        .map( igkey => {
          // console.log("props.ingredients[igkey]");
          // console.log( props.ingredients[igkey]);
          return [...Array( props.ingredients[igkey])].map((_,i)=>{
            return <BurgerIng key={ igkey + i} type={igkey} />;
          });
        }).reduce((strt,curel)=>{
          return strt.concat(curel);
        },[]);
    if(addedIngredient.length === 0 ){
      addedIngredient = <p>Plaese add something</p>
    }
  return (
    <div className= {classes.Burger}>
    <BurgerIng type="bread-top" />
    {addedIngredient}
    <BurgerIng type="bread-bottom" />
    </div>
  );
}

export default Burger;
