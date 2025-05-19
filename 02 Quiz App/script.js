// array dos objetos "pergunta"
const quizData = [
  {
    question: "Qual é a capital do Brasil?",
    a: "São Paulo",
    b: "Rio de Janeiro",
    c: "Brasília",
    d: "Palmas",
    correct: "c",
  },
  {
    question: "Quem era o presidente brasileiro no ano de 2003?",
    a: "Fernando Henrique Cardoso",
    b: "Luis Inário Lula da Silva",
    c: "Geraldo Alckimin",
    d: "Dilma Rousseff",
    correct: "b",
  },
  {
    question:
      "Qual santo católico as festividades do mês de junho homenageiam?",
    a: "São Pedro",
    b: "São Paulo",
    c: "Santo Antônio",
    d: "São João",
    correct: "d",
  },
  {
    question:
      "Qual o nome do filme brasileiro vencedor do Oscar de Melhor Filme Estrangeiro em 2025?",
    a: "Ainda Estou Aqui",
    b: "Cidade de Deus",
    c: "Central do Brasil",
    d: "O Auto da Compadecida",
    correct: "a",
  },
  {
    question: "Qual a novela de maior sucesso do Brasil?",
    a: "Kubanacan",
    b: "Cabocla",
    c: "Cordel Encantado",
    d: "Avenida Brasil",
    correct: "d",
  },
];

const quiz = document.getElementById("quiz");
const answersElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const aText = document.getElementById("a-text");
const bText = document.getElementById("b-text");
const cText = document.getElementById("c-text");
const dText = document.getElementById("d-text");
const submitBtn = document.getElementById("submit");

let currentQuestion = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuestion];

  questionElement.innerText = currentQuizData.question;
  aText.innerText = currentQuizData.a;
  bText.innerText = currentQuizData.b;
  cText.innerText = currentQuizData.c;
  dText.innerText = currentQuizData.d;
}

function getSelected() {
  // precisa ser let por conta de erro 'assign to constant value'
  let answer = undefined;

  answersElements.forEach((answerElement) => {
    if (answerElement.checked) {
      answer = answerElement.id;
    }
  });

  return answer;
}

function deselectAnswers() {
  answersElements.forEach((answerElement) => {
    answerElement.checked = false;
  });
}

submitBtn.addEventListener("click", () => {
  // checando a resposta
  const answer = getSelected();
  console.log(answer);

  if (answer) {
    if (answer === quizData[currentQuestion].correct) {
      score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
      loadQuiz();
    } else {
      quiz.innerHTML = `<h2>Você respondeu coerramente a ${score}/${quizData.length} perguntas.</h2>
      
      <button onclick="location.reload()">Responder novamente</button>`;
    }
  }
});
