
function picSwiper (g,n,t,options) {
/*	this.options = {
		gallery: true,
		comment: true,
		clicklarge: true,
	};*/
	this.loaded(g);
	this.begin(g,n,t);
};

picSwiper.prototype = {
	loaded: function(g){
		/*评论区滚动条*/
		rScroll = new IScroll(g + ' #wrapper', {
			scrollbars: true,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
			fadeScrollbars: true
		});
		/*图片简介滚动条*/
		$(g + ' .wrapper-text').each(function(i) {
			textScroll = new IScroll(this, {
				scrollbars: true,
				mouseWheel: true,
				interactiveScrollbars: true,
				shrinkScrollbars: 'scale',
				fadeScrollbars: true
			});
		});
		/*图片简介是否为空*/
		$(g + ' .movie-text').each(function(i){
			var a = $(this).children('h1')[0];
			if($(a).html() === ''){
				$(this).css('background','none');
			}
		});

		/*打分*/
		$('#raty').raty({
			path: function() {						//图片路径
				return this.getAttribute('data-path');
			},
			number: function() {					//星星数量
				return $(this).attr('data-number');
			},
			score: 5,								//默认分数
		//	cancelOff : 'cancel-off-big.png',		//未选中重新评分按钮
		//	cancelOn  : 'cancel-on-big.png',		//选中重新评分按钮
			starOn  : 'star-smile-gorgeous.png',	//激活星星图标
			starOff : 'star-smile-off.png',			//未激活星星图标
		//	starHalf : 'star-half-smile.png',		//半颗激活星星图标
			/*iconRange : [							//批量编辑星星图标
				{ range : 1, on: 'star-smile-bad.png'},
				{ range : 2, on: 'star-smile-regular.png'},
				{ range : 3, on: 'star-smile-gorgeous.png'}
			],*/
		//	precision : true,						//是否包含小数
		//	cancel : true,							//开启重新评分
		//	cancelPlace : 'right',					//重新评分按钮位置
		//	cancelHint : '重新评分',					//点击重新评分按钮后提示的内容
		//  targetType: 'number'  					//类型选择，score、number是数字值
			halfShow : 'false',
		//	target : '#raty1-hint',					//目标div节点
		//	targetKeep : true,		    			//点击后，内容的显示
			hints: ['很差', '一般', '好', '很好', '非常好'],			//等级的内容
		});

		$('#raty1').raty({
			path: function() {						//图片路径
				return this.getAttribute('data-path');
			},
			number: function() {					//星星数量
				return $(this).attr('data-number');
			},
			score: 0,								//默认分数
			starOn  : 'star-smile-gorgeous.png',	//激活星星图标
			starOff : 'star-smile-off.png',			//未激活星星图标
			halfShow : 'false',
			hints: ['很差', '一般', '好', '很好', '非常好'],			//等级的内容
		});
		$('#raty2').raty({
			path: function() {
				return this.getAttribute('data-path');
			},
			number: function() {
				return $(this).attr('data-number');
			},
			cancelOff : 'cancel-off-big.png',
			cancelOn  : 'cancel-on-big.png',
			starOn  : 'star-smile-gorgeous.png',
			starOff : 'star-smile-off.png',
			halfShow : false,
			hints : ['很差', '一般', '好', '很好', '非常好'],
		});
		$('#raty3').raty({
			path: function() {
				return this.getAttribute('data-path');
			},
			number: function() {
				return $(this).attr('data-number');
			},
			starOn  : 'star-smile-gorgeous.png',
			starOff : 'star-smile-off.png',
			halfShow : false,
			hints : ['很差', '一般', '好', '很好', '非常好'],
		});
		$('#raty img').on('click',function(){
			$('.raty-wrap').slideToggle(200);
		});
		/*通用方法————收起展开的div*/
		$(g).on('click',function(e){
			var e = e || window.event; //浏览器兼容性
			var elem = e.target || e.srcElement;
			while (elem) { //循环判断至跟节点，防止点击的是div子元素
				if (elem.id && elem.id=='raty-container') {
					return;
				}
				elem = elem.parentNode;
			}
			var style = $('.raty-wrap').attr('style');
			if(style) var b = style.match('block');
			if(b) $('.raty-wrap').slideToggle(200); //点击的不是div或其子元素
		});

	},
	begin: function(g,n,t) {
		var top = g + ' .gallery-top';
		var mtext = top + ' .movie-text';
		var galleryTop = new Swiper(top, {
			initialSlide :n-1,
			runCallbacksOnInit : true,
//			nextButton: top + ' .swiper-button-next',
//			prevButton: top + ' .swiper-button-prev',
			spaceBetween: 10,
			preloadImages: false,
			lazyLoading: true,
			keyboardControl : true,
			//mousewheelControl : true,
			onInit: function(){
				pageNum();
				detectEq();
			},
			onSlideChangeEnd: function(galleryTop){
				pageNum();
				changePages();
			},
			onTap: function(galleryTop,event){
				var m = $(mtext);
				var h = $(g + ' .handle-tab-wrap');
				var d = $(g + ' .close');
				var p = $(g + ' .swiper-button-white');
				closeDropdown();
			},
			onSliderMove: function(galleryTop,event){
				var m = $(mtext);
				tapToggle(m)
				closeDropdown();
			},
			onSetTransition: function(galleryTop, transition){
				var m = $(mtext);
				tapToggle(m);
			}
		});

		/*当前页码*/
		function pageNum(){
			var lazy = top + ' .swiper-slide .swiper-lazy';
			var totalnum = g + ' .total-number';
			var currentnum = g + ' .current-number';
			var i=$(lazy).size();
			$(totalnum).html(i);
			$(currentnum).html(n + "/");
		}

		/*设备检测*/
		function detectEq(){
			var p = $(g + ' .swiper-button-white');
			if(navigator.userAgent.match(/Android/i) || (navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1)) {
//			if (document.body.scrollWidth < 640 || document.body.scrollWidth == 640){
				$('.wrapper').css({'overflow':'hidden','height':'100%'});
				$('.swiper-container').css({'z-index':'0'})
				$('body').css({'background':'#000'});
				$(p).css('display','none');
			} else {
				$('body').css('overflow','hidden');
			}
		}

		function changePages(){
			var j = $(top + " .swiper-slide-active").index() + 1;
			$(g + " .current-number").html(j + "/");
		};

		/*左右切换箭头点击事件*/
		$(g + ' .swiper-button-white').bind('click',function(){
			var m = $(mtext);
			tapToggle(m);
		});
		$(top + ' .swiper-button-next').on('click',function(){changePic("next")});
		$(top + ' .swiper-button-prev').on('click',function(){changePic("prev")});
		function changePic(np){
			if(np == "next") {
				galleryTop.slideNext();
			} else {
				galleryTop.slidePrev();
			}
		}

		/*喜欢-心形效果*/
		$(g + ' .like').click(function(){
			closeDropdown();
			if(this.getAttribute('title') === '喜欢'){
				this.setAttribute('title','取消喜欢');
				this.innerHTML = '<i class="icon-m fa fa-fw fa-heart font-alert no-heart"><span></span><span></span></i>';
			}else{
				this.setAttribute('title','喜欢');
				this.innerHTML = '<i class="icon-m fa fa-fw fa-heart-o red-heart"><span></span><span></span></i>';
			}
		});

		function tapToggle(m){};

		/*图片信息和分享*/
		$(g + ' .handle-tab-info').bind('click',function(){
			$(g + ' .handle-tab-share').removeClass('show');
			$(this).toggleClass("show");
			var dd = $(this).next('.info-dropdown');
			dd.slideToggle('normal');
			$(g + ' .share-dropdown').hide();
		});
		$(g + ' .handle-tab-share').bind('click',function(){
			$(g + ' .handle-tab-info').removeClass('show');
			$(this).toggleClass("show");
			var dd = $(this).next('.share-dropdown');
			dd.slideToggle('normal');
			$(g + ' .info-dropdown').hide();
		});

		if (document.body.scrollWidth < 640 || document.body.scrollWidth == 640){
			$(g + ' .comment_list').bind('click',function(){
				/*小屏下评论列表的显示*/
				deActiveIcon();
				$(g + ' .down').hide();
				$(g + ' .album').css('left','-500px');
				$(g + ' .figure-side').attr('id','out');
				$(g + ' .image-head-back').show();
				$(g + ' .figure-side .figure-side-hd').show();
				$(g + ' .photo_layer').css('top','0px');
			});
		} else {
			$(g + ' .comment_list').bind('click',function(){
				/*大屏下评论右侧弹出*/
				deActiveIcon();
				if($(g + ' .figure-side').attr('id') == 'out'){
					$(this).children().removeClass('show');
					closeComment();
				} else {
					resizeSwiper();
					$(this).children().addClass('show');
					$(g + ' .down').hide();
					$(g + ' .photo_layer').css('top','0');
					$(g + ' .figure-side').attr('id','out');
	/*				$(g + ' .photo_layer').on('click',function(event){
						$(g + ' .photo_layer').removeAttr('style');
						$(g + ' .figure-side').removeAttr('id');
						event.stopPropagation();
					});
	*/
					$(g + ' .figure-side').on('click',function(event){
						//event.stopPropagation();
					});
				}
			});
		}

		/*小屏下返回观看图片*/
		$(g + ' .image-head-back .back').bind('click',function(){
			if (document.body.scrollWidth < 640 || document.body.scrollWidth == 640){
				$(g + ' .image-head-back').hide();
				$(g + ' .album').removeAttr('style');
				$(g + ' .figure-side .figure-side-hd').hide();
				$(g + ' .photo_layer').attr('style','');
				$(g + ' .figure-side').removeAttr('id');
			} else {
				closeComment();
			}
		});

		/*上拉菜单收起*/
		function closeDropdown(){
			$(g + ' .down').hide();
			deActiveIcon();
		};

		function deActiveIcon(){
			$(g + ' .handle-tab-share').removeClass('show');
			$(g + ' .handle-tab-info').removeClass('show');
		}

		/*右侧评论弹出，图片swiper宽度重置*/
		function resizeSwiper(){
			var width = parseInt($(document.body).outerWidth(true)) - 400 + 'px';
			$(g + ' .handle-tab-wrap').css('right','400px');
			$(g + ' .image-head').css('width',width);
			$(top).css({'width':width,'margin-left':'0'});
			galleryTop.onResize();
		}

		function closeComment(){
			$(g + ' .down').hide();
			$(g + ' .handle-item').removeClass('show');
			$(g + ' .photo_layer').removeAttr('style');
			$(g + ' .figure-side').removeAttr('id');
			$(g + ' .image-head').removeAttr('style');
			if($(g + ' .handle-tab-wrap').css('top') == "-100px"){
				$(g + ' .handle-tab-wrap').css('right','0px');
			} else {
				$(g + ' .handle-tab-wrap').removeAttr('style');
			}
			$(top).removeAttr('style');
			galleryTop.onResize();
			event.stopPropagation();
		}

		/*关闭*/
		/*ESC关闭*/
		$(document).keyup(function(event){
			switch(event.keyCode) {
				case 27:
				$(g + ' .close').click();
			}
		});
		/*图片按钮关闭*/
		$(g + ' .close').bind('click',function(e){
			closeDropdown();
			$(g).hide().unbind('click');
			$(g + ' .handle-tab li').unbind('click');
			$(g + ' .icon-comment-m').parent().parent().unbind('click');
			$(g + ' .drop').unbind('click');
			$(g + ' .handle-tab-info').unbind('click');
			$(g + ' .handle-tab-share').unbind('click');
			$(top + ' .swiper-button-next').unbind('click');
			$(top + ' .swiper-button-prev').unbind('click');
			$(g + ' .gallery-top').unbind('onTap').removeAttr('style');
			$(g + ' .image-head').removeAttr('style');
			$(g + ' .swiper-wrapper').removeAttr('style');
			$(g + ' .dropdown').hide();
			$(g + ' .close').removeAttr('style');
			$(g + ' .handle-tab-wrap').removeAttr('style');
			$(g + ' .handle-item').removeClass('show');
			$(g + ' .swiper-button-white').removeAttr('style');
			$(g + ' .movie-text').removeAttr('style');
			$(g + ' .photo_layer').removeAttr('style');
			$(g + ' .figure-side').removeAttr('id');
			$(g + ' .like').unbind('click');
			$(g + ' .like').html('<i class="icon-m fa fa-fw fa-heart-o"></i>');
			galleryTop.onResize();
			galleryTop.detachEvents(); //移除所有slide监听事件
			galleryTop.attachEvents();//重新绑定所有监听事件。
			$('body').removeAttr('style');
			$('.wrapper').removeAttr('style');
			if(rScroll){ rScroll.destroy();};
			if(textScroll){ textScroll.destroy();};
			document.body.removeEventListener('touchmove', preventDefault ,false);
			$(document).scrollTop(t);
		});

		function preventDefault(e) { e.preventDefault(); };
		document.body.addEventListener('touchmove', preventDefault ,false);

	}
};
