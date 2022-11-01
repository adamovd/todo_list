
const inputText = document.querySelector(".input__text");
const inputBtn = document.querySelector(".input__btn");
const outputContainer = document.querySelector(".output");


inputBtn.addEventListener("click", addTodo);

function addTodo(event){
    event.preventDefault();

    const todo = {
        text: inputText.value,
        done: false,
        created: new Date().toLocaleString()
    }

    let todos = [];
        todos.push(todo);

        localStorage.setItem("todos", JSON.stringify(todos));

        inputText.value = "";

     displayList();
    }


function displayList (){
    let todosFromLS = JSON.parse(localStorage.getItem("todos"));

    todosFromLS.forEach(todo => {
    const todoContainer = document.createElement("ul");
    todoContainer.classList.add("list");
    
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
    done.checked = todo.done;
    
    text.classList.add("list__item__text");
    time.classList.add("list__item__time");
    done.classList.add("list__item__done");
    deleteButton.classList.add("list__item__delete");
    
    text.innerHTML = todo.text;
    time.innerHTML = todo.created;
    deleteButton.innerHTML = `<i class="bi bi-trash-fill"></i>`;
    
    newItem.appendChild(done);
    newItem.appendChild(text);
    newItem.appendChild(time);
    newItem.appendChild(deleteButton);
    
    newTodo.appendChild(newItem);
    
    if(todo.done) {
        text.classList.add("done")
    }
    
    outputContainer.appendChild(todoContainer);   
    });
    
}


