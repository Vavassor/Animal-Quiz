"use strict";

class Question {
  constructor(question, options, answer) {
    this.question = question;
    this.options = options;
    this.answer = answer;
  }
}


let timeoutId = null;
let progressIntervalId = null;
let choices;
let slideNumber;
let progressValue;
const animationSteps = 100;
const secondsPerAnswer = 2;
const secondsPerQuestion = 20;
const questions = [
  new Question(
    "What is the only bird known to fly backward?",
    ["Merlin", "Hummingbird", "Peregrine Falcon", "Red-Tailed Hawk", "Bat"],
    1
  ),
  new Question(
    "What is the most common US state bird?",
    ["Goldfinch", "Western Meadowlark", "Bluebird", "Robin", "Cardinal"],
    4
  ),
  new Question(
    "What is the largest carnivore in Britain?",
    ["Pinemarten", "Red Fox", "Badger", "Black Bear", "Weasel"],
    2
  ),
  new Question(
    "Which bat doesn't echolocate?",
    ["Fruit Bat", "Brown Bat", "Vampire Bat", "Hog-Nosed Bat"],
    0
  ),
  new Question(
    "Which common pet can't taste hot pepper?",
    ["Dog", "Cat", "Rabbit", "Cockatiel", "Guinea Pig"],
    3
  ),
  new Question(
    "Which bird is the most common in the world?",
    ["Pigeon", "Chicken", "Robin", "Red-billed Quelea", "Duck"],
    1
  ),
  new Question(
    "What animal does cashmere come from?",
    ["Goat", "Sheep", "Beaver", "Raccoon"],
    0
  ),
  new Question(
    "A reindeer is another name for what kind of deer?",
    ["Moose", "Caribou", "Elk", "Mule Deer"],
    0
  ),
  new Question(
    "Which of these animals can run the fastest?",
    ["Horse", "Ostrich", "Hare", "Lion"],
    1
  ),
  new Question(
    "Which of these animals can't hear?",
    ["Frog", "Carp", "Bee"],
    2
  )
];


function animateProgress() {
  progressValue -= 1;
  $("#question-timer").attr("value", progressValue);
}

function chooseOption(questionIndex, answer) {
  choices[questionIndex] = answer;
  clearTimeout(timeoutId);
  nextSlide();
}

function endQuiz() {
  clearTimeout(timeoutId);
  clearInterval(progressIntervalId);
  $("#question-timer").hide();

  $("#game-panel").empty();
  $("#game-panel").append("<h2>Quiz Finished!</h2>");

  gradeQuiz();

  let retryButton = $("<button type=\"button\">Retry</button>");
  retryButton.addClass("play");
  retryButton.one("click", startQuiz);
  $("#game-panel").append(retryButton);
}

function gradeQuiz() {
  let questionsCorrect = 0;
  let questionsUnanswered = 0;

  for (let i = 0; i < questions.length; i++) {
    let choice = choices[i];
    let answer = questions[i].answer;
    if (choice === answer) {
      questionsCorrect++;
    } else if (choice === undefined) {
      questionsUnanswered++;
    }
  }

  $("#game-panel").append("<p>Correct: " + questionsCorrect + "/" + questions.length + "</p>");
  $("#game-panel").append("<p>Unanswered: " + questionsUnanswered + "</p>");
}

function nextSlide() {
  let questionNumber = Math.floor(slideNumber / 2);
  if (questionNumber < questions.length) {
    if (slideNumber % 2 === 1) {
      showAnswer(questionNumber);
      timeoutId = setTimeout(nextSlide, 1000 * secondsPerAnswer);
    } else {
      showQuestion(questionNumber);
      timeoutId = setTimeout(nextSlide, 1000 * secondsPerQuestion);
    }
  } else {
    endQuiz();
  }
  slideNumber++;
}

function showAnswer(questionIndex) {
  clearInterval(progressIntervalId);
  $("#question-timer").hide();

  const question = questions[questionIndex];
  const answer = question.options[question.answer];
  $("#game-panel").html("<h2>Answer</h2>");
  $("#game-panel").append("<p>" + answer + "</p>")
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
    button.addClass("choice");
    button.text(option);
    button.one("click", (event) => {
      const value = $(event.currentTarget).val();
      const answer = parseInt(value);
      chooseOption(questionIndex, answer);
    });
    form.append(button);
  }

  $("#game-panel").append(form);

  restartProgressBar();
}

function restartProgressBar() {
  $("#question-timer").show();
  progressValue = 100;
  $("#question-timer").attr("value", progressValue);

  const millseconds = Math.floor(1000 * secondsPerQuestion / animationSteps);
  progressIntervalId = setInterval(animateProgress, millseconds);
}

function startQuiz() {
  choices = [];
  slideNumber = 0;
  nextSlide();
}


$(document).ready(() => {
  $("#start-button").one("click", startQuiz);
});
