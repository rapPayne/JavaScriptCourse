var ctx;
var leftSideOfGraph = 100;
var widthOfGraph = 750;
var topOfGraph = 50;
var heightOfGraph = 500;
var rightSideOfGraph = leftSideOfGraph + widthOfGraph;
var bottomOfGraph = topOfGraph + heightOfGraph;

var backgroundColor = "white";
var axesColor = "black";
var labelsColor = "purple";
var backgroundLinesColor = "cyan";
var color = {
  excellent: "green",
  good: "blue",
  okay: "purple",
  poor: "orange",
  terrible: "red"
};

var xTic = (rightSideOfGraph - leftSideOfGraph) / (29); //pixels per day
var yTic = (bottomOfGraph - topOfGraph) / (100); //pixels per score

document.addEventListener("DOMContentLoaded", function () {
  // Add your JavaScript here
  var canvas = document.getElementById("resultsCanvas");
  ctx = canvas.getContext("2d");
  // Draw the trends graph on page load.
  drawTrends();

  document.getElementById("summaryButton").addEventListener("click", () => {
    drawSummary();
  });
  document.getElementById("trendsButton").addEventListener("click", () => {
    drawTrends();
  });
  document.getElementById("overallScoreButton").addEventListener("click", () => {
    drawOverallScore();
  });
});


function drawSummary() {
  document.getElementById("graphType").innerText = "Summary";
  clearCanvas();
}

function drawLine(startDay, endDay, level) {
  ctx.beginPath();
  ctx.strokeStyle = color[level];
  ctx.moveTo(getXPointForDay(startDay),
    getYPointForScore(raw_survey_results[startDay][level]));
  ctx.lineTo(getXPointForDay(endDay),
    getYPointForScore(raw_survey_results[endDay][level]));
  ctx.stroke();
  ctx.closePath();

}
function drawTrends() {
  document.getElementById("graphType").innerText = "Trends";
  console.log(raw_survey_results);
  clearCanvas();
  drawLine(0, 29, "excellent");
  drawLine(0, 29, "good");
  drawLine(0, 29, "okay");
  drawLine(0, 29, "poor");
  drawLine(0, 29, "terrible");
}

function drawOverallScore() {
  document.getElementById("graphType").innerText = "Overall Score";
  clearCanvas();
}

function clearCanvas() {
  // Draw a big white rectangle
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(leftSideOfGraph, topOfGraph, widthOfGraph, heightOfGraph);

  // Draw the legend
  ctx.font = "25px Arial";
  ctx.fillStyle = labelsColor;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("Scores", leftSideOfGraph - 100, bottomOfGraph - heightOfGraph / 2);
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("Days", leftSideOfGraph + widthOfGraph / 2, bottomOfGraph + 10);

  // Draw the Axes
  ctx.beginPath();
  ctx.strokeStyle = axesColor;
  ctx.lineWidth = 3;
  ctx.moveTo(leftSideOfGraph, topOfGraph);
  ctx.lineTo(leftSideOfGraph, bottomOfGraph);
  ctx.lineTo(rightSideOfGraph, bottomOfGraph);
  ctx.stroke();
  ctx.closePath();

  // Put in a logo - why not?
  var img = new Image();
  img.addEventListener("load", () => {
    ctx.drawImage(img, rightSideOfGraph - 100, topOfGraph, 100, 100);
  });
  img.src = "../../content/images/javaScript.png";
}

function getXPointForDay(day = 0) {
  return leftSideOfGraph + (day * xTic);
}

function getYPointForScore(score = 0) {
  return bottomOfGraph - (score * yTic);
}
