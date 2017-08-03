/* global expect, it, describe */
import actions from '.';
import types from '../constants/';

describe('Actions', () => {
	const todoText = 'A todo';

	it('should create an action to add a todo', () => {
		const expectedAction = {
			type: types.SUBMIT_TODO,
			id: 1,
			text: todoText
		};

		expect(actions.submitTodo(todoText)).toEqual(expectedAction);
	});

	it('should create an action to delete a todo', () => {
		const todoId = 1;
		const expectedAction = {
			type: types.DELETE_TODO,
			id: todoId
		};

		expect(actions.deleteTodo(todoId)).toEqual(expectedAction);
	});

	it('should create an action to un delete a todo', () => {
		const expectedAction = {
			type: types.UNDELETE_TODO
		};

		expect(actions.undeleteTodo()).toEqual(expectedAction);
	});

	it('should create an action to register an input change', () => {
		const expectedAction = {
			type: types.INPUT_CHANGED,
			inputText: todoText
		};

		expect(actions.inputChanged(todoText)).toEqual(expectedAction);
	});

});