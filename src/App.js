/*global React,  AddTodo,  Todolist */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddTodo from './components/addTodo';
import Todolist from './components/todoList';
import actions from './actions/';

import './client/stylesheets/main.scss';

export const App = ({
	loadTodos, 
	submitTodo, 
	deleteTodo, 
	undeleteTodo, 
	todos, 
	deleted,
	inputChanged, 
	disabledAddTodo, 
	disabledUndoDelete }) => (
	<div className="container">
		<h1 className="header">My Todo list</h1>
		<AddTodo 
			submitTodo={submitTodo} 
			undeleteTodo={undeleteTodo}
			inputChanged={inputChanged}
			disabledAddTodo={disabledAddTodo}
			disabledUndoDelete={disabledUndoDelete}
			deleted={deleted} />
		<Todolist loadTodos={loadTodos} todos={todos} deleteTodo={deleteTodo} />
	</div>
);

App.propTypes = {
	loadTodos: PropTypes.func.isRequired,
	submitTodo: PropTypes.func.isRequired,
	deleteTodo: PropTypes.func.isRequired,
	undeleteTodo: PropTypes.func.isRequired,
	inputChanged: PropTypes.func.isRequired,
	disabledAddTodo: PropTypes.bool.isRequired,
	disabledUndoDelete: PropTypes.bool.isRequired,
	todos: PropTypes.arrayOf(PropTypes.shape(
		{
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		}
	)).isRequired,
	deleted: PropTypes.arrayOf(PropTypes.shape(
		{
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired
		}
	)).isRequired
};


const mapStateToProps = state => state.todoListApp;

const mapDispatchToProps = dispatch => ({
	loadTodos: () => dispatch(actions.loadTodos()),
	submitTodo: text => { if (text) { dispatch(actions.submitTodo(text)); }},
	deleteTodo: id => dispatch(actions.deleteTodo(id)),
	undeleteTodo: name => dispatch(actions.undeleteTodo(name)),
	inputChanged: text => dispatch(actions.inputChanged(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);