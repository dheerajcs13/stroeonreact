import React , {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux.js'

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component{
    state = {
      error : null
    }
    componentWillMount (){
      this.reqInterceptor = axios.interceptors.request.use(req=>{
        this.setState({error : null});
        console.log('request object req',req)
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res=>res,error=>{
        this.setState({error: error});
        console.log(error);
      });
    }
    acknowledgeError= ()=>{
      this.setState({error: null});
    }
    componentWillUnmount(){
       axios.interceptors.request.eject(this.reqInterceptor);
       axios.interceptors.response.eject(this.resInterceptor);
    }
    render(){
    let errormessage = "something haapens";
     if(this.state.error){
      errormessage =this.state.error.message
     }
      return(
        <Aux>
          <Modal show = {this.state.error} hidemodal= {this.acknowledgeError}>
            {errormessage}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default withErrorHandler;
