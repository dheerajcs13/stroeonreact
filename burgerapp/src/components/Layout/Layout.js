import React , { Component} from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
      sideDrawer : false
    }
    sideDrawerClosedHandler = () =>{
      this.setState({sideDrawer : false});
    }
    sideDrawerToggleHandler = () =>{
      this.setState((prevState)=>{
        return ({sideDrawer : !prevState.sideDrawer} );
      });
    }
    render(){
      return(
        <Aux>
          <Toolbar openSidebar = {this.sideDrawerToggleHandler}/>
          <SideDrawer openSideDraw={this.state.sideDrawer}
           closeDrawer = {this.sideDrawerClosedHandler}/>
          <main className = {classes.Content}>
            {this.props.children}
          </main>
        </Aux>
      );
    }
}


export default Layout;
