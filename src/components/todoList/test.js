/* global describe, it, expect, jest */

import React from 'react';
import { shallow } from 'enzyme';
import TodoList from '.';

describe('Todolist component', () => {
	const deleteMock = jest.fn();
	const props = {
		todos: [{
			id: 1,
			text: 'A todo'
		}],
		deleteTodo: deleteMock
	};

	const component = shallow(<TodoList todos={props.todos} deleteTodo={deleteMock} />);

	it('renders correctly', () => {
		expect(component.exists()).toEqual(true);
	});

	it('should display a todo when passed as a prop', () => {
		expect(component.find('.todo-text').text()).toEqual(props.todos[0].text);
	});

	it('should call the deleteTodo function when the delete button is clicked', () => {
		expect(deleteMock.mock.calls.length).toEqual(0);
		component.find('.todo-delete').simulate('click');
		expect(deleteMock.mock.calls.length).toEqual(1);
	});
});