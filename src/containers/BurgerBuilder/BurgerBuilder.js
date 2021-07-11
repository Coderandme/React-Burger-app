import React, { Component } from 'react';
import Aux from '../../hoc/Aux1';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import  Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-oreder';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorhandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';


class BurgurBuilder extends Component  {

    state={
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount (){ 
        
        // axios.get("https://burger-builder-59e80.firebaseio.com/Indegridents.json")    // Getting the data from database
        // .then(response =>{
        //        this.setState({ingredients: response.data})
        // })
        // .catch(error => {
        //     this.setState({error: true});
        // });
    }

    updatedPurchasesState(ingredients){
        const sum=Object.keys(ingredients).map(igkey =>{
           return ingredients[igkey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);

         return sum>0
    }



    purchaseHandler= () => {
        this.setState({purchasing:true});
    }

    purchaseCancelHandler= ()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler= ()=>{
        
          this.props.history.push('/checkout');
    }

    render(){

        let orderSummary=null;
       
        const disabledInfo={
            ...this.props.ings
        };
         
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key] <=0;
        } 

       
        let burger= this.state.error ? <p>ingredients can't be loaded</p> : <Spinner/>;

        if(this.props.ings){
            burger=(
                <Aux>
                  <Burger ingredients={this.props.ings} />
                  <BuildControls 
                   ingredientAdder={this.props.onIngredientAdded}
                   ingredientRemoved={this.props.onIngredientRemoved}
                   disabled={disabledInfo}
                   purchasable={!this.updatedPurchasesState(this.props.ings)} // we want to execute it here itself
                   ordered={this.purchaseHandler}
                   price={this.props.price}
                 />
                </Aux>  );  

                 orderSummary= <OrderSummary
                 price={this.props.price}
                 purchaseContinued={this.purchaseContinueHandler} 
                 purchasaeCancelled={this.purchaseCancelHandler}
                 ingredients={this.props.ings}
                 />;

                 if(this.state.loading){
                    orderSummary= <Spinner />;
                }
        }

        return(
            <Aux>
                <Modal modalClosed={this.purchaseCancelHandler} show={this.state.purchasing}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state=>{
       return {
           ings: state.ingredients,
           price: state.totalPrice
       };
}

const mapDispatchToProps = dispatch =>{
     return{
         onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENTS, ingredientName:ingName}),
         onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENTS, ingredientName:ingName})
     };
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorhandler(BurgurBuilder, axios));