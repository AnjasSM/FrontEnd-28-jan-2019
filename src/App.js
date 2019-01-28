import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import HomeMovie from './components/HomeMovie';
import HeaderMovie from './components/HeaderMovie';
import ManageMovie from './components/ManageMovie';
import ManageCategory from './components/ManageCategory';
import ConnectMovcat from './components/ConnectMovcat';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HeaderMovie navBrand={"Movies"} />
        <div>
          <Route exact path="/" component={HomeMovie} />
          <Route path="/managemovies" component={ManageMovie} />
          <Route path="/manageCategory" component={ManageCategory} />
          <Route path="/connectmovcat" component={ConnectMovcat} />
        </div>
      </div>
    );
  }
}

export default App;
