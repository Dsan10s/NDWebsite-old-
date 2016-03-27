

// links 
// http://news.mit.edu/2016/sophomores-champion-random-acts-of-kindness-week-0317
// https://mindhandheart.mit.edu/events/random-acts-kindness#calendar
// 
$(document).ready(function() {
	firstLine = $("#random");
	secondLine = $("#acts");
	thirdLine = $("#kindness");
	banner = $("#banner");
	intro = $("#intro");

	$("body").animate({"opacity": 1}, 1000, function(){
		$(firstLine).animate({"opacity": 1, "margin-left": -75}, 500, function(){
			$(secondLine).animate({"opacity": 1}, 500);
			$(secondLine).animate({"margin-left": -25}, 500, function(){
				$(thirdLine).animate({"opacity": 1}, 500);
				$(thirdLine).animate({"margin-left": 40}, 500, function(){
					firstLine.fadeOut();
					secondLine.fadeOut();
					thirdLine.fadeOut(400, function(){
						$(banner).animate({"opacity": 1})
					});
					
				});
			});	
		});
	});

});