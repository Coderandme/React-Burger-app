import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route, Switch} from 'react-router-dom';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>    {/* switch is not required here . */}
            <Route path="/" exact component={BurgerBuilder} />  
            <Route path="/orders" component={Orders} /> 
            <Route path="/checkout" component={Checkout} />
          </Switch>  
        </Layout>
      </div>
    );
  }
}

export default App;
