import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './components/header/header.component';
import JoinUs from './components/joinus/form-joinus.component';
import About from './components/about/about.component';
import Shop from './components/shop/shop.component';

class App extends React.Component {
  //eslint-disable-next-line
  constructor(props){
    super(props);
  }

render(){
 return (
    <div>
      <Header/>
        <Switch>
          <Route exact path='/joinus' component= {JoinUs}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/shop' component={Shop}/>

        </Switch>


    </div>
  );
  }
}

export default App;
