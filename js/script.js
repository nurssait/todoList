let todoId = 1

class Todo {

    constructor({title, deadline, desc}) {
        this.id = todoId
        this.title = title
        this.deadline = deadline
        this.desc = desc
        this.isDone = false
        todoId++
    }

}

let todos = [
    new Todo({
        title: 'My task',
        deadline: new Date('2023-10-20'),
        desc: 'asdsa dasd asd asd sad sad asd asd sad as',
    }),
    new Todo({
        title: 'My task2',
        deadline: new Date('2023-10-27'),
        desc: 'asdsa dasd asd asd sad sad asd asd sad as',
    }),
    new Todo({
        title: 'My task 3',
        deadline: new Date('2023-10-30'),
        desc: 'asdsa dasd asd asd sad sad asd asd sad as',
    }),
    new Todo({
        title: 'My task 4',
        deadline: new Date('2023-10-28'),
        desc: 'asdsa dasd asd asd sad sad asd asd sad as',
    }),
]


class TodoManager {
    constructor(data, todosContainer) {
        this.todos = data
        this.todosContainer = todosContainer
    }

    render() {
        let html = ''

        this.todos.forEach(todo => {
            html += this.buildHtml(todo.id)
        });

        return html
    }

    buildHtml(todoId) {
        const todo = this.todos.find(item => item.id === todoId)
        return `
        <div class="card mb-3" id="todo_${todo.id}">
            <div class="card-body">
            <div class="text-end">
                <button type="button" class="btn-close" onclick="deleteTodo(${todo.id})"></button>
            </div>
            <h5 class="card-title">${todo.title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${todo.deadline.toLocaleString()}</h6>
            <p class="card-text">${todo.desc}</p>
            </div>
        </div>
        `
    }

    createTodo(newTodo) {
        this.todos.push({...newTodo, id: this.generateId()})
        return {...newTodo, id: this.generateId()}
    }

    createTodoController() {
        const title = prompt('Enter title')
        const deadline = new Date(prompt('Enter deadline'))
        const desc = prompt('Enter desc')

        this.createTodo({
            title, deadline, desc
        })

        this.start()
    }

    deleteTodo(id) {
        const newTodos = this.todos.filter(item => item.id !== id)
        todos = newTodos
        this.todos = newTodos
        console.log(this.todos);
    }
 

    generateId() {
        const currentId = todoId
        todoId++
        return currentId
    }

    start() {
        this.todosContainer.innerHTML = this.render()
    }
}



const deleteTodo = (todoId) => {
    const todosContainer = document.querySelector('#todos_container')
    const manager = new TodoManager(todos, todosContainer)
    manager.deleteTodo(todoId)
    manager.start()   
}

const bootstap = () => {
    const todosContainer = document.querySelector('#todos_container')
    const manager = new TodoManager(todos, todosContainer)

    const createBtn = document.querySelector('#createBtn')
    createBtn.onclick = () => manager.createTodoController()

    manager.start()
}

bootstap()