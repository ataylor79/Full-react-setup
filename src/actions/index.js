import 'whatwg-fetch';
import types from '../constants/';

const { API_URL } = process.env;

/**
 * Set request headers based on method and set parameters
 * @param  {STRING} method request method
 * @param  {OBJECT} params body data parameters
 * @return {OBJECT}        Object for request header
 */
const setHeaders = (method, params) => (Object.assign({},
	{ method },
	{ headers: { 'Content-Type': 'application/json' }},
	params ? { body: JSON.stringify({ ...params }) } : {}
));

/**
 * Generic HTTP requests
 * @param  {STRING}   options.method request method 
 * @param  {OBJECT}   options.params Request body data
 * @param  {STRING}   options.id     Todo ID
 * @param  {STRING}   type           action type
 * @param  {FUNCTION} dispatch       redux disaptch function
 * @return {PROMISE}                 Request Promise function
 */
const request = ({ method, params={}, id='' }, type, dispatch) => fetch(`${API_URL}/${id}`, setHeaders(method, params))
		.then(resp => resp.json())
		.then(data => dispatch({ type, data}))
		.catch(err => console.log(err)); //eslint-disable-line 


const actions = {
	loadTodos() {
		return dispatch => request({ method:'GET'}, types.LOAD_TODOS, dispatch);
	},
	submitTodo(name) {
		return dispatch => request({ method: 'POST', params: { name }}, types.SUBMIT_TODO, dispatch);
	},
	deleteTodo(id) {
		return dispatch => request({ method: 'DELETE', id}, types.DELETE_TODO, dispatch);
	},
	undeleteTodo(name) {
		return dispatch => request({ method: 'POST', params: { name }}, types.UNDELETE_TODO, dispatch);
	},
	inputChanged(inputText) {
		return {
			type: types.INPUT_CHANGED,
			inputText
		};
	}
};

export default actions;