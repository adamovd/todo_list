import { Todo } from "./models/todo";

//hämtar alla förändringar från ls när sidan laddas
window.addEventListener("load", () => {
    todos = JSON.parse(localStorage.getItem("todos")).map((todo) => {
        return new Todo(todo.text, todo.done, todo.created);
    });
    displayList();
})


const body = document.querySelector("body");
const inputContainer = document.querySelector(".input");
const toggleBtn = document.querySelector(".toggle__btn");
const inputText = document.querySelector(".input__text");
const inputBtn = document.querySelector(".input__btn");
const sortBtn = document.querySelector(".sort__btn");
const asideContainerLeft = document.querySelector(".aside__left");
const asideContainerRight = document.querySelector(".aside__right");
const outputContainer = document.querySelector(".output");
const todoContainer = document.querySelector(".list");
const sortText = document.querySelector(".sort__text");
const sortTime = document.querySelector(".sort__time");
const sortDone = document.querySelector(".sort__done");
let todos = [];
//Hårdkodad lista, bortkommenterad:

// let setTodos = [
//     new Todo("Lär dig JavaScript", false, new Date().toLocaleString()),
//     new Todo("Tro att du fattar vad du gör", false, new Date().toLocaleString()),
//     new Todo("Inse att du inte fattar någonting", false, new Date().toLocaleString())
// ]

// for (let i = 0; i < setTodos.length; i++) {
//     todos.push(setTodos[i]); 
// }

// Darkmode-knapp
toggleBtn.addEventListener("change", () => {
        body.classList.toggle("darkmode");
        inputBtn.classList.toggle("darkmode__btn--input");
        sortBtn.classList.toggle("darkmode__btn--sort")
        asideContainerLeft.classList.toggle("darkmode__aside");
        asideContainerRight.classList.toggle("darkmode__aside");
        inputContainer.classList.toggle("darkmode__lines");
});

// Funktion för att skapa ny todo

inputBtn.addEventListener("click", addTodo);

function addTodo(event){
    event.preventDefault();

    const todo = new Todo(inputText.value.charAt(0).toUpperCase() + inputText.value.slice(1), false, new Date().toLocaleString()); 
    if(inputText.value === ""){
        alert("Du måste skriva något!");
    }else{
    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
    
    inputText.value = "";

    displayList()
    }
}

// funktion som skriver ut todos i lista.
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
        done.checked = todos[i].done;
        const deleteButton = document.createElement("button");
        done.type = "checkbox";

        done.addEventListener("change", () => {
            if(done.checked === true){
                todos[i].done = true;
            }else{ 
                todos[i].done = false;
            }
            localStorage.setItem("todos", JSON.stringify(todos));
        });
        
            text.classList.add("list__item__text");
            time.classList.add("list__item__time");
            done.classList.add("list__item__done");
            done.classList.add("form-check-input");
            done.classList.add("me-1");
            deleteButton.classList.add("list__item__delete");
            
            text.innerHTML = todos[i].text;
            time.innerHTML = todos[i].created;
            deleteButton.innerHTML = `<i class="bi bi-trash"></i>`;
            
            newTodo.appendChild(done);
            newTodo.appendChild(text);
            newTodo.appendChild(time);
            newTodo.appendChild(deleteButton);
            
            todoContainer.appendChild(newTodo);
            
            outputContainer.appendChild(todoContainer);
            
            toggleBtn.addEventListener("change", () => {
                newTodo.classList.toggle("darkmode__list")
            });
            
            deleteButton.addEventListener("click", () => {
                
                todos.splice([i], 1);
                localStorage.setItem("todos", JSON.stringify(todos));
                displayList()
            });
        } 
    }
    
    //sorteringsknappar

    //sorterar i bokstavsordning
    sortText.addEventListener("click", () => {
        todos.sort((a, b) => (a.text > b.text) ? 1 : -1);
        displayList();
    })

    //sorterar så att det senaste objektet hamnar högst upp, ska försöka lösa på ett bättre sätt
    sortTime.addEventListener("click", () => {
        todos.reverse();
        displayList();
    })
    //sorterar på iklickad som klar
    sortDone.addEventListener("click", () => {
        todos.sort((a, b) => b.done - a.done);
        console.log("klick");
        displayList();
    });







