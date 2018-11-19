'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var RADIUS = 50;
var GAP = 10;
var FONT_HEIGHT = 20;
var FONT_PARAMETER = '16px "PT Mono"';
var SIDE_SPACE = 40;
var TEXT_WIDTH = 80;
var BAR_WIDTH = 40;
var BAR_SPACE = 50;
var BAR_MAX_HEIGHT = 150;

var topOfBar = CLOUD_Y + 3 * FONT_HEIGHT + 2 * GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + RADIUS, y);
  ctx.lineTo(x + CLOUD_WIDTH - RADIUS, y);
  ctx.arcTo(x + CLOUD_WIDTH, y, x + CLOUD_WIDTH, y + RADIUS, RADIUS);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT - RADIUS);
  ctx.arcTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT, x + CLOUD_WIDTH - RADIUS, y + CLOUD_HEIGHT, RADIUS);
  ctx.lineTo(x + RADIUS, y + CLOUD_HEIGHT);
  ctx.arcTo(x, y + CLOUD_HEIGHT, x, y + CLOUD_HEIGHT - RADIUS, RADIUS);
  ctx.lineTo(x, y + RADIUS);
  ctx.arcTo(x, y, x + RADIUS, y, RADIUS);
  ctx.fill();
  ctx.closePath();
};

var writeCongratulation = function (ctx) {
  ctx.fillText('Ура, Вы победили!', CLOUD_X + 2 * GAP, CLOUD_Y + FONT_HEIGHT + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + 2 * GAP, CLOUD_Y + 2 * FONT_HEIGHT + GAP);
};

var getMaxElement = function (arr) {
  return arr.reduce(function (maxItem, current) {
    return maxItem < current ? current : maxItem;
  });
};

var makeHistogram = function (ctx, names, times) {

  var maxTime = Math.round(getMaxElement(times));

  times.forEach(function (elem, i) {
    var barY = topOfBar + BAR_MAX_HEIGHT - (BAR_MAX_HEIGHT * elem) / maxTime;
    var barX = CLOUD_X + SIDE_SPACE + (BAR_WIDTH + BAR_SPACE) * i;

    ctx.fillText(Math.round(elem), barX, barY - GAP);

    ctx.fillStyle = names[i] === 'Вы' ? '#f00' : 'rgba(0, 0, 255, ' + Math.ceil(Math.random() * 1000) / 1000;
    ctx.fillRect(barX, barY, BAR_WIDTH, (BAR_MAX_HEIGHT * elem) / maxTime);

    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText(names[i], barX, topOfBar + BAR_MAX_HEIGHT + FONT_HEIGHT, TEXT_WIDTH);
  });

};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = FONT_PARAMETER;

  writeCongratulation(ctx);

  makeHistogram(ctx, names, times);
};
