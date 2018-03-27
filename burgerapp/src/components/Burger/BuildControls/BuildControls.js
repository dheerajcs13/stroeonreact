import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const ingControl  = [
  {label: "Cheese" , type: "cheese"},
  {label: "Salad" , type: "salad"},
  {label: "Meat" , type: "meat"},
  {label: "Bacon" , type: "bacon"}
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price : {props.price.toFixed(2)}</p>
        {ingControl.map(ctrl =>
          <BuildControl key={ctrl.label} label={ctrl.label}
          added = {() => props.ingredientAdded(ctrl.type)}
          removed = {() => props.ingredientRemove(ctrl.type)}
          disabled = {props.disabled[ctrl.type]}
          />
        )}
        <button
        className={classes.OrderButton}
        disabled = {!props.validorder}
        onClick ={props.ordering}>
            Order Now
        </button>
    </div>
  );
}

export default BuildControls;
