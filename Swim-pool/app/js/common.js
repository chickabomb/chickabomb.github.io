$(function() {

	$('.menu-btn').on('click', function(e) { // когда нажимаем 'click' то произойдёт функция 
	e.preventDefault(); // отменяет событие при нажатие на ссылку, т.е. в данном случае кнопки
	$(this).toggleClass('menu-btn__active'); // присвоем .menu-btn новый класс при нажатии
	$('.menu-nav').toggleClass('menu-nav__active');
	$('.menu-social').toggleClass('menu-social__active');
});
	
	$('.carousel-photo').owlCarousel({
		loop: true,
		nav: true,
		smartSpeed: 700,
		navText: ['<i class="fa fa-angle-double-left"></i>','<i class="fa fa-angle-double-right"></i>'],
		responsiveClass: true,
		autoHeight: true,
		dots: false,
		responsive: {
			0: {
				items: 1
			},
			768: {
				items: 2
			}
		}
	});

	$(window).scroll(function() {
		if ($(this).scrollTop() > $(this).height()) {
			$('.up-up').addClass('active');
		} else {
			$('.up-up').removeClass('active');
		}
	});
	$('.up-up').click(function() {
		$('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
	});

});
	
$(window).on('load', function() {
	$('.preloader').delay(500).fadeOut('slow');
	});