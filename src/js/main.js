const inputText = document.querySelector(".input__text");
const inputBtn = document.querySelector(".input__btn");
const outputContainer = document.querySelector(".output");

inputBtn.addEventListener("click", addTodo);

function addTodo(event){
    event.preventDefault();

    const todoContainer = document.createElement("ul");
    todoContainer.classList.add("list");

    const newTodo = document.createElement("li");
    newTodo.classList.add("list__item")
    newTodo.innerHTML = inputText.value;
    todoContainer.appendChild(newTodo);

    outputContainer.appendChild(todoContainer);

    inputText.value = "";

}