import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTodo } from '../actions/actionCreater';
// import { SHOW_ALL } from '../actions/actionType';
import { bindActionCreators } from 'redux';

class TodoList extends Component {
  render() {
    return (
      <div className='container'>
        <ul class='collection'>
          {this.props.todos.map(todo => (
            <li key={todo.id} class='collection-item '>
              <span className='index'>{todo.id}</span>
              <p>{todo.text}</p>
              <a href='#!' className='secondary-content'>
                <i className='material-icons add green'>add</i>
              </a>
              <a
                href='#!'
                onClick={() => this.props.deleteTodo(todo.id)}
                className='secondary-content'
              >
                <i className='material-icons delete red'>delete</i>
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// const getVisibleTodos = (todos, filter) => {
//   switch(f)
// }
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      deleteTodo
    },
    dispatch
  );
};
export default connect(mapDispatchToProps)(TodoList);
