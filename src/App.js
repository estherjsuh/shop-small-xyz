import React from 'react';

import './App.css';

import JoinUs from './components/joinus/form-joinus.component';


class App extends React.Component {
  //eslint-disable-next-line
  constructor(props){
    super(props);
  }

render(){
 return (
    <div>
      <JoinUs/>
    </div>
  );
  }
}

export default App;
