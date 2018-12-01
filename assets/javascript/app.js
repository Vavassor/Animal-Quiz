"use strict";

const firstQuestion = "<h2>What is the first question?</h2>" +
  "<form>" +
    "<input id=\"answer-0\" name=\"answers\" type=\"radio\" value=\"0\">"
    "<label for=\"answer-0\">A</label>" +
    "<input id=\"answer-1\" name=\"answers\" type=\"radio\" value=\"1\">" +
    "<label for=\"answer-1\">B</label>" +
    "<input id=\"answer-2\" name=\"answers\" type=\"radio\" value=\"2\">" +
    "<label for=\"answer-2\">C</label>" +
  "</form>";

function startGame() {
  $("#game-panel").html(firstQuestion);
}

$(document).ready(() => {
  $("#start-button").click(() => {
    startGame();
  });
});
