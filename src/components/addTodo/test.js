/* global describe, it, expect, jest, beforeEach */

import React from 'react'; 
import { shallow, mount } from 'enzyme';
import AddTodo from '.';

describe('AddTodo component', () => {
	let component;
	const disabled = true;
	const enabled = false;
	const submitMock = jest.fn();
	const undeleteMock = jest.fn();
	const inputMock = jest.fn();

	beforeEach(() => {
		component = shallow(<AddTodo 
			submitTodo={submitMock} 
			undeleteTodo={undeleteMock}
			inputChanged={inputMock} 
			disabledAddTodo={disabled}
			disabledUndoDelete={disabled}
			deleted={[]} />);
	});

	it('should render correctly', () => expect(component.exists()).toEqual(true));
	it('should have one input', () => expect(component.find('.todo-input').length).toEqual(1));

	describe('Add todo button', () => {
		it('should exist', () => expect(component.find('.todo-submit').length).toEqual(1));

		it('should be disabled', () => expect(component.find('.todo-submit').prop('disabled')).toEqual(true));

		it('should not call the submit function when disabled', () => {
			component = mount(<AddTodo 
				submitTodo={submitMock} 
				undeleteTodo={undeleteMock}
				inputChanged={inputMock} 
				disabledAddTodo={disabled}
				disabledUndoDelete={disabled}
				deleted={[]} />);

			expect(submitMock.mock.calls.length).toEqual(0);
			component.find('form').simulate('submit');
			expect(submitMock.mock.calls.length).toEqual(0);
		});

		it('should call the submitTodo function when enabled and clicked', () => {
			component = mount(<AddTodo 
				submitTodo={submitMock} 
				undeleteTodo={undeleteMock}
				inputChanged={inputMock} 
				disabledAddTodo={enabled}
				disabledUndoDelete={disabled}
				deleted={[]} />);

			expect(submitMock.mock.calls.length).toEqual(0);
			component.find('form').simulate('submit');
			expect(submitMock.mock.calls.length).toEqual(1);

		});
	});

	describe('Undelete todo button', () => {
		it('should exist', () => expect(component.find('.todo-undelete').length).toEqual(1));

		it('should not call the undeleteTodo function when disabled and clicked', () => {
			component = mount(<AddTodo 
				submitTodo={submitMock} 
				undeleteTodo={undeleteMock}
				inputChanged={inputMock} 
				disabledAddTodo={disabled}
				disabledUndoDelete={disabled}
				deleted={[]} />);

			expect(undeleteMock.mock.calls.length).toEqual(0);
			component.find('.todo-undelete').simulate('click');
			expect(undeleteMock.mock.calls.length).toEqual(0);

		});

		it('should call the undeleteTodo function when enabled and clicked', () => {
			component = mount(<AddTodo 
				submitTodo={submitMock} 
				undeleteTodo={undeleteMock}
				inputChanged={inputMock} 
				disabledAddTodo={disabled}
				disabledUndoDelete={enabled}
				deleted={[{
					id: '1',
					name: 'A todo'
				}]} />);

			expect(undeleteMock.mock.calls.length).toEqual(0);
			component.find('.todo-undelete').simulate('click');
			expect(undeleteMock.mock.calls.length).toEqual(1);

		});
	});
});