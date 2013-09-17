
	/*
		jQuery Events
		james.bunker@evolvingagency.com
	*/

	$(document).ready(function() {
		if(!($.browser.msie && $.browser.version=="6.0")) {
			$().jSnow({
				flakeCode: [
					'img/sakura/flake-30-10.png',
					'img/sakura/flake-50-10.png',
					'img/sakura/flake-75-10.png',
					'img/sakura/flake-30-15.png',
					'img/sakura/flake-50-15.png',
					'img/sakura/flake-75-15.png',
					'img/sakura/flake-30-30.png',
					'img/sakura/flake-50-30.png',
					'img/sakura/flake-75-30.png'
				],
				flakes:			50,
				flakeMinSize:	5,
				flakeMaxSize:	15
			});
		}
	});
