/* global expect, it, xit, describe, afterEach */
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import actions from '.';
import types from '../constants/';
import { initialState } from '../reducers/';


const { API_URL } = process.env;

axios.defaults.baseUrl = API_URL;
axios.defaults.timeout = 5000;

const mock = new MockAdapter(axios);
const mockStore = configureStore([thunk]);

describe('Actions', () => {
	const todoText = 'TODO TESTS';

	it('should have a loadTodos function', () => {
		expect(actions.loadTodos()).toBeInstanceOf(Function);
	});

	it('should load all todos', () => {
		const expectedAction = [{
			type: types.LOAD_TODOS,
			data: [{
				id: '1',
				done: false,
				name: todoText
			}]
		}];

		mock.onGet('/todos')
			.reply(config => {
				console.log('config', config); //eslint-disable-line
				return [200, { data: expectedAction }];
			});

		const store = mockStore(initialState);
		
		return store.dispatch(actions.loadTodos(todoText)).then(() => {
			expect(store.getActions()[0]).toEqual(expectedAction);
		});
	});

	xit('should create an action to add a todo', () => {
		const expectedAction = [{
			type: types.SUBMIT_TODO,
			data: {
				id: '2',
				done: false,
				name: todoText
			}
		}];

		mock.onPost('/todos', { data: { name: todoText }})
			.reply(200, { data: expectedAction });

		const store = mockStore(initialState);
		
		return store.dispatch(actions.submitTodo(todoText)).then(() => {
			expect(store.getActions()).toEqual(expectedAction);
		});
	});

	xit('should create an action to delete a todo', () => {
		const todoId = 2;
		const expectedAction = [{
			type: types.DELETE_TODO,
			data: {
				done: false, 
				id: '2', 
				name: todoText
			}
		}];

		mock.onDelete('/todos')
			.reply(200, { data: expectedAction });

		const store = mockStore(initialState);

		return store.dispatch(actions.deleteTodo(todoId)).then(() => {
			expect(store.getActions()).toEqual(expectedAction);
		});
	});

	xit('should create an action to un delete a todo', () => {
		const expectedAction = [{
			type: types.UNDELETE_TODO,
			data: {
				id: '2',
				done: false, 
				name: todoText
			}
		}];

		mock.onPost('/todos', { data: { name: todoText }})
			.reply(200, { data: expectedAction });

		const store = mockStore(initialState);
		
		return store.dispatch(actions.undeleteTodo(todoText)).then(() => {
			expect(store.getActions()).toEqual(expectedAction);
		});
	});

	xit('should create an action to register an input change', () => {
		const expectedAction = {
			type: types.INPUT_CHANGED,
			inputText: todoText
		};

		expect(actions.inputChanged(todoText)).toEqual(expectedAction);
	});

});