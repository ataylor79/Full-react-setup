import React from 'react';
import PropTypes from 'prop-types';

const AddTodo = ({ deleted, submitTodo, undeleteTodo, inputChanged, disabledAddTodo, disabledUndoDelete }) => {
	let input;
	let lastDeleted = disabledUndoDelete ? {} : deleted[deleted.length - 1].name;

	return (
			<form onSubmit={e => {
				e.preventDefault();
				if(!disabledAddTodo) {
					submitTodo(input.value);
					input.value='';
				}
			}}>
				<ul className="list list--centered">
					<li>
						<input onChange={() => inputChanged(input.value)} className="todo-input input" ref={el => { input = el;}} />
					</li>
					<li>
						<button disabled={disabledAddTodo} type="submit" className="todo-submit button buttom--margin">
							Add Todo
						</button>
						<button disabled={disabledUndoDelete} onClick={() => undeleteTodo(lastDeleted)} className="todo-undelete button button--margin">
							undelete Todo
						</button>
					</li>
				</ul>
			</form>
	);
};

AddTodo.propTypes = {
	submitTodo: PropTypes.func.isRequired,
	undeleteTodo: PropTypes.func.isRequired,
	inputChanged: PropTypes.func.isRequired,
	disabledAddTodo: PropTypes.bool.isRequired,
	disabledUndoDelete: PropTypes.bool.isRequired,
	deleted: PropTypes.arrayOf(PropTypes.shape(
		{
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		}
	)).isRequired
};

export default AddTodo;