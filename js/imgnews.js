/**
*  imgnews.js
*  图标新闻版块js
*  @author lanyue
*  @time 2016-04-13
***/
;(function(){
	var on=function(target,eventstr,callback){
		//console.log(typeof target);
		if(typeof target !== "object"){
			return;
		}

		if(document.all){
			target.attachEvent("on"+eventstr,callback);
		}else{
			target.addEventListener(eventstr,callback,false);
		}
	}
	on(window,"load",function(){
		var imgnews=document.getElementById("imgnews");
		var imgsbg=document.getElementById("imgsbg");
		var imgsbox=document.getElementById("imgsbox");
		var btnlast=document.getElementById("btn-last");
		var btnnext=document.getElementById("btn-next");
		var inpage=document.getElementById("inpage").children;
		var indetail=document.getElementById("indetail");
		var imgslist=imgsbox.children[0].children;
		var imglen=imgslist.length;
		resize();
		//设置li的line-height达到垂直居中
		on(window,"resize",function(){
			resize();
		});
		function resize(){
			for(var i=0;i<imglen;i++){
				imgslist[i].style["line-height"]=imgsbg.offsetHeight+"px";
			}
		}
		function showmessage(data){
			indetail.innerText=data;
		}
		//初始化
		inpage[1].innerHTML=imglen;
		inpage[0].innerHTML=1;
		showmessage(imgslist[0].getAttribute("data-message"));
		var index=0;
		var last=[];
		var next=[];
		for(var i=imglen-1;i>0;i--){
			next.push(i);
		}
		//
		on(btnlast,"click",function(){
			lastPage();
		});
		on(btnnext,"click",function(){
			nextPage();
		});
		//鼠标滚轮事件
		mousewheel(imgnews,function(e){
			if(e.direction=="up"){
				lastPage();
			}else{
				nextPage();
			}
		});
		

		touch.on(imgnews, 'swipeleft', function(ev){
			nextPage();
			ev.preventDefault();

		});
		touch.on(imgnews, 'swiperight', function(ev){
			lastPage();
			ev.preventDefault();

		});
		function nextPage(){
			if(next.length<=0){
				return;
			}
			//左移一张图片
			imgslist[index].style["right"]="200%";
			last.push(index);
			index=next.pop();
			inpage[0].innerHTML=index+1;
			var title=imgslist[index].getAttribute("data-message");
			if(title){
				showmessage(title);
			}
			//显示当前图片
			imgslist[index].style["right"]="0%";
			//console.log(index,last,next);
		}
		function lastPage(){
			if(last.length<=0){
				return;
			}
			//右移一张图片
			imgslist[index].style["right"]="-100%";
			next.push(index);//把右移的图片入栈
			index=last.pop();
			inpage[0].innerHTML=index+1;
			var title=imgslist[index].getAttribute("data-message");
			if(title){
				showmessage(title);
			}
			// console.log(imgslist[index].dataset);
			//显示当前图片
			imgslist[index].style["right"]="0%";
			//console.log(index,last,next);
		}
	})
	
	
})();