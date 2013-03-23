function get_random_color() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

$(function(){
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

  $('#grid').append(s).find('.cell').each(function(index, element){
  	$(this).css('background', colors[index])
  });
  
  var clicked = false;
  var first;
  $('#grid').click(function(e){
  	if (clicked) {
      compare(first, $(e.target));
  	} else {
  	  clicked = true;
  	  first = $(e.target);
  	  first.addClass('chosen');
  	}
  })

  function compare(first, second) {
  	var equal = false;
  	if (first.css('background') == second.css('background')) equal = true;
  	second.addClass('chosen');
  	if (equal) {
  	  first.css('background', '#fff');
  	  second.css('background', '#fff');
  	  $('#info .points').text(parseInt($('#info .points').text()) + 1);
  	}
  	clicked = false;
  	first.removeClass('chosen');
  	second.removeClass('chosen');
  }
  /*
  $('.cell').mouseenter(function(){
  	$(this).css('background', get_random_color());
  });
  //*/
});