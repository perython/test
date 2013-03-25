var timer;
var time_left;
var points;
var gameover;
var cell_pairs_num;
var s;
var colors;

function get_random_color() {
  // returns random color in hex format with # at the beginning
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}

function shuffle(o){
  // shuffles array
  for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
  return o;
};

function timer_tick() {
  // checks and loops timer
  time_left -= 1;
  update_timer();
  if (!gameover) {
    if (time_left <= 0) {
      time_left = 0;
      game_over('Time is out. Game over.');
    } else {
      timer = setTimeout("timer_tick()", 1000);
    }
  }
}

function update_timer() {
  // updates timer on the screen
  $('#info .timer').text(time_left);
}

function game_over(msg) {
  // ends game, shows message and "play again" button
  gameover = true;
  clearTimeout(timer);
  alert(msg);
  $('#grid').unbind('click');
  $('#info .reload').show().on('click', function(){
    init();
    $(this).hide();
  });
}

function init() {
  cell_pairs_num = 25;
  time_left      = 60;
  points         = 0;
  gameover       = false;
  colors         = new Array();
  s              = '';

  // creates game data: pairs of random colors elements
  for (var i=0; i<cell_pairs_num*2; i++) {
    s += '<div class="cell"></div>';
    if (i < cell_pairs_num) {
      var color = get_random_color();
      colors.push(color);
      colors.push(color);
    }
  }
  shuffle(colors);

  // creates game field
  $('#grid').empty().append(s).find('.cell').each(function(index, element){
    $(this).css('background-color', colors[index])
  });
  var img_number = Math.floor((Math.random()*3)+1);
  $('#grid').css('background', 'url(img/'+img_number+'.jpg)');

  // set timer
  update_timer();
  clearTimeout(timer);
  timer = setTimeout("timer_tick()", 1000);

  $('#info .points').text(points);

  var clicked = false;
  var first;
  $('#grid').click(function(e){
    if (!($(e.target).hasClass('chosen') || $(e.target).hasClass('out'))) {
      if (clicked) {
        $(e.target).addClass('chosen');  
        setTimeout(function(){
          // compares two selected elements of game field
          var second = $(e.target);
          var equal = first.css('background-color') == second.css('background-color');
    
          console.log(first.css('background-color'));
          console.log(second.css('background-color'));

          if (equal) {
            first.addClass('out').css('background', 'transparent');
            second.addClass('out').css('background', 'transparent');
            points += 1;
            cell_pairs_num -= 1;
            $('#info .points').text(points);
            if (cell_pairs_num <= 0 && !gameover) {
              game_over('You win. Game over.');
            }
          }
          clicked = false;
          first.removeClass('chosen');
          second.removeClass('chosen');
        }, 200);
      } else {
        clicked = true;
        first = $(e.target);
        first.addClass('chosen');
      }
    }
  })  
}

$(function(){  
  init();
});