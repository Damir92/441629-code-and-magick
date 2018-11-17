'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var RADIUS = 50;
var GAP = 10;
var FONT_HEIGHT = 20;
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

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px "PT Mono"';
  ctx.fillText('Ура, Вы победили!', CLOUD_X + 2 * GAP, CLOUD_Y + FONT_HEIGHT + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + 2 * GAP, CLOUD_Y + 2 * FONT_HEIGHT + GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(Math.round(times[i]), CLOUD_X + SIDE_SPACE + (BAR_WIDTH + BAR_SPACE) * i, topOfBar + BAR_MAX_HEIGHT - (BAR_MAX_HEIGHT * times[i]) / maxTime - GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = '#f00';
    } else {
      ctx.fillStyle = 'rgb(' + Math.round(Math.random() * 255) + ', ' + Math.round(Math.random() * 255) + ', 255)';
    }
    ctx.fillRect(CLOUD_X + SIDE_SPACE + (BAR_WIDTH + BAR_SPACE) * i, topOfBar + BAR_MAX_HEIGHT - (BAR_MAX_HEIGHT * times[i]) / maxTime, BAR_WIDTH, (BAR_MAX_HEIGHT * times[i]) / maxTime);

    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fillText(names[i], CLOUD_X + SIDE_SPACE + (BAR_WIDTH + BAR_SPACE) * i, topOfBar + BAR_MAX_HEIGHT + FONT_HEIGHT, TEXT_WIDTH);
  }
};
