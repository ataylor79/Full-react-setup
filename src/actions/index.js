import 'whatwg-fetch';
import types from '../constants/';

let todoId;
const { API_URL } = process.env;

const nextId = (currId = todoId) => {
	todoId = (parseInt(currId) + 1).toString();
	return todoId;
};

const actions = {
	loadTodos() {
		return dispatch => fetch(API_URL)
			.then(resp => resp.json())
			.then(data => { todoId = data.slice(-1)[0].id; return dispatch({ type: types.LOAD_TODOS, data});})
			.catch(err => console.log(err)); //eslint-disable-line
	},
	submitTodo(name) {
		return {
			type: types.SUBMIT_TODO,
			id: nextId(),
			name
		};
	},
	deleteTodo(id) {
		return {
			type: types.DELETE_TODO,
			id
		};
	},
	undeleteTodo() {
		return {
			type: types.UNDELETE_TODO
		};
	},
	inputChanged(inputText) {
		return {
			type: types.INPUT_CHANGED,
			inputText
		};
	}
};

export default actions;