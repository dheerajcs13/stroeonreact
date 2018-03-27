import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../Navigationitems/Navigationitems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) => {
  let attachCLasses = [classes.SideDrawer ,classes.Close];
  if (props.openSideDraw){
    attachCLasses = [classes.SideDrawer ,classes.Open];
  }
  return (
    <Aux>
    <Backdrop show={props.openSideDraw} clicked={props.closeDrawer}/>
    <div className={attachCLasses.join(' ')}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
          <NavigationItems />
      </nav>
    </div>
    </Aux>
  );
}

export default sideDrawer;
