import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTOdo } from '../actions/actionCreater';
import { bindActionCreators } from 'redux';
class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todotext: ''
    };
    this.onChangeTodoText = this.onChangeTodoText.bind(this);
  }
  onChangeTodoText(e) {
    this.setState({
      todotext: e.target.value
    });
  }
  render() {
    return (
      <div className='form-group row'>
        <div className='col-sm-10'>
          <input
            type='text'
            className='form-control blue'
            id='inputEmail3'
            placeholder='Add TODO here.....'
            onChange={this.onChangeTodoText}
            value={this.state.todotext}
          />
          <button
            onClick={() => this.setState({ todotext: '' })}
            type='button'
            className='btn btn-danger'
          >
            Cancel
          </button>
          <button
            onClick={() => {
              this.props.addTOdo(this.state.todotext);
              this.setState({ todotext: '' });
            }}
            type='button'
            className='btn btn-success'
          >
            Add Todo
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      addTOdo
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(CreateTodo);
