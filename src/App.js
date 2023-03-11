import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Error from './components/Error';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Todo from './components/Todo';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header className='header' />
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/About' component={About} />
            <Route path='/Blog' component={Blog} />
            <Route path='/Portfolio' component={Portfolio} />
            <Route path='/Contact' component={Contact} />
            <Route path='/Todo' component={Todo} />
            <Route component={Error} />
          </Switch>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
