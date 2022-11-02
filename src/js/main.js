import { Todo } from "./todo";
const inputText = document.querySelector(".input__text");
const inputBtn = document.querySelector(".input__btn");
const outputContainer = document.querySelector(".output");
const todoContainer = document.querySelector(".list"); 
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
    todos.push(todo);
    console.log(todos);
    
    inputText.value = "";

    displayList()
    
}

function displayList (){   
    todoContainer.innerHTML = "";
    for (let i = 0; i < todos.length; i++) {
        const newTodo = document.createElement("li");
        newTodo.classList.add("list__container")
        todoContainer.appendChild(newTodo);
        
        const newItem = document.createElement("div");
        newItem.classList.add("list__item");
        
        const text = document.createElement("p");
        const time = document.createElement("p");
        const done = document.createElement("input");
        const deleteButton = document.createElement("button");
        done.type = "checkbox";
        
        done.addEventListener("click", () => {
            if(done.checked === true){
                newItem.classList.add("done");
                todos[i].done = true;
                console.log(todos);
                
            }else{
                newItem.classList.remove("done");
                todos[i].done = false;
            }});
        
            text.classList.add("list__item__text");
            time.classList.add("list__item__time");
            done.classList.add("list__item__done");
            deleteButton.classList.add("list__item__delete");
            
            text.innerHTML = todos[i].text;
            time.innerHTML = todos[i].created;
            deleteButton.innerHTML = `<i class="bi bi-trash-fill"></i>`;
            
            newItem.appendChild(done);
            newItem.appendChild(text);
            newItem.appendChild(time);
            newItem.appendChild(deleteButton);
            
            newTodo.appendChild(newItem);
            
            outputContainer.appendChild(todoContainer); 
            
            deleteButton.addEventListener("click", () => {
                
                todos.splice([i], 1);
                displayList()
                console.log("delete");
            });
    } 
}
console.log(todos);





