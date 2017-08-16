/* global describe, it, expect */

import types from '../constants/';
import { reducer, initialState } from '.';

describe.only('reducer', () => {
	const todoText = 'A todo';

	it('should return the initial state when no action is passed', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	describe('submit todo', () => {
		it('should return the correct state', () => {
			const action = {
				type: types.SUBMIT_TODO,
				data: {
					id: 1,
					text: todoText
				}};

			const expectedState = {
				todos: [{
					id: 1,
					text: todoText					
				}],
				deleted:[],
				disabledAddTodo: true,
				disabledUndoDelete: true
			};

			expect(reducer(undefined, action)).toEqual(expectedState);
		});
	});

	describe('delete todo', () => {
		it('should return the correct state', () => {
			const action = {
				type: types.DELETE_TODO,
				data: { id: 1 }
			};

			const state = {
				todos: [{
					id: 1,
					text: todoText					
				}],
				deleted: [],
				disabledUndoDelete: true,
				disabledAddTodo: true
			};

			const expectedState = {
				todos: [],
				deleted: [{
					id: 1,
					text: todoText					
				}],
				disabledUndoDelete: false,
				disabledAddTodo: true
			};

			expect(reducer(state, action)).toEqual(expectedState);
		});
	});

	describe('undelete todo', () => {
		it('should return the correct state', () => {
			const action = {
				type: types.UNDELETE_TODO,
				data: {
					id: 2,
					text: todoText
				}
			};

			const state = {
				todos: [{
					id: 3,
					text: todoText
				}],
				deleted: [{
					id: 1,
					text: todoText
				},{
					id: 2,
					text: todoText
				}],
				disabledUndoDelete: false,
				disabledAddTodo: true
			};

			const expectedState = {
				todos: [{
					id: 3,
					text: todoText
				},{
					id: 2,
					text: todoText
				}],
				deleted:[{
					id: 1,
					text: todoText
				}],
				disabledUndoDelete: false,
				disabledAddTodo: true
			};

			expect(reducer(state, action)).toEqual(expectedState);
		});
	});

	describe('input on change', () => {
		it('should return the correct state when text exists in input', () => {
			const action = {
				type: types.INPUT_CHANGED,
				inputText: todoText
			};

			const state = {
				todos: [],
				disabledUndoDelete: true,
				disabledAddTodo: true
			};

			const expectedState = {
				todos: [],
				disabledUndoDelete: true,
				disabledAddTodo: false
			};

			expect(reducer(state, action)).toEqual(expectedState);	
		});

		it('should return the correct state when no text exists in input', () => {
			const action = {
				type: types.INPUT_CHANGED,
				inputText: ''
			};

			const state = {
				todos: [],
				disabledUndoDelete: true,
				disabledAddTodo: true
			};

			const expectedState = {
				todos: [],
				disabledUndoDelete: true,
				disabledAddTodo: true
			};

			expect(reducer(state, action)).toEqual(expectedState);	
		});
	});
});