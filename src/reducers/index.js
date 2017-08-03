import types from '../constants/';

export const initialState = {
	todos: [],
	deleted: [],
	disabledAddTodo: true,
	disabledUndoDelete: true
};

export const reducer = (state = initialState, action) => {
	switch(action.type) {

	case types.LOAD_TODOS:
		return {
			...state,
			todos: [
				...action.data
			]
		};

	case types.SUBMIT_TODO:
		return {
			...state,
			todos: [
				...state.todos,
				{
					id: action.id,
					done: false,
					name: action.name
				}
			],
			disabledAddTodo: true
		};

	case types.DELETE_TODO:
		return {
			...state,
			todos: [
				...state.todos.filter(todo => todo.id !== action.id)
			],
			deleted: [
				...state.deleted,
				...state.todos.filter(todo => todo.id === action.id)
			],
			disabledUndoDelete: false
		};

	case types.UNDELETE_TODO:
		return {
			...state,
			todos: [
				...state.todos,
				state.deleted.length ? state.deleted.pop() : {}
			],
			disabledUndoDelete: state.deleted.length === 0
		};

	case types.INPUT_CHANGED:
		return {
			...state,
			disabledAddTodo: action.inputText == ''
		};

	default:
		return state;
	}
};

export default reducer;