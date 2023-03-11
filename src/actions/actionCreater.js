import { ADD_TODO, DELETE_TODO } from './actionType';

let TodoId = 2;

export const addTOdo = text => ({
  type: ADD_TODO,
  id: TodoId++,
  text
});
export const deleteTodo = id => ({
  type: DELETE_TODO,
  id: id
});
