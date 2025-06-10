/* 
O que vai ser necessário:
    - botào para adicionar uma nota;
    - quando clicarmos no botão de editar a nota, precisamos mudar entre sy
*/
const addBtn = document.getElementById("add");
const noteContainer = document.querySelector(".note-container");

const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}

addBtn.addEventListener("click", () => {
  addNewNote();
});

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
        <div class="notes">
            <div class="tools">
                <button class="edit"><i class="bi bi-pencil-fill"></i></button>
                <button class="delete"><i class="bi bi-trash-fill"></i></button>
            </div>
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class=" ${text ? "hidden" : ""}"></textarea>
        </div>
    `;

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");
  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = text;
  main.innerHTML = marked.parse(text);

  // EVENTS
  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();
    updtadeLS();
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked.parse(value);
    updtadeLS();
  });

  noteContainer.appendChild(note);
}

function updtadeLS() {
  const notesText = document.querySelectorAll("textarea");
  const notes = [];

  notesText.forEach((note) => {
    notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
