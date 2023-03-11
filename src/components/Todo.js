import React, { Component } from 'react';
import CreateTodo from './../todocontainer/CreateTodo';
import TodoList from './../todocontainer/TodoList';
class Todo extends Component {
  render() {
    return (
      <div className='container' style={{ marginTop: '80px' }}>
        <div className='row'>
          <div className='col-lg-10 offset-lg-2 col-md-10 col-sm-12 col-xs-12'>
            <CreateTodo />
          </div>
          {/* <div className='col-lg-10 offset-lg-2 col-md-10 col-sm-12 col-xs-12'>
            <TodoList />
          </div> */}
        </div>
      </div>
    );
  }
}

export default Todo;
