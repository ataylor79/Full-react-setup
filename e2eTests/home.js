/* global describe, it, beforeEach*/

describe('TodoList App', () => {
	const todoTitle = 'Get better at testing';

	beforeEach((browser, done) => {
		browser.url('http://localhost:3000');
		done();
	});

	it('should load with the right title', function (browser) {
		browser
			.assert.title('Todo List')
			.end();
	});

	it('should disable the add todo button when no text is entered', function(browser) {
		browser
			.expect.element('.todo-submit').to.not.be.enabled;
		browser.end();
	});

	it('should enable the add todo button when text is entered', function(browser) {
		browser
			.setValue('.todo-input', todoTitle)
			.expect.element('.todo-submit').to.be.enabled;
		browser.end();
	});

	it('should disable the undo delete button when there are no deleted todos', function(browser) {
		browser
			.expect.element('.todo-undelete').to.not.be.enabled;
		browser.end();
	});

	it('should allow me to create a Todo', function(browser) {
		browser
			.setValue('.todo-input', todoTitle)
			.submitForm('form.todo-form')
			.pause(500)
			.assert.containsText('.list__todo-list li:last-child .todo-text', todoTitle)
			.end();
	});

	it('should allow me to delete todo', function(browser) {
		browser
			.setValue('.todo-input', todoTitle)
			.submitForm('form.todo-form')
			.pause(500)
			.getAttribute('.list__todo-list li:last-child', 'id', function(res) {
				this.click('.list__todo-list li#' + res.value + ' .todo-delete') 
				.assert.elementNotPresent('.list__todo-list li#' + res.value + '.todo-text')
				.end();
			});
	});

	it('should allow me to undo a delete', function(browser) {
		browser
			.setValue('.todo-input', todoTitle)
			.submitForm('form.todo-form')
			.pause(500)
			.click('.todo-delete')
			.click('.todo-undelete')
			.assert.containsText('.list__todo-list li:last-child .todo-text', todoTitle)
			.end();
	});

	it('should enable the undo delete button when there are deleted todos', function(browser) {
		browser
			.setValue('.todo-input', todoTitle)
			.submitForm('form.todo-form')
			.pause(500)
			.click('.todo-delete')
			.pause(500)
			.expect.element('.todo-undelete').to.be.enabled;
		browser.end();
	});
});