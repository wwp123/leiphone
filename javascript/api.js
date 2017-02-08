$(function(){
	$('.photoGallery').each(function(){
		var _this = $(this);
		_this.find('.entrance').click(function(){
			_this.find('.gallery').css('display','block');
			$('body').css('overflow','hidden');
			var t = $(document).scrollTop();
	        _this.find('.gallery .close').unbind('click');
			new picSwiper('#'+_this.find('.gallery')[0].id,_this.parent().parent().index()+1,t,{});
		});
	});
})
