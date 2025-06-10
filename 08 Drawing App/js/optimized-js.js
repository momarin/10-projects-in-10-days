// Elementos DOM
const elements = {
  canvas: document.getElementById("canvas"),
  increaseBtn: document.getElementById("increase"),
  decreaseBtn: document.getElementById("decrease"),
  sizeEl: document.getElementById("size"),
  colorEl: document.getElementById("color"),
  clearEl: document.getElementById("clear")
};

// Contexto e estado
const ctx = elements.canvas.getContext("2d");
const state = {
  size: 30,
  isPressed: false,
  color: 'black',
  lastX: undefined,
  lastY: undefined
};

// Funções de desenho
const draw = {
  circle(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, state.size, 0, Math.PI * 2);
    ctx.strokeStyle = state.color;
    ctx.stroke();
  },
  
  line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = state.color;
    ctx.lineWidth = state.size * 2; // Multiplicado por 2 para melhor continuidade
    ctx.stroke();
  }
};

// Funções utilitárias
const utils = {
  updateSize() {
    elements.sizeEl.textContent = state.size;
  },
  
  clampSize(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }
};

// Manipuladores de eventos
const handlers = {
  mouseDown(e) {
    state.isPressed = true;
    [state.lastX, state.lastY] = [e.offsetX, e.offsetY];
  },
  
  mouseUp() {
    state.isPressed = false;
    [state.lastX, state.lastY] = [undefined, undefined];
  },
  
  mouseMove(e) {
    if (state.isPressed) {
      const [x, y] = [e.offsetX, e.offsetY];
      draw.circle(x, y);
      draw.line(state.lastX, state.lastY, x, y);
      [state.lastX, state.lastY] = [x, y];
    }
  },
  
  increaseSize() {
    state.size = utils.clampSize(state.size + 5, 5, 50);
    utils.updateSize();
  },
  
  decreaseSize() {
    state.size = utils.clampSize(state.size - 5, 5, 50);
    utils.updateSize();
  },
  
  changeColor(e) {
    state.color = e.target.value;
  },
  
  clearCanvas() {
    ctx.clearRect(0, 0, elements.canvas.width, elements.canvas.height);
  }
};

// Configuração de eventos
elements.canvas.addEventListener("mousedown", handlers.mouseDown);
elements.canvas.addEventListener("mouseup", handlers.mouseUp);
elements.canvas.addEventListener("mousemove", handlers.mouseMove);
elements.increaseBtn.addEventListener("click", handlers.increaseSize);
elements.decreaseBtn.addEventListener("click", handlers.decreaseSize);
elements.colorEl.addEventListener("change", handlers.changeColor);
elements.clearEl.addEventListener("click", handlers.clearCanvas);

// Inicialização
utils.updateSize();