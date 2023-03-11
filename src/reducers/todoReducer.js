import { ADD_TODO, DELETE_TODO } from '../actions/actionType';

const INITIAL_DATA = [];
const todoReducer = (state = INITIAL_DATA, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text
        }
      ];
    case DELETE_TODO:
      const numIndex = parseInt(action.id);
      return state.filter(todo => todo.id !== numIndex);
      console.log('DEleted:' + state);
    default:
      return state;
      console.log('DEleted:' + state);
  }
};

export default todoReducer;
