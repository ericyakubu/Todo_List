const input = document.querySelector("#addItemInput");
const addItemBtn = document.querySelector("#addItemButton");
const todoList = document.querySelector("#todoList");
const sort = document.querySelector("#selectSorting");

document.addEventListener("DOMContentLoaded", _getTodos);
addItemBtn.addEventListener("click", _addItem);
todoList.addEventListener("click", _test);
sort.addEventListener("click", _sortList);

function _test(e) {
    const item = e.target;
    const todo = item.parentElement.parentElement;

    if (item.classList.value.includes("important")) {
        if (todo.classList.value.includes("finished")) {
            todo.classList.remove("finished");
        }
        if (todo.classList.value.includes("markedImportant")) {
            todo.classList.remove("markedImportant");
        } else {
            todo.classList.add("markedImportant");
        }
    }
    if (item.classList.value.includes("finish")) {
        if (todo.classList.value.includes("markedImportant")) {
            todo.classList.remove("markedImportant");
        }
        if (todo.classList.value.includes("finished")) {
            todo.classList.remove("finished");
        } else {
            todo.classList.add("finished");
        }
    }
    if (item.classList.value.includes("delete")) {
        todo.classList.add("deleting");
        _removeLocalTodos(todo);
        todo.addEventListener("transitionend", (e) => {
            todo.remove();
        });
    }
}

function _addItem(e) {
    e.preventDefault();
    const todoControlContainer = document.createElement("div");
    todoControlContainer.classList.add(`itemControlContainer`);

    const todoText = document.createElement("p");
    todoText.innerText = input.value;
    _saveToLocalStorage(input.value);
    input.value = "";

    const markImportant = document.createElement("button");
    markImportant.classList.add(`itemControls`, `important`);
    markImportant.innerHTML = `<i class="fas fa-exclamation-circle"></i>`;
    todoControlContainer.appendChild(markImportant);

    const markFinish = document.createElement("button");
    markFinish.classList.add(`itemControls`, `finish`);
    markFinish.innerHTML = `<i class="fas fa-check-circle"></i>`;
    todoControlContainer.appendChild(markFinish);

    const deleteInput = document.createElement("button");
    deleteInput.classList.add(`itemControls`, `delete`);
    deleteInput.innerHTML = `<i class="fas fa-times-circle"></i>`;
    todoControlContainer.appendChild(deleteInput);

    const todoItem = document.createElement("div");
    todoItem.classList.add(`todoItem`);

    todoItem.appendChild(todoText);
    todoItem.appendChild(todoControlContainer);
    todoList.appendChild(todoItem);
}
function _saveToLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function _removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function _sortList(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "finished":
                if (todo.classList.contains("finished")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("finished")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "important":
                if (todo.classList.contains("markedImportant")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "unimportant":
                if (!todo.classList.contains("markedImportant")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function _getTodos() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {
        const todoControlContainer = document.createElement("div");
        todoControlContainer.classList.add(`itemControlContainer`);

        const todoText = document.createElement("p");
        todoText.innerText = todo;

        const markImportant = document.createElement("button");
        markImportant.classList.add(`itemControls`, `important`);
        markImportant.innerHTML = `<i class="fas fa-exclamation-circle"></i>`;
        todoControlContainer.appendChild(markImportant);

        const markFinish = document.createElement("button");
        markFinish.classList.add(`itemControls`, `finish`);
        markFinish.innerHTML = `<i class="fas fa-check-circle"></i>`;
        todoControlContainer.appendChild(markFinish);

        const deleteInput = document.createElement("button");
        deleteInput.classList.add(`itemControls`, `delete`);
        deleteInput.innerHTML = `<i class="fas fa-times-circle"></i>`;
        todoControlContainer.appendChild(deleteInput);

        const todoItem = document.createElement("div");
        todoItem.classList.add(`todoItem`);

        todoItem.appendChild(todoText);
        todoItem.appendChild(todoControlContainer);
        todoList.appendChild(todoItem);
    });
}
