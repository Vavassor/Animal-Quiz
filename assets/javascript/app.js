"use strict";

class Question {
  constructor(question, options, answer) {
    this.question = question;
    this.options = options;
    this.answer = answer;
  }
}


let intervalId = null;
let results;
let slideNumber;
const secondsPerQuestion = 1;
const questions = [
  new Question("What is the first question?", ["Nothing", "Something Else", "Fancy"], 2),
  new Question("What is the second question?", ["If", "I", "Had", "No", "Limbs"], 3),
];


function chooseOption(questionIndex, answer) {
  results[questionIndex] = answer;
  clearInterval(intervalId);
  resetInterval();
}

function createResultsTable() {
  let table = $("<table>");

  let headerRow = $("<tr>");
  headerRow.append("<th>Number</th>");
  headerRow.append("<th>Choice</th>");
  headerRow.append("<th>Answer</th>");
  table.append(headerRow);
  
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];

    const questionNumber = i + 1;

    const choiceIndex = results[i];
    let choice = "Unanswered";
    if (choiceIndex !== undefined) {
      choice = question.options[choiceIndex];
    }

    const answer = question.options[question.answer];

    let row = $("<tr>");
    row.append("<td>" + questionNumber +"</td>");
    row.append("<td>" + choice +"</td>");
    row.append("<td>" + answer +"</td>");
    table.append(row);
  }

  return table;
}

function endQuiz() {
  clearInterval(intervalId);

  $("#game-panel").empty();
  $("#game-panel").append("<h2>Quiz Finished!</h2>");

  const table = createResultsTable();
  $("#game-panel").append(table);

  let retryButton = $("<button type=\"button\">Retry</button>");
  retryButton.one("click", startQuiz);
  $("#game-panel").append(retryButton);
}

function nextSlide() {
  if (slideNumber < questions.length) {
    showQuestion(slideNumber);
  } else {
    endQuiz();
  }
  slideNumber++;
}

function resetInterval() {
  intervalId = setInterval(nextSlide, 5000 * secondsPerQuestion);
  nextSlide();
}

function showQuestion(questionIndex) {
  const next = questions[questionIndex];
  $("#game-panel").empty();

  const title = $("<h2>" + next.question + "</h2>");
  $("#game-panel").append(title);

  let form = $("<form>");

  for (let i = 0; i < next.options.length; i++) {
    const option = next.options[i];
    let button = $("<button type=\"button\">");
    button.attr("value", i);
    button.text(option);
    button.one("click", (event) => {
      const value = $(event.currentTarget).val();
      const answer = parseInt(value);
      chooseOption(questionIndex, answer);
    });
    form.append(button);
  }

  $("#game-panel").append(form);
}

function startQuiz() {
  results = [];
  slideNumber = 0;
  resetInterval();
}

$(document).ready(() => {
  $("#start-button").one("click", startQuiz);
});
