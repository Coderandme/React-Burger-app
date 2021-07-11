import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-oreder';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';

class ContactData extends Component{
    state ={
       orderForm: {
            name: {
                elemnetType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your Name'
                },
                value: '',
                validation: {
                    required: true
                }, 
                valid: false,
                touched:false
            },
            street: {
                elemnetType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter the Street Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            zipCode: {
                elemnetType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your Postal code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength:3,
                    maxLength:5
                },
                valid: false,
                touched:false
            },
            country: {
                elemnetType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            email:{
                elemnetType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            paymentMethod:{
                elemnetType: 'select',
                elementConfig: {
                  options: [
                      {value:'card', displayValue:'Debit/Credit Card'},
                      {value:'cash', displayValue:'Cash'},
                      {value:'google pay', displayValue:'Google Pay'}
                  ]
                },
                value: '',
                validation: {},
                valid: true
            },
       },
        
        loading:false,
        formIsValid:false
    }

    orderHandler = (event) =>{
        event.preventDefault();

        this.setState({loading:true});

        const formData={};
        for(let formElementIdentifier in this.state.orderForm ){
            formData[formElementIdentifier]= this.state.orderForm[formElementIdentifier].value;
        }
        const order= {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
       axios.post('/orders.json',order)     //Sending the data in the data base
                .then( response => {
                    this.setState({loading: false});
                    this.props.history.push("/");
                })
                .catch(error => {
                    this.setState({loading: false});
                });
    }

    checkValidity(value, rule){
     let isValid=true;

     if(rule.required){
         isValid= value.trim() != '' && isValid;
     }
     if(rule.minLength){
         isValid= value.length >= rule.minLength && isValid;
     }

     if(rule.maxLength){
        isValid= value.length <= rule.maxLength && isValid;
    }

     return isValid;
    }

    inputChangeHandeler =(event, inputIdentifier) =>{
        const updateOrderForm ={
            ...this.state.orderForm
        }
       const updatedFormElement= {...updateOrderForm[inputIdentifier]}  // for deeply coping it, that means making clone of objects inside another object
       updatedFormElement.value= event.target.value;
       updatedFormElement.valid=  this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
       updatedFormElement.touched= true;
       updateOrderForm[inputIdentifier]= updatedFormElement;
       let formIsValid= true;
       for(let inputIdentifier in updateOrderForm){
           formIsValid = updateOrderForm[inputIdentifier].valid && formIsValid;
       }
       this.setState({orderForm : updateOrderForm, formIsValid: formIsValid});
    }

    render(){
        const formElementsArray =[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                setup: this.state.orderForm[key]
            })
        }

        let form= (
          <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement =>(
               <Input 
               changed={(event) =>this.inputChangeHandeler(event, formElement.id)}
               elementType={formElement.setup.elemnetType} 
               elementConfig={formElement.setup.elementConfig} 
               value={formElement.setup.value} 
               shouldValidate={formElement.setup.validation}  // will return false if there is no validation object
               inValid={!formElement.setup.valid}
               touched={formElement.setup.touched}
               key={formElement.id}/>
            ))}
            <Button clicked={this.orderHandler} btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
          </form>);

        if(this.state.loading){
            form= <Spinner />
        }
        return(
            <div className={classes.ContactData}>
              <h1>Enter your contact data</h1>
              {form}
            </div>
        );
    }
}

const mapStateToProps = state=>{
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

export default connect(mapStateToProps)(ContactData);