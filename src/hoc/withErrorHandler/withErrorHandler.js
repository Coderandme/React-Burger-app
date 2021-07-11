import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux1';

const withErrorhandler = (WrappedComponent, axios) =>{
    return class extends Component {
        state = {
            error:null
            }

        componentWillMount(){
           this.reqIntercetors= axios.interceptors.request.use(req =>{
                this.setState({error:null})
                return req;
            });
            this.resIntercetors=axios.interceptors.response.use( res => res, error =>{
                   this.setState({error:error})
            });
        }

        componentWillUnmount(){
          axios.interceptors.request.eject(this.reqIntercetors);
          axios.interceptors.response.eject(this.resIntercetors);
        }

        errorConfirmedHnadler = () => {
            this.setState({error:null});
        }

        render(){
            return(
            <Aux>
                <Modal modalClosed={this.errorConfirmedHnadler} show={this.state.error}>
                     {this.state.error? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>
            )
        }
    }
}
    
  

export default withErrorhandler;