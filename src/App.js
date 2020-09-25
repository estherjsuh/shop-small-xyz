import React from 'react';
// import { Switch, Route } from 'react-router-dom';
import { Route, Switch, withRouter} from 'react-router-dom';
import './App.css';

import Header from './components/header/header.component';
import SideDrawer from './components/side-drawer/side-drawer';
import Backdrop from './components/backdrop/backdrop.component';

import JoinUs from './components/joinus/form-joinus.component';
import About from './components/about/about.component';
import Shop from './components/shop/shop.component';
import Footer from './components/footer/footer.component';
import Contact from './components/contact/contact.component';
import ThankYou from './components/thankyou/thankyou.component';

class App extends React.Component {

  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

 backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});

  };


  componentDidUpdate(prevProps) {
    const {location} = this.props;
    if (location !== prevProps.location && this.state.sideDrawerOpen) {
      this.setState({ sideDrawerOpen: false });
    }
}

render(){
  let backDrop;

  if (this.state.sideDrawerOpen){
    backDrop = <Backdrop click={this.backdropClickHandler} />;
  }
  const {location} = this.props;

 return (
    <div style={{height: '100%'}}>
      <Header drawerClickHandler={this.drawerToggleClickHandler}/>
      <SideDrawer show={this.state.sideDrawerOpen} />
      {backDrop}
        <Switch>
          <Route exact path='/' component={Shop}/>
          <Route exact path='/joinus' component= {JoinUs}/>
          <Route exact path='/about' component={About}/>
          <Route exact path='/shop' component={Shop}/>
          <Route exact path='/contact' component={Contact}/>
          <Route exact path='/thankyou' component={ThankYou}/>
        </Switch>
      <Footer/>

    </div>
  );
  }
}

export default withRouter(App);
