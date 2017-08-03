
import React from 'react';
import PropTypes from 'prop-types';

class TodoList extends React.Component {

	constructor (props) {
		super(props);
		props.loadTodos();
	}

	render() {
		const todoItems = this.props.todos.map(todo => (
			<li key={todo.id}>
				<button 
				type='button' 
				className='todo-delete button button__delete'
				onClick={() => this.props.deleteTodo(todo.id)}
				> Delete </button>
				<div className="todo-text">{todo.name}</div>
			</li>
		));

		return (
			<ul className="list list--centered list__todo-list">
				{todoItems}
			</ul>
		);
	}

}

TodoList.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.shape(
		{
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		}
	)).isRequired,
	loadTodos: PropTypes.func.isRequired,
	deleteTodo: PropTypes.func.isRequired
};

export default TodoList;