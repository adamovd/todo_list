import { Todo } from "./todo";
const inputText = document.querySelector(".input__text");
const inputBtn = document.querySelector(".input__btn");
const outputContainer = document.querySelector(".output");
const todoContainer = document.querySelector(".list");
const sortText = document.querySelector(".sort__text");
const sortTime = document.querySelector(".sort__time");
const sortDone = document.querySelector(".sort__done");
let setTodos = [
    new Todo("Städa", false, new Date().toLocaleString()),
    new Todo("Diska", false, new Date().toLocaleString()),
    new Todo("Äta", false, new Date().toLocaleString())
]

let todos = [];
for (let i = 0; i < setTodos.length; i++) {
    todos.push(setTodos[i]); 
}

displayList()


inputBtn.addEventListener("click", addTodo);

function addTodo(event){
    event.preventDefault();
    
    const todo = new Todo(inputText.value, false, new Date().toLocaleString()); 
    if(inputText.value === ""){
        alert("Du måste skriva något, din jävla sopa!!");
    }else{
    todos.push(todo);
    console.log(todos);
    
    inputText.value = "";

    displayList()
    }
}

function displayList (){   
    todoContainer.innerHTML = "";
    for (let i = 0; i < todos.length; i++) {
        const newTodo = document.createElement("li");
        newTodo.classList.add("list__item")
        newTodo.classList.add("list-group-item")
        todoContainer.appendChild(newTodo);
        
        const text = document.createElement("p");
        const time = document.createElement("small");
        const done = document.createElement("input");
        const deleteButton = document.createElement("button");
        done.type = "checkbox";
        
        done.addEventListener("click", () => {
            if(done.checked === true){
                newTodo.classList.add("done");
                todos[i].done = true;
                console.log(todos);
                
            }else{
                newTodo.classList.remove("done");
                todos[i].done = false;
            }});
        
            text.classList.add("list__item__text");
            time.classList.add("list__item__time");
            done.classList.add("list__item__done");
            done.classList.add("form-check-input");
            done.classList.add("me-1");
            deleteButton.classList.add("list__item__delete");
            
            text.innerHTML = todos[i].text;
            time.innerHTML = todos[i].created;
            deleteButton.innerHTML = `<i class="bi bi-trash-fill"></i>`;
            
            newTodo.appendChild(done);
            newTodo.appendChild(text);
            newTodo.appendChild(time);
            newTodo.appendChild(deleteButton);
            
            todoContainer.appendChild(newTodo);
            
            outputContainer.appendChild(todoContainer); 
            
            deleteButton.addEventListener("click", () => {
                
                todos.splice([i], 1);
                displayList()
                console.log("delete");
            });
        } 
    }
    
    sortText.addEventListener("click", () => {
        todos.sort((a, b) => (a.text > b.text) ? 1 : -1);
        displayList();
    })

    sortTime.addEventListener("click", () => {
        todos.reverse();
        displayList();
    })

    sortDone.addEventListener("click", () => {
        todos.sort((a, b) => (a.done !== b.done) ? 1 : -1);
        displayList();
    })

console.log(todos);





