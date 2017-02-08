(function($) {
    $.fn.swiperThumbs = function(options) {
        var opts = $.extend({}, $.fn.swiperThumbs.defaults, options);
        return this.each(function() {
            var $this = $(this),
                $swiperContent = $($this.find('.swiper-content')),
                $swiperNav = $($this.find('.swiper-nav')),
                $swiperLeft = $($this.find('.arrow-left')),
                $swiperRight = $($this.find('.arrow-right')),
                o = $.meta ? $.extend({}, opts, $this.data()) : opts,
                dir = o.direction,
                h = o.height,
                slides = o.navSlidesPerView,
                w;
            //if(o.direction == 'vertical') $this.addClass('dirVertical');
            if(dir == 'vertical') {
                w = $swiperContent.width() - $swiperNav.width();
                slides = 'auto';
            }
            //console.log(dir);
            var contentSwiper = $swiperContent.swiper({
                onSlideChangeStart: function() {
                    $.fn.swiperThumbs.updateNavPosition($swiperContent,$swiperNav,contentSwiper,navSwiper);
                },
                onInit: function(swiper) {
                    swiper.swipeNext($swiperContent,$swiperNav,contentSwiper,navSwiper);
                }
            });
            var navSwiper = $swiperNav.swiper({
                visibilityFullFit: true,
                slidesPerView: slides,
                mode: dir,
                onSlideClick: function() {
                    contentSwiper.swipeTo(navSwiper.clickedSlideIndex);
                }
            });
            $.fn.swiperThumbs.setContentSize($this,$swiperContent,$swiperNav,w,h);
            $swiperLeft.click(function() {
                contentSwiper.swipePrev();
                $.fn.swiperThumbs.updateNavPosition($swiperContent,$swiperNav,contentSwiper,navSwiper);
            });
            $swiperRight.click(function() {
                contentSwiper.swipeNext();
                $.fn.swiperThumbs.updateNavPosition($swiperContent,$swiperNav,contentSwiper,navSwiper);
            });
            $(window).resize(function() {
                $.fn.swiperThumbs.setContentSize($this,$swiperContent,$swiperNav,w,h);
            });
        });
    };
    $.fn.swiperThumbs.updateNavPosition = function(c,n,cs,ns) {
        var allActiveNav = n.find('.active-nav'),
            allSlide = n.find('.swiper-slide'),
            activeNav = $(allSlide).eq(cs.activeIndex);
        $(allActiveNav).removeClass('active-nav');
        $(activeNav).addClass('active-nav');
        if (!activeNav.hasClass('swiper-slide-visible')) {
            if (activeNav.index() > ns.activeIndex) {
                var thumbsPerNav = Math.floor(ns.width / activeNav.width()) - 1;
                ns.swipeTo(activeNav.index() - thumbsPerNav);
            } else {
                ns.swipeTo(activeNav.index());
            };
        };
    };
    $.fn.swiperThumbs.setContentSize = function(c,t,n,w,h) {
		/*var scale = t.find('.inner img').width() / t.find('.inner img').height();
		console.log(scale);*/
		if($(window).width() > 768){
			c.css({ height: t.find('.inner img').height() + n.height()});
			t.css({ height: t.find('.inner img').height()});
		} else {
			c.css({ height: $(window).width()*0.44 + n.height()});
			t.css({ height: $(window).width()*0.44});
		}
		//console.log(c);
		//$swiperContent.find('.inner img').height()
    };
    $.fn.swiperThumbs.defaults = {
        direction: 'horizontal',
        navSlidesPerView: 'auto'
    };
})(jQuery);
