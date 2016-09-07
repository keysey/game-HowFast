window.onload=function(){
//获取元素
	var btn = $("#btn");
	var box = $("#box");
	var fraction = $("#fraction");
	var oP = $('p',fraction);
	var qq = $("#qq");
	var imgs = $("img",qq)[0];
//图片数组	
	var arr = ["../img2/1.png","../img2/2.png"];
	var leftlen = Math.round(Math.random()*(746-30)+30);    //30~800-24-30
	
	var num = 0;   //点击到图片的数值
	var numb = 0;	//未点击到图片的数值
	var n = 30;		//摆动范围30~-30
	
//摆动函数
	function shake(obj,attr,ranged){
		clearInterval(obj[attr]);
		ranged = ranged || n; //给默认值为n
		var arr = [];
		//得到一堆正负数
		for( var i = ranged; i > 0; i-=2 ){
			arr.push(i,-i);  
		}
		arr.push(0);     //得到一组数组[30,-30,28,-28.....0]
		var m = 0;
		var b = parseInt(getComputedStyle(obj)[attr]);  //取目标属性的整数
		
		obj[attr] = setInterval(function (){
			obj.style[attr] = b + arr[m] + "px";   
			m++;
			if( m === arr.length ){			//到m为length的时候，清除定时器
				clearInterval(obj[attr]);
				fn();						//到摆动结束时，调用函数fn
			};
		},30);		
	}
	
	function fn(){
//	初始化
		clearInterval(imgs.top);
		imgs.style.top = "0px";
		imgs.style.opacity = 1;
//	取图片的随机数
		var imgnum = Math.round(Math.random()*1);
		imgs.src = arr[imgnum];
//	取出现位置的随机数	
		var leftlen = Math.round(Math.random()*(746-30)+30);  //范围30~746
		imgs.style.left = leftlen+"px";
//	调用运动函数mTween
		mTween(imgs,"top",450,10000-num*1000,"linear",function (){
			if (imgs.style.top == "450px") {		//如果图片掉到底部，失分数值加一，关闭当前这次定时器，摆动box
				numb++;
				oP[1].innerHTML = '失分：'+numb+'分';
				clearInterval(imgs.top);
				shake(box,"top");
			}
			imgs.style.left = leftlen+"px";			//重新获取图片位置和初始高度，透明度
			imgs.style.top = "-24px";
			imgs.style.opacity = 0;	
		});
		if (numb==10) {							//如果失分数值达到10分，结束游戏
			clearInterval(imgs.top);
			imgs.style.opacity = 0;				//图片透明度为0
			alert("游戏结束，重新开始吧");
			btn.value = "开始游戏";
//  	初始计数数值
			num=0;
			numb=0;
			oP[0].innerHTML = '得分：'+num+'分';
			oP[1].innerHTML = '失分：'+numb+'分';
		}
		isMousedown = false;  //为了再重复点击图片时。只摆动一次。
	}
//点击开始游戏按钮事件
	btn.onclick = function (){
		btn.value = "游戏进行中";
		fn();	
	};
//点击图片事件
    var isMousedown = false;  //先给出开关状态为false
	imgs.onmousedown = function (){
		//停止定时器
		clearInterval(imgs.top);
			if (!isMousedown) {    //如果为true,调用函数shake
				shake(imgs,"left")
			}			
			num++;
			oP[0].innerHTML = '得分：'+num+'分';
			isMousedown = true;      //点击图片结束时把开关置为true
	}				
}
