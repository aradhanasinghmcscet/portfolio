import React, { Component } from 'react';
import { render } from 'react-dom';
// import { configureStore } from '@reduxjs/toolkit';
// imimportport { Provider } from 'react-redux';
// import App from './App';
//  rootReducer from './reducers';
//import Todos from './todolist/todos';

class Store extends Component {
  state = {
    todos: [
      { id: 1, content: 'Go to market' },
      { id: 2, content: 'Do shop groccery' }
    ]
  };
  deleteTodo = id => {
    console.log(id);
    console.log(this.state);
    const todoDel = this.state.todos.filter(todo => {
      return todo.id !== id;
    });
    this.setState({
      todos: todoDel
    });
  };
  render() {
    return (
      <div className='container'>
        <h1 className='center green-text'>Todo's</h1>
        <Todos todo={this.state.todos} deleteTodo={this.deleteTodo}></Todos>
      </div>
    );
  }
}

export default Store;
