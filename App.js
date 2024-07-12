document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    {
      question: "What does HTML stand for?",
      answers: [
        { text: "Hyper Text Markup Language", correct: true },
        { text: "Home Tool Markup Language", correct: false },
        { text: "Hyperlinks and Text Markup Language", correct: false },
        { text: "Hyperlinking Text Marking Language", correct: false },
      ],
    },
    {
      question: "Who is making the Web standards?",
      answers: [
        { text: "Mozilla", correct: false },
        { text: "Google", correct: false },
        { text: "Microsoft", correct: false },
        { text: "The World Wide Web Consortium", correct: true },
      ],
    },
    {
      question: "Choose the correct HTML element for the largest heading:",
      answers: [
        { text: "head", correct: false },
        { text: "h1", correct: true },
        { text: "h6", correct: false },
        { text: "heading", correct: false },
      ],
    },
    {
      question: "What is the correct HTML element for inserting a line break?",
      answers: [
        { text: "lb", correct: false },
        { text: "br", correct: true },
        { text: "break", correct: false },
        { text: "line", correct: false },
      ],
    },
    {
      question: "What does CSS stand for?",
      answers: [
        { text: "Creative Style Sheets", correct: false },
        { text: "Cascading Style Sheets", correct: true },
        { text: "Computer Style Sheets", correct: false },
        { text: "Colorful Style Sheets", correct: false },
      ],
    },
    {
      question: "Which HTML attribute is used to define inline styles?",
      answers: [
        { text: "class", correct: false },
        { text: "style", correct: true },
        { text: "font", correct: false },
        { text: "styles", correct: false },
      ],
    },
    {
      question: "Which property is used to change the background color?",
      answers: [
        { text: "bgcolor", correct: false },
        { text: "color", correct: false },
        { text: "background-color", correct: true },
        { text: "bg-color", correct: false },
      ],
    },
    {
      question: "Which CSS property controls the text size?",
      answers: [
        { text: "font-style", correct: false },
        { text: "text-size", correct: false },
        { text: "font-size", correct: true },
        { text: "text-style", correct: false },
      ],
    },
    {
      question: "Inside which HTML element do we put the JavaScript?",
      answers: [
        { text: "javascript", correct: false },
        { text: "js", correct: false },
        { text: "script", correct: true },
        { text: "scripting", correct: false },
      ],
    },
    {
      question: "Where is the correct place to insert a JavaScript?",
      answers: [
        { text: "The head section", correct: false },
        { text: "The body section", correct: false },
        { text: "Both the head section and the body section are correct", correct: true },
        { text: "None of the above", correct: false },
      ],
    },
  ];

  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");

  let currentQuestionIndex = 0;
  let score = 0;

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.classList.add("hide");
    showQuestion();
  }

  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtons.appendChild(button);
    });
  }

  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }

  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
      score++;
    }
    Array.from(answerButtons.children).forEach((button) => {
      setStatusClass(button, button.dataset.correct === "true");
    });
    if (questions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("hide");
    } else {
      nextButton.innerHTML = `Quiz Over! Your score is : ${score}`;
      nextButton.classList.remove("hide");
      nextButton.removeEventListener("click", handleNextButton);
    }
  }

  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add("correct");
    } else {
      element.classList.add("wrong");
    }
  }

  function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
  }

  function handleNextButton() {
    currentQuestionIndex++;
    showQuestion();
  }

  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      startQuiz();
    }
  });

  startQuiz();
});
