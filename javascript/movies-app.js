$(function(){
	var $swiperTitles = $('.swiper-titles'),
		activeTitle;
	function setContentSize() {
		$('.swiper-content').css({
			height: $('.swiper-content .inner img').height()
		});
		$('.swiper-container').css({height: $('.swiper-content .inner img').height()});
		if($(window).width()>=320 && $(window).width()<=640){
			$('.swiper-nav').css({width: $('.swiper-content').width()});
		}else{
			$('.swiper-nav').css({width: $('.swiper-content').width()/3});
		}
		
	}
	setContentSize()
	$(window).resize(function(){
		setContentSize()
	})

	//Swiper Content
	var contentSwiper = $('.swiper-content').swiper({
		onSlideChangeStart: function(swiper){
			navSwiper.swipeTo( contentSwiper.activeIndex );
			updateNavPosition();
		},
		onInit: function(swiper){
	      swiper.swipeNext();
	    }
	})

	$('.arrow-left').click(function(){
		contentSwiper.swipePrev();
		updateNavPosition();
	})
	$('.arrow-right').click(function(){
		contentSwiper.swipeNext();
		updateNavPosition();
	})

	//Nav
	var navSwiper = $('.swiper-nav').swiper({
		visibilityFullFit: true,
		slidesPerView: 3,
		//Thumbnails Clicks
		onSlideClick: function(){
			contentSwiper.swipeTo( navSwiper.clickedSlideIndex )
		}
	})

	//Update Nav Position
	function updateNavPosition(){
		$('.swiper-nav .active-nav').removeClass('active-nav');
		var activeNav = $('.swiper-nav .swiper-slide').eq(contentSwiper.activeIndex).addClass('active-nav');
		/*var j = $(".active-nav img").attr("num");
		$(".current-number").html(j + "/");*/
		activeTitle = $swiperTitles.find('.swiper-title')[contentSwiper.activeIndex];
		$swiperTitles.find('.swiper-title').removeClass('active');
		console.log(contentSwiper.activeIndex);
		$(activeTitle).addClass('active');
		if (!activeNav.hasClass('swiper-slide-visible')) {
			if (activeNav.index()>navSwiper.activeIndex) {
				var thumbsPerNav = Math.floor(navSwiper.width/activeNav.width())-1
				navSwiper.swipeTo(activeNav.index()-thumbsPerNav)
			}
			else {
				navSwiper.swipeTo(activeNav.index())
			}
		}
	}
})



