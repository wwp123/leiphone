
//头部搜索
function showSearch(){
	$('.userset-list').slideUp(200);
	
	var topsearch =  document.getElementById("topsearch");	  	 
	if(topsearch.style.display == "block"){
	topsearch.style.display = "none";
	}else{
	  topsearch.style.display = "block";
	}
}

//返回头部、底部
function goTop() { window.scroll(0, 0)}
function goBottom(){var bottomH=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);window.scroll(0,bottomH);}


//返回头部、底部
$(function () {
	$(".gotop").click(/*定义返回顶部点击向上滚动的动画*/
	function () {
		$('html,body').animate({ scrollTop: 0 }, 700);
	});
	$(".gohome").click(/*定义返回顶部点击向上滚动的动画*/
	function(){
		/*HomepageFavorite.Homepage();*/
	});
	$(".gobottom").click(/*定义返回顶部点击向上滚动的动画*/
	function () {
		var bottomH=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight);window.scroll(0,bottomH);
	});
	$(document).scroll(
		function(){
			if($(document.body).scrollTop() + $(document).scrollTop() > 300 && $(document.body).scrollTop() + $(document).scrollTop() < 300){
				$(".go").css("display","block");
				$(".gobottom").css("display","block"),$(".gotop").css("display","none");
			}else if($(document.body).scrollTop() + $(document).scrollTop() > 300){
				$(".go").css("display","block");
				$(".gobottom").css("display","none"),$(".gotop").css("display","block");				
			}else{
				$(".go").css("display","none");
			}
	}
	);
})
	
	//用户设置
	$('.userset-icon').click(function(e){
		$('.sidenav .tit-list').slideUp(200);
		$('.append-aside .fd-aside').slideUp(200);
		$('.userset-list').slideToggle(200);
	});
