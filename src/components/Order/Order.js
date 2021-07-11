import React from 'react';
import classes from './Order.css';


const order = (props) =>{

  const ingredients=[];

  for(let ingredientname in props.ingredients){
         ingredients.push(
           {
             name: ingredientname,
             amount: props.ingredients[ingredientname]
           }
         );
  }

  const ingredientOutput = ingredients.map(ig =>{
  return <span style={{
                textTransform: 'capitalize',
                margin: '0 8px',
                display: 'inline-block',
                border: '1px solid #ccc',
                padding: '5px'
                 }} 
                key={ig.name}>{ig.name} : {ig.amount} 
          </span>
  });

    return(
        <div className={classes.Order}>
          <p>Ingredients : {ingredientOutput}</p>
          <p>Total price Rs {props.price.toFixed(2)}</p>
        </div>
    );
}

export default order;




