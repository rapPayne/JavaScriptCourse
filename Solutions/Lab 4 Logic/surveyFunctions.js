var ctx;
var leftSideOfGraph = 110;
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

function drawTrends() {
  document.getElementById("graphType").innerText = "Trends";
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
  for (let i = 1; i < 30; i++) {
    drawLine(i, i - 1, "excellent");
    drawLine(i, i - 1, "good");
    drawLine(i, i - 1, "okay");
    drawLine(i, i - 1, "poor");
    drawLine(i, i - 1, "terrible");
  }
  //Draw the circles around the datapoints
  for (let level in color) {
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.strokeStyle = color[level];
      ctx.moveTo(getXPointForDay(i), getYPointForScore(raw_survey_results[i][level]))
      ctx.arc(getXPointForDay(i), getYPointForScore(raw_survey_results[i][level]), 2, 0, 2 * Math.PI / 180, true);
      ctx.stroke();
      ctx.closePath();
    }
  }
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
  ctx.fillText("Scores", leftSideOfGraph - 110, bottomOfGraph - heightOfGraph / 2);
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText("Days", leftSideOfGraph + widthOfGraph / 2, bottomOfGraph + 15);

  // Draw the Axes
  ctx.beginPath();
  ctx.strokeStyle = axesColor;
  ctx.lineWidth = 3;
  ctx.moveTo(leftSideOfGraph, topOfGraph);
  ctx.lineTo(leftSideOfGraph, bottomOfGraph);
  ctx.lineTo(rightSideOfGraph, bottomOfGraph);
  ctx.stroke();
  ctx.closePath();

  // Number the horizontal axis
  ctx.font = "12px Arial";
  for (let i = 1; i < 30; i++)
    ctx.fillText(i, getXPointForDay(i), bottomOfGraph + 5);

  // Number the vertical axis
  for (let i = 5; i <= 100; i += 5)
    ctx.fillText(i, leftSideOfGraph - 15, getYPointForScore(i));

  // Draw the vertical lines
  for (let i = 1; i < 30; i++) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = backgroundLinesColor;
    ctx.moveTo(getXPointForDay(i), bottomOfGraph);
    ctx.lineTo(getXPointForDay(i), topOfGraph);
    ctx.stroke();
    ctx.closePath();
  }

  // Draw the horizontal lines
  for (let i = 5; i <= 100; i += 5) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = backgroundLinesColor;
    ctx.moveTo(leftSideOfGraph, getYPointForScore(i));
    ctx.lineTo(rightSideOfGraph, getYPointForScore(i));
    ctx.stroke();
    ctx.closePath();
  }

  // Put in a logo - why not?
  var img = new Image();
  img.addEventListener("load", () => {
    ctx.drawImage(img, rightSideOfGraph - 110, topOfGraph, 100, 100);
  });
  img.src = "../../content/images/javaScript.png";
}

function drawLine(startDay, endDay, level) {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = color[level];
  ctx.moveTo(getXPointForDay(startDay),
    getYPointForScore(raw_survey_results[startDay][level]));
  ctx.lineTo(getXPointForDay(endDay),
    getYPointForScore(raw_survey_results[endDay][level]));
  ctx.stroke();
  ctx.closePath();

}

function getXPointForDay(day = 0) {
  return leftSideOfGraph + (day * xTic);
}

function getYPointForScore(score = 0) {
  return bottomOfGraph - (score * yTic);
}
