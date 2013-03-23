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
  timer -= 1;
  update_timer();
  if (timer <= 0) {
    gameover = true;
    alert('Time is out. Game over.');
  } else {
    setTimeout("timer_tick()", 1000);
  }
}

function update_timer() {
  $('#info .timer').text(timer);
}

var timer = 5;
var gameover = false;

$(function(){

  // creates game data: pairs of random colors elements
  var cell_pairs_num = 25;
  var s = '';
  var colors = new Array();
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
  $('#grid').append(s).find('.cell').each(function(index, element){
  	$(this).css('background', colors[index])
  });

  // set timer
  update_timer();
  window.setTimeout("timer_tick()", 1000);

  var clicked = false;
  var first;
  $('#grid').click(function(e){
  	if (!$(e.target).hasClass('chosen')) {
	  if (clicked) {
	    $(e.target).addClass('chosen');  

	    setTimeout(function(){
	      // compares two selected elements of game field
	      var second = $(e.target);
  		  var equal = first.css('background') == second.css('background');
  	
  		  if (equal) {
  	  		first.css('background', '#fff');
  	  		second.css('background', '#fff');
  	  	    $('#info .points').text(parseInt($('#info .points').text()) + 1);
  		  }
  		  clicked = false;
  		  first.removeClass('chosen');
  		  second.removeClass('chosen');
	    }
	    //compare(first, $(e.target))
	    , 200);

	  } else {
	    clicked = true;
	    first = $(e.target);
	    first.addClass('chosen');
	  }
	}
  })

  /*
  function compare(first, second) {
  	// compares two selected elements of game field
  	console.log('compare runned!');
  	var equal = first.css('background') == second.css('background');
  	
  	if (equal) {
  	  first.css('background', '#fff');
  	  second.css('background', '#fff');
  	  $('#info .points').text(parseInt($('#info .points').text()) + 1);
  	}
  	clicked = false;
  	first.removeClass('chosen');
  	second.removeClass('chosen');
  }
  //*/
  /*
  $('.cell').mouseenter(function(){
  	$(this).css('background', get_random_color());
  });
  //*/
});