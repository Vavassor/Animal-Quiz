"use strict";

class Question {
  constructor(question, options, answer) {
    this.question = question;
    this.options = options;
    this.answer = answer;
  }
}


let intervalId = null;
let slideNumber;
const secondsPerQuestion = 1;
const questions = [
  new Question("What is the first question?", ["Nothing", "Something Else", "Fancy"], 2),
  new Question("What is the second question?", ["If", "I", "Had", "No", "Limbs"], 3),
];


function nextSlide() {
  if (slideNumber < questions.length) {
    showQuestion(slideNumber);
  } else {
    endQuiz();
  }
  slideNumber++;
}

function showQuestion(questionIndex) {
  let next = questions[questionIndex];
  $("#game-panel").empty();

  let title = $("<h2>" + next.question + "</h2>");
  $("#game-panel").append(title);

  let form = $("<form>");
  for (let i = 0; i < next.options.length; i++) {
    let option = next.options[i];
    let button = $("<button>");
    button.attr("value", i);
    button.text(option);
    form.append(button);
  }
  $("#game-panel").append(form);
}

function endQuiz() {
  $("#game-panel").html("<h2>Quiz Finished!</h2>");
  clearInterval(intervalId);

  let retryButton = $("#game-panel").append("<button>Retry</button>");
  retryButton.click(startQuiz);
}

function startQuiz() {
  slideNumber = 0;
  intervalId = setInterval(nextSlide, 1000 * secondsPerQuestion);
  nextSlide();
}

$(document).ready(() => {
  $("#start-button").click(startQuiz);
});
