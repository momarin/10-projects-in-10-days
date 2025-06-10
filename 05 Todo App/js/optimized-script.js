const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

// Carrega tarefas do localStorage, se houver
JSON.parse(localStorage.getItem("todos") || "[]").forEach(addTodo);

// Evento para adicionar nova tarefa
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

// Funcão para adicionar tarefa
function addTodo(todo = null) {
  // Pega o texto da tarefa (ou do input)
  const todoText = todo ? todo.text : input.value.trim();
  
  // Se estiver vazio, não faz nada
  if (!todoText) return;

  const todoEl = document.createElement("li");
  todoEl.textContent = todoText;

  if (todo?.completed) {
    todoEl.classList.add("completed");
  }

  // Alterna o estado de completado
  todoEl.addEventListener("click", () => {
    todoEl.classList.toggle("completed");
    updateLS();
  });

  // Remove tarefa com clique direito
  todoEl.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    todoEl.remove();
    updateLS();
  });

  todosUL.appendChild(todoEl);
  input.value = "";
  updateLS();
}

function updateLS() {
  const todos = Array.from(todosUL.children).map((el) => ({
    text: el.textContent,
    completed: el.classList.contains("completed"),
  }));
  localStorage.setItem("todos", JSON.stringify(todos));
}

/*
O que foi melhorado:
    ♦ Removido código redundante (if (todos)) com valor padrão no JSON.parse.
    ♦ trim() no input para evitar espaços em branco como tarefas.
    ♦ Usado Array.from() para deixar o código mais moderno e limpo.
    ♦ Removido comentário desnecessário.
*/
