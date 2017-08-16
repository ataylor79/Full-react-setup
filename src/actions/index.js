import axios from 'axios';
import types from '../constants/';

const { API_URL } = process.env;

const instance = axios.create({
	baseURL: API_URL,
	timeout: 2000,
	responseType: 'json'
});

/**
 * Generic HTTP requests
 * @param  {STRING}   options.method request method 
 * @param  {OBJECT}   options.data   Request body data
 * @param  {STRING}   options.id     Todo ID
 * @param  {STRING}   type           action type
 * @param  {FUNCTION} dispatch       redux disaptch function
 * @return {PROMISE}                 Request Promise function
 */
const request = ({ method, id='', data=''}, type, dispatch) => instance.request('/', {
	url: (id) ? `todos/${id}` : 'todos',
	method,
	data
})
.then(({data}) => dispatch({ type, data}))
.catch(err => console.log(err)); //eslint-disable-line 

const actions = {
	loadTodos() {
		return dispatch => request({ method:'GET'}, types.LOAD_TODOS, dispatch);
	},
	submitTodo(name) {
		return dispatch => request({ method: 'POST', data: { name }}, types.SUBMIT_TODO, dispatch);
	},
	deleteTodo(id) {
		return dispatch => request({ method: 'DELETE', id}, types.DELETE_TODO, dispatch);
	},
	undeleteTodo(name) {
		return dispatch => request({ method: 'POST', data: { name }}, types.UNDELETE_TODO, dispatch);
	},
	inputChanged(inputText) {
		return {
			type: types.INPUT_CHANGED,
			inputText
		};
	}
};

export default actions;