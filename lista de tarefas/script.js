inputField = document.getElementById("myinput");
addButton = document.getElementById("add");
resetButton = document.getElementById("reset");
clearAll = document.getElementById("clearAll");
const ul = document.querySelector("ul");

//Carregar tarefas do localStorage (se existirem)
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("task")) || [];
  ul.innerHTML = "";

  storedTasks.forEach((task) => {
    createElement(task.id, task.content, task.isChecked);
  });
}

//criar o elemento HTML das tarefas
function createElement(taskId, content, isChecked = false) {
  const li = document.createElement("li");
  li.id = taskId;
  li.classList.add("todo-item");
  
  const itemTodo = document.createElement('div')
  itemTodo.classList.add('item-todo')
  itemTodo.textContent = content
  if (isChecked) {
    itemTodo.classList.add('checked')
  }

  li.appendChild(itemTodo)

  // Adicionando os botões
  const buttonsDiv = document.createElement('div');
  buttonsDiv.classList.add('buttons-todo');
  
  const editButton = document.createElement('button');
  editButton.classList.add('edit-btn');
  editButton.textContent = "🖊️";
  
  const checkButton = document.createElement('button');
  checkButton.classList.add('check-btn');
  checkButton.textContent = "✅";
  
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delet-btn');
  deleteButton.textContent = "🗑️";
  
  buttonsDiv.appendChild(editButton);
  buttonsDiv.appendChild(checkButton);
  buttonsDiv.appendChild(deleteButton);

  // Adicionando os botões ao li
  li.appendChild(buttonsDiv);

  // Adicionando o li ao ul
  ul.appendChild(li);
}

//salvar as tarefas no localStorage
function saveTask() {
  const tasks = [];
  const lis = ul.querySelectorAll("li");

  lis.forEach((li) => {
    const content = li.querySelector(".item-todo").textContent;
    const isChecked = li.querySelector('.item-todo').classList.contains('checked');//verificar se esta feita esta tarefa
    tasks.push({
      id: li.id,
      content: content,
      isChecked: isChecked // salvar o estado de checado
    });
  });

  localStorage.setItem("task", JSON.stringify(tasks));
}
// Função para pegar o valor do input
function inputValue() {
  const value = inputField.value.trim();//remove os espaços extras
  if (value !== "") {
    const taskId = `task${Date.now()}`; // cria um id único para a tarefa (baseado no timestamp)
    createElement(taskId, value);
    inputField.value = "";
    saveTask();
  } else {
    alert("O campo está vazio! Digite alguma tarefa!");
  }
}

// clearAll button
clearAll.addEventListener("click", (e) => {
  ul.innerHTML = ""; // limpando o html para resetar as tarefas
  localStorage.removeItem("task"); //limpa o localStorage
});

//eventos de check, delet  edit
ul.addEventListener("click", (e) => {
  // marcar a tarefa como feita
  if (e.target.classList.contains("check-btn")) {
    const itemchecked = e.target.closest("li").querySelector(".item-todo");
    if (itemchecked) {
      itemchecked.classList.toggle("checked");
      saveTask()
    }
  }

  // deletar tarefa
  if (e.target.classList.contains("delet-btn")) {
    const li = e.target.closest("li");
    const taskContent = li.querySelector(".item-todo").textContent;
    if (li) {
      li.remove();
      console.log(`Tarefa: (id:${li.id} "${taskContent}") foi removida`);

      //salvar as tarefas após remoção
      saveTask();
    }
  }

  // editar a tarefa
  if (e.target.classList.contains("edit-btn")) {
    const li = e.target.closest("li");
    const taskContent = li.querySelector(".item-todo");
    const inputEdit = prompt("Digite uma nova tarefa: ");

    if (inputEdit !== null && inputEdit !== "") {
      taskContent.textContent = inputEdit;
      saveTask(); //Salar após edição
    }
  }
});

// Função para limpar o input
function reset() {
  inputField.value = "";
  inputField.focus()
}

//add evento de click nos botões

//add button
addButton.addEventListener("click", inputValue);
inputField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    //adiciona presionando o enter
    inputValue();
  }
});

//reset button
resetButton.addEventListener("click", reset);

window.addEventListener("load", loadTasks);
