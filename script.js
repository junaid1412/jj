const classNames = {
	TODO_ITEM: 'todo-container',
	TODO_CHECKBOX: 'todo-checkbox',
	TODO_TEXT: 'todo-text',
	TODO_DELETE: 'todo-delete'
};

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

const todos = (function() {
	// todoarray is object array
	// obj : {
	// id:1
	//  text:"",
	// checked:false
	// }

	let todoarray = [];
	function renderTodo() {
		let html = '';
		todoarray.forEach(function(e) {
			html += ListRender(e);
		});
		list.innerHTML = html;
		itemCountSpan.innerHTML = todoarray.length;
		uncheckedCountSpan.innerHTML = todoarray.filter(unchecked).length;
	}
	function toggleTodo(id) {
		todoarray = todoarray.map(function(el) {
			el.checked = id == el.id ? !el.checked : el.checked;
			return el;
		});
	}
	function addTodo(todo) {
		let item = { id: todoarray.length + 1, ...todo };
		todoarray.push(item);
	}
	function todoDelete(id) {
		let arr = todoarray.filter(function(el) {
			return el.id !== id;
		});
		todoarray = arr;
	}
	return {
		add: addTodo,
		toggle: toggleTodo,
		render: renderTodo,
		todoDelete: todoDelete
	};
})();

const ListRender = function(e) {
	let classNames = e.checked ? 'todo-container checked' : 'todo-container ';
	let list = '<li class="' + classNames + '"';
	list += 'onclick="checked(' + e.id + ')">';
	list += '<span >' + e.text + '</span>';
	list += '<span class="delect_todo" onclick="todoDelete(' + e.id + ')">&#x26CC;</span>';
	list += '</li> ';
	return list;
};

let unchecked = function(x) {
	if (!x.checked) {
		return true;
	}
};
function todoDelete(id) {
	todos.todoDelete(id);
	todos.render();
}
function checked(id) {
	todos.toggle(id);
	todos.render();
}
function newTodo() {
	let todo = prompt('Add a Task');
	console.log(todo, 'todo');
	if (todo != null && todo.length > 0) {
		todos.add({ text: todo, checked: false });
		todos.render();
	}
}
