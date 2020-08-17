import React from 'react';

import './App.css';

import Header from './components/header/header.component';
import JoinUs from './components/joinus/form-joinus.component';


class App extends React.Component {
  //eslint-disable-next-line
  constructor(props){
    super(props);
  }

render(){
 return (
    <div>
      <Header/>
      <JoinUs/>
    </div>
  );
  }
}

export default App;
