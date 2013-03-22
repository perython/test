function get_random_color() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.round(Math.random() * 15)];
  }
  return color;
}

$(function(){
  var s = '';
  var cell_num = 50;
  for (var i=0; i<cell_num; i++) {
  	s += '<div class="cell" style="background: '+get_random_color()+'""></div>';
  }	
  $('#grid').append(s);

  $('.cell').mouseenter(function(){
  	$(this).css('background', get_random_color());
  });
});