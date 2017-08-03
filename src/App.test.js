/* global it, expect, jest */
import React from 'react'; 
import { shallow } from 'enzyme';
import { App } from './App';
import { initialState } from './reducers/';

it('renders without crashing', () => {
	const mockFunction = jest.fn();
	const mockBool = true;

	const component = shallow(
		<App 
			state={initialState}
			submitTodo={mockFunction}
			deleteTodo={mockFunction}
			undeleteTodo={mockFunction}
			inputChanged={mockFunction}
			disabledAddTodo={mockBool}
			disabledUndoDelete={mockBool}
			todos={[]}
		/>
	);
	
	expect(component.exists()).toEqual(true);
});
