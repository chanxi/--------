/*********************************************************************************
------2012.08.01  v0.0------
签到发布
------2012.08.04  v0.1------
更新1:修正第一个贴吧不能签到的bug
------2012.08.22  v0.2------
更新1:解决I贴吧布局改变后不能签到的情况
------2012.08.30  v0.3------
更新1:优化签到时间，签过和不能签的改成等待1秒...
更新2:签到的贴吧显示签到的名次
更新3:签到的名次用红色的字符显示
------2012.09.01  v0.4------
更新1:修正图片类贴吧不能签到的情况
更新2:修改建议吧友的链接为新开标签打开
更新3:修改在有背景的贴吧点开本签到时，背景为贴吧背景看不清字的情况
------2012.09.02  v0.5------
更新1:添加转向各贴吧的链接，方便签到失败时候手动签到
------2012.09.03  v0.6------
更新1:增加被封禁贴吧显示异常的提示
------2012.09.25  v0.7------
更新1:增加对几种签到错误的现象正常显示并重复签到至成功
------2012.10.15  v0.8------
更新1:修复由于百度更新导致的收集贴吧失败问题
更新2:增加在页面顶部的完成提示
更新3:增加贴吧序号，方便查看签到进度
------2012.11.13  v0.9------
更新1:修复由于百度更新导致的收集贴吧失败问题
------2012.11.18  v1.0------
更新1:增加辅助贴吧，请将右边的链接鼠标点住拉到书签栏，就是点到菜单，需要到wapp.baidu.com页面下执行，仅在chrome下测试，这几天就会完善<a href=\"javascript:void((function(){var e=document.createElement('script');e.type='text/javascript';e.charset='UTF-8';e.src='http://chanxi.orgfree.com/script/mark_cell.js';document.body.appendChild(e)})());\">手机签到</a>
------2012.12.06  v1.1------
更新1:重写了显示前端
更新2:修正了签到错误的显示(之前的错误显示有问题= =，一直没发现)
更新3:增加了签到连续天数的显示
------2012.12.07 v1.1.0------
对ie做了兼容
------2012.12.08 v1.1.1------
修正连续数的显示
------2013.01.17 v1.1.2------
修正因为百度wapp签到构造改变导致的不能签到
------2013.02.24 v1.1.3------
更新1:加入随即后缀，防止因浏览器缓存引起的漏签
------2013.03.28 v1.1.4------
更新1.代码维护提示
更新2.增加广告
------2013.04.03 v1.2.0------
更新1.重新改变了界面
更新2.解决了“c++”等含有符号的贴吧的解决问题
更新3.完善了模拟手机签到的代码
提示1.新版模拟手机签到的代码可以需运行在智能版贴吧上
提示2.模拟手机签到可以运行在chrome、Firefox、还有各种双核浏览器的极速模式之下
------2013.04.03 v1.2.1------
更新1.重新匹配了ie和opera不支持新版的模拟手机签到
------2013.04.04 v1.2.2------
更新1.修复由于i贴吧部分页面下线导致的贴吧收集障碍
------2013.08.07 v1.2.3------
更新1.修复由于wapp贴吧页面代码更新导致的运行异常
------2014.03.014v1.2.4------
更新1.修复由于贴吧页面代码更新导致的运行异常
*********************************************************************************/
var BaseUrl="";
var baObjs = new Array;//存贴吧
var localUrl = window.location.href;

if(navigator.appName!='Netscape' && cutchar(localUrl,"http://",".com")=="wapp.baidu"){
	show_BaseDiv();
	load_js('http://chanxi.googlecode.com/files/sign_cell.js');
}else{
	if(cutchar(localUrl,"http://",".com")=="wapp.baidu"){
		if(document.body.innerHTML.indexOf('id="header"')>0){
			if($(".Sign_Body").length>0){
				$(".Sign_Body").remove();
			}
		}else{
			alert("从V1.2.0版起，模拟手机签到的代码要在智能版上使用，点击下面的‘确定’按钮后，本也会转到智能版贴吧，请再次点击本书签继续签到");
			location.href="//wapp.baidu.com/f/q-0---sz%401320_240%2C,-2-3-0--2/m?tn=bdIndex&lp=7202#like";
		}
	}
	if(cutchar(localUrl,"http://",".com")=="tieba.baidu"){$("#Sign_MainDiv").innerHTML+= "电脑签到<br/>";
		show_BaseDiv();
		document.getElementById("myli5").innerHTML="<a href='http://wapp.baidu.com/f/q-0---sz%401320_240%2C,-2-3-0--2/m?tn=bdIndex&lp=7202#like'  target='_blank'>进入WAPP</a>";//wapp贴吧页面的链接
		mark_fav();
	}
	if(cutchar(localUrl,"http://",".com")=="wapp.baidu"){$("#Sign_MainDiv").innerHTML= "手机贴吧<br/>";
		show_BaseDiv();
		mark_cell();
	}
	
}



function show_BaseDiv(){
	//以下基本样式
	document.body.innerHTML+=
	"<style>"+
		"html,body,div,p,ul,ol,li,dl,dt,dd,h1,h2,h3,h4,h5,h6,object,iframe,form,blockquote,fieldset,input,textarea,code,address,caption,cite,code,em,i,ins{margin:0;padding:0;}"+
		".Sign_Body{text-align:left;font-family:微软雅黑;}"+/*所有的自定义层都建在这里面*/
		".Sign_Body a, .Sign_Body a:link, .Sign_Body a:visited{color: #d79a1e; text-decoration: none; } .Sign_Body a:hover{color: blue; text-decoration: none;}"+/*所有的自定义的链接*/
		
		".Sign_BarTop{ display: block; position:absolute; position: fixed; width:100%; height:35px; top:0px; left:0px; padding-left:50px; padding-top:4px;  border-bottom: 1px solid red; background-color:black; color:white; z-index:111110; font-size:20px;}"+/* 顶部操作栏*/
		".Sign_BarTop span{ padding:0px;margin:0px;float:left;cursor: pointer;}.Sign_BtnTop{width:164px;height:30px;padding:8px 0px;}"+/*顶部栏中的按钮*/
		".Sign_BackDiv{	display: block; position:absolute; position:fixed; top:0; padding:0px;  margin:0px; width:100%; height:100%; background-color:black; z-index:110000; -moz-opacity: 0.8; opacity:.90; filter: alpha(opacity=80);}"+/*透明背景*/
		".Sign_MainDiv{ display: block; position: absolute; top: 42px; left: 30px; width: 800px; padding-top: 16px; padding-left: 16px; margin-bottom: 16px; border: 2px solid orange; background-color: white; z-index:111000;  word-wrap:break-word; -moz-opacity: 0.8; opacity:.80; filter: alpha(opacity=80);}"+/*主要显示部分*/
		".Sign_NoticeDiv{ display: block; position: absolute; position: fixed; top: 42px; right: 50px; width: 400px; height: 100%; padding-top: 16px; padding-left: 10px; z-index:111100; color:white; word-wrap:break-word; -moz-opacity: 0.9; opacity:.90; filter: alpha(opacity=90);background-color:#444444;}"+/*辅助显示部分*/
		".Sign_MainDiv li,.Sign_NoticeDiv li{ margin-left:-35px;}"+/*列举条例*/ 
		"#myli5{text-align:right;}"+
		/*以下是class*/
		".pr{color:red;} .pg{color:green;} .pb{color:blue;} .py{color:yellow;}"+/*彩色字*/
		".pt10{font-size:10pt;} .pt15{font-size:15pt;} .pt20{font-size:20pt;} .pt25{font-size:25px;} .pt50{font-size:50pt;} .pt60{font-size:60pt;} .pt70{font-size:70pt;} .pt80{font-size:80pt;} .pt90{font-size:90pt;} .pt100{font-size:100pt;} .pt120{font-size:120pt;} .pt150{font-size:150pt;} .pt200{font-size:200pt;} .pt500{font-size:500pt;}"+/*大小字*/
	"</style>";


	//以下构建了基本的页面显示框架
	document.body.innerHTML+="<div class='Sign_Body' id='Sign_Body'></div>";//我的根元素
	document.getElementById("Sign_Body").innerHTML="<div class='Sign_BarTop' id='Sign_BarTop'></div>"+//顶部工具栏
		"<div class='Sign_BackDiv' id='Sign_BackDiv'></div>"+//大背景
		"<div class='Sign_MainDiv' id='Sign_MainDiv'></div>"+//主体显示
		"<div class='Sign_NoticeDiv' id='Sign_NoticeDiv'>11</div>";//公告显示
		
	document.getElementById("Sign_BarTop").innerHTML="<div>"+//顶部栏
		"<span><div class='Sign_BtnTop' id='myli1'></div></span>"+//显示总贴吧数量
		"<span><div class='Sign_BtnTop' id='myli2'></div></span>"+//显示正在进行到第几个
		"<span><div class='Sign_BtnTop' id='myli3'></div></span>"+//完成标志
		"<span><div class='Sign_BtnTop' id='myli5'></div></span>"+//转到手机版的链接
		"<span><div class='Sign_BtnTop' id='close_btn' align='right'><a href='javascript:void 0;' onclick='div_allHid();'>关闭</a></div></span>"+//显示关闭按钮
	"</div>";
//	load_js('http://chanxi.googlecode.com/files/ad.js');
	document.getElementById("Sign_Body").innerHTML+="<img class='markPic1' style='position:absolute; position:fixed;top:0px;right:-10px;z-index:111111;' src='http://imgsrc.baidu.com/forum/pic/item/d2a29e315c6034a8bc82c368cb1349540823767a.jpg' />"+//箭头
	"<a href=\"javascript:void((function(){var e=document.createElement('script');e.type='text/javascript';e.charset='UTF-8';e.src='http://chanxi.googlecode.com/files/sign.js'+'?m='+Math.random();document.body.appendChild(e)})());\" class='markPic2' style='position:absolute;position:fixed;top:180px;right:-170px;z-index:111112;width:230px;height:70;cursor:move;background:url(http://imgsrc.baidu.com/forum/pic/item/dc8d124e251f95ca2f8ce95fc9177f3e66095261.jpg) no-repeat;'><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>一键签到</a>";//按钮标签
	
	//$(".markPic2").hover(function(){$(".markPic2").animate({right: "-20px"}, 400 );},function(){$(".markPic2").animate({right: "-170px"}, 400 );});//添加事件
	document.getElementById("myli1").innerHTML="还未收集。。。";
	document.getElementById("myli2").innerHTML="0 / 未知";
	document.getElementById("myli3").innerHTML="";
	document.getElementById("Sign_NoticeDiv").innerHTML="请自行检查有没有签到正确，如有错误，欢迎反馈：<br/>"+
		"<span class='pt15'><a href='http://tieba.baidu.com/p/1768731534'  target='_blank'>蝉曦吧反馈专用贴</a></span><br/>"+
	"服务器随时可能不可用，故关注更新帖，保证可以及时更新书签：<br/>"+
		"<span class='pt15'><a href='http://tieba.baidu.com/p/2110672062?see_lz=1'  target='_blank'>蝉曦吧地址更新专用帖</a></span><br/>"+
	// "<span style='color:red;'>代码修改中，期间使用本签到可能出现故障，请稍候再用</span><br/>"+
		"请注意:请在自动签到的时候，放慢你的发帖和回复速度，防止应为操作过频被度受和谐ID。<br/>"+
		"------2014.03.014v1.2.4------<br/>"+		
		"更新1.修复由于贴吧页面代码更新导致的运行异常<br/>"+
		"提示1.新版模拟手机签到的代码可以需运行在智能版贴吧上<br/>"+
		"提示2.模拟手机签到可以运行在chrome、Firefox、还有各种双核浏览器的极速模式之下<br/>"+
		"<span style='color:green;'>------------------------------</span><br/>"+
		"ios（越狱）和android版签到工具，请前往<a href='http://tieba.baidu.com/p/2047715431?see_lz=1' target='_blank'>手机签到工具</a>支持并提供宝贵意见，本工具相对别的签到工具的优点是:省流量；100个贴吧的签到约为300KB的流量左右<br/>";

	document.getElementById("Sign_MainDiv").innerHTML="请使用本工具的人能够将代码书签的地址改成ichanxi的地址:<br/>"+
		"javascript:void((function(){var e=document.createElement('script');e.type='text/javascript';e.charset='UTF-8';e.src='http://ichanxi.tk/script/sign.js'+'?m='+Math.random();document.body.appendChild(e)})());<br/>"+
		"以下地址一段时间内将不会保证代码的稳定性、可用性和更新状态<br/>"+
		"http://pastebin.com/raw.php?i=YGb5nCmY<br/>"+
		"https://raw.github.com/chanxi/--------/master/sign.js<br/>"+
		"http://chanxi.ueuo.com/script/sign.js<br/>"+
		"程序开始工作...<br/>---开始收集I贴吧中的贴吧名，请等待 ......<br/>";
}

function mark_fav(){//电脑签到
	countba();//收集贴吧，开始运行签到程序
}
//查贴吧数量，收集贴吧
function countba(){
	$(".Sign_BtnTop")[0].innerHTML="开始收集。。。";
	//备用收集方法
	for(var i=0;i<PageData.user.user_forum_list.info.length;i++){
		baObjs[i] =new Object;
		baObjs[i].fid=PageData.user.user_forum_list.info[i].id;
		baObjs[i].name=PageData.user.user_forum_list.info[i].forum_name;
		baObjs[i].kw=encodeURIComponent(baObjs[i].name);
	}
	$(".Sign_BtnTop")[0].innerHTML="收集完毕！";
	$(".Sign_BtnTop")[1].innerHTML="0 / "+baObjs;
	$(".Sign_MainDiv")[0].innerHTML+="估测完毕:您喜欢的贴吧有"+(baObjs.length)+"个，最长将花费时间"+parseInt(baObjs.length*6/60)+"分"+(baObjs.length*6%60)+"秒";
	checksigned(0);
	
	// $.ajax({
		 // type: "get",url: "http://tieba.baidu.com/i/" +PageData.user.itieba_id,
		 // data: "",dataType: "text",success: function (data) { 
				////alert(cutchar(data,"$_likeForum=[","];"))
				// var dataObjs=$(data).find(".always_go_list li .j_ba_link"); 
				// for(var i=0;i<dataObjs.length;i++){
					// baObjs[i] =new Object;
					// baObjs[i].fid=dataObjs.eq(i).attr("forum-id");
					// baObjs[i].name=dataObjs.eq(i).attr("title")||dataObjs.eq(i)[0].innerHTML;
					// baObjs[i].kw=dataObjs.eq(i).attr("forum");
				// }
				// $(".Sign_BtnTop")[0].innerHTML="收集完毕！";
				// $(".Sign_BtnTop")[1].innerHTML="0 / "+baObjs;
				// $(".Sign_MainDiv")[0].innerHTML+="估测完毕:您喜欢的贴吧有"+(baObjs.length)+"个，最长将花费时间"+parseInt(baObjs.length*6/60)+"分"+(baObjs.length*6%60)+"秒";
				// checksigned(0);
		 // }, 
		 // error: function () { 
			 // $(".Sign_MainDiv")[0].innerHTML+="收集贴吧遇到问题，程序不能继续下去！请手动刷新后重新运行！";
		 // } 
	 // });
}

//手机备份收集
// function colectBarSecond(page_num){
	// var urlStr = base_url + "likepage?uid="+uid+"&pn="+(20*page_num)+"&is_ajax=1";
	// $.clearLS(urlStr);
// 　　	$.getJSON(urlStr,function(data){
		// var objs = eval('(' + data + ')');
		// forumObjs=forumObjs.concat(objs);
		// oo.innerHTML += "<span style='color:red;'>正在收集第"+(page_num+1)+"页 ing<br>";
		//page_num--;//表示遍历一页
		// if(objs.length>0){//表示还没收集完成
			// setTimeout("colectBarSecond("+(page_num+1)+")",200);//收集下一页
		// }else{//收集完成，开始签到
		//alert(forumObjs.length)
			// oo.innerHTML += "共"+forumObjs.length+"个吧!<br>";
			// oo.innerHTML += "<span style='color:red;'>收集完成,开始签到</span><br>";
			// setTimeout("makeSign(forumObjs,"+forumObjs.length+")",2000);//开始签到
		// }
	// },"text",
	// function(e){
		// alert(e);
	// },"GET","",true);
// }

//检查该贴吧有没有签到
function checksigned(bai){
	if(bai>=baObjs.length){
		$(".Sign_MainDiv")[0].innerHTML+="<br/>签到完毕！请自行检查有没有签到正确，如有错误，欢迎反馈<a href='http://tieba.baidu.com/p/1768731534'  target='_blank'>蝉曦吧反馈专用贴</a><br/><br/><br/><br/><br/>";
		$(".Sign_BtnTop")[2].innerHTML="<span style='color:red;'>签到完毕！</span>";//显示签到完毕
		return 0;
	}else{
		$(".Sign_BtnTop")[1].innerHTML=(bai+1)+" / "+baObjs.length;//显示在签第几个
		$(".Sign_MainDiv")[0].innerHTML+="<br/>+"+(bai+1)+" .<a href='http://tieba.baidu.com/f?kw="+baObjs[bai].kw+"&fr=index&fp=0&ie=utf-8' target='_blank'>"+baObjs[bai].name+"吧</a>";
	}
	$.ajax({
		 type: "get",url:  "http://tieba.baidu.com/f?kw="+baObjs[bai].kw+"&fr=index&fp=0&ie=utf-8&mmmm="+Math.random(),
		 data: "",dataType: "text",success: function (data) { 
				var rewords=data;
				var  isSign=cutchar(rewords,"<span class=\"j_unsign_tip\" style=\"display:inline\">","</span>");
				var my_Rank=cutchar(rewords,"<span class=\"sign_index_num j_signin_index\">","</span>");
				var my_Days=cutchar(rewords,"\"c_sign_num\":",",");
				var my_AllDays=cutchar(rewords,"\"c_sign_num\":",",");
				var tbs=cutchar(rewords,"PageData.tbs = \"","\";");
				
				if(cutchar(rewords,"PageData.user.is_block = ",";//是否已封禁")=="1"){
					$(".Sign_MainDiv")[0].innerHTML+="--您在本吧<span style='color:red;'>被封禁，不能签到!</span>---防和谐，等待1s ing...";
					setTimeout("checksigned("+(bai+1)+");",200);
					return 0;	
				}
				if(rewords.indexOf("<span class=\"sign_index_num j_signin_index\">")<0){
					$(".Sign_MainDiv")[0].innerHTML+="--本吧还没开放签到系统!---防和谐，等待1s ing...";
					setTimeout("checksigned("+(bai+1)+");",200);
					return 0;	
				}
				if(isSign=="还没签到呢！"){
					$(".Sign_MainDiv")[0].innerHTML+="--未签到!";
					signed(bai,tbs);
				}else{
					$(".Sign_MainDiv")[0].innerHTML+="--已签到!--今日第<span style='color:red;'>"+my_Rank+"</span>个签到,连续<span style='color:red;'>"+my_Days+"</span>天!---防和谐，等待1s ing...";
					setTimeout("checksigned("+(bai+1)+");",200);
				}
				return 0;
		 }, 
		 error: function () { 
			$(".Sign_MainDiv")[0].innerHTML+="---检查出现问题，重新检查！";
			setTimeout("checksigned("+bai+");",200);
		 } 
	});	
	
}

//对该贴吧进行签到
function signed(bai,tbs){
	$.ajax({
		type: "post",
		url:  "http://tieba.baidu.com/sign/add",
		data: "kw="+encodeURIComponent(baObjs[bai].name)+"&ie=utf-8&tbs="+tbs, 
		dataType: "text",
		success: function (data) { 
				var rewords=eval('(' + data + ')'); 
				if(rewords.error==""){
					$(".Sign_MainDiv")[0].innerHTML+="--签到完毕,您是第<span style='color:red;'>"+rewords.data.uinfo.user_sign_rank+"</span>个签到,连续<span style='color:red;'>"+rewords.data.uinfo.cont_sign_num+"</span>天,共<span style='color:red;'>"+rewords.data.uinfo.cout_total_sing_num+"</span>天!---防和谐，等待6s ing...";
					var  waittime=1000;
				}
				else{
					$(".Sign_MainDiv")[0].innerHTML+="--<span style='color:red;'>"+eval('"'+rewords.error+'"')+"</span>---防和谐，等待1s ing...";
					var  waittime=200;
				}
				setTimeout("checksigned("+(bai+1)+");",waittime);
		 }, 
		 error: function () { 
			 $(".Sign_MainDiv")[0].innerHTML+="签到出现问题，马上重签！";
			 signed(bai,tbs);
		 } 
	 });
}




function mark_cell(){//手机签到
	//BaseUrl=cutchar($("body")[0].innerHTML,'base_url: "','"');
	BaseUrl="/f/q-0---sz%401320_240%2C,-2-3-0--2/"
	countba_cell();//收集贴吧，开始运行签到程序
}
//查贴吧数量，收集贴吧
function countba_cell(){
	$(".Sign_BtnTop")[0].innerHTML="开始收集。。。";
	$.ajax({
		type: "get",url: "http://wapp.baidu.com/f/q-0---sz%40320_240%2C,sz@320_240-1-3-0--2/m?tn=bdFBW&tab=favorite&lp=7202",
		data: "", dataType: "text", success: function (data) { 
			//var dataObjs=$(data).find(".d a");
			var dataObjs=data.split("m?kw");
			for(var i=1;i<dataObjs.length;i++){
				baObjs[i-1] =new Object;
				baObjs[i-1].kw=cutchar(dataObjs[i],"=","\"");
				baObjs[i-1].name=cutchar(dataObjs[i],"\">","</a>");
			}
			
			// for(var i=0;i<dataObjs.length;i++){
				// baObjs[i] =new Object;
				// baObjs[i].name=dataObjs[i].innerHTML;
				// baObjs[i].kw=dataObjs[i].href.split("/m?kw")[1];
			// }
			$(".Sign_BtnTop")[0].innerHTML="收集完毕！";
			$(".Sign_BtnTop")[1].innerHTML="0 / "+baObjs.length;
			$(".Sign_MainDiv")[0].innerHTML+="估测完毕:您喜欢的贴吧有"+(baObjs.length)+"个，最长将花费时间"+parseInt(baObjs.length*6/60)+"分"+(baObjs.length*6%60)+"秒";
				$.ajax({
					type: "get",url: "wapp.baidu.com/f/q-0---sz%401320_240%2C,-2-3-0--2/m?tn=bdIndex&lp=7202#like",
					data: "", dataType: "text", success: function (data) { 
					checksigned_cell(0);
				 }, 
				 error: function () { 
					 $(".Sign_MainDiv")[0].innerHTML+="收集贴吧遇到问题，程序不能继续下去！请手动刷新后重新运行！";
				 } 
			 });
		 }, 
		 error: function () { 
			 $(".Sign_MainDiv")[0].innerHTML+="收集贴吧遇到问题，程序不能继续下去！请手动刷新后重新运行！";
		 } 
	 });
}


//检查该贴吧有没有签到
function checksigned_cell(bai){
	if(bai>=baObjs.length){
		$(".Sign_MainDiv")[0].innerHTML+="<br/>签到完毕！请自行检查有没有签到正确，如有错误，欢迎反馈<a href='http://tieba.baidu.com/p/1768731534'  target='_blank'>蝉曦吧反馈专用贴</a><br/><br/><br/><br/><br/>";
		$(".Sign_BtnTop")[2].innerHTML="<span style='color:red;'>签到完毕！</span>";//显示签到完毕
		return 0;
	}else{
		$(".Sign_BtnTop")[1].innerHTML=(bai+1)+" / "+baObjs.length;//显示在签第几个
		$(".Sign_MainDiv")[0].innerHTML+="<br/>+"+(bai+1)+" .<a href='http://wapp.baidu.com"+BaseUrl+"m?kw="+baObjs[bai].kw+"&lp=7202' target='_blank'>"+baObjs[bai].name+"吧</a>";
	}
	$.ajax({
		type: "get",url: "http://wapp.baidu.com"+BaseUrl+"m?kw="+baObjs[bai].kw+"&lp=7202",
		data: "", dataType: "text", success: function (data) {

			if(data.indexOf("sign_btn_cannot")>0){
				$(".Sign_MainDiv")[0].innerHTML+="--本吧还没开放签到系统!---防和谐，等待1s ing...";
				setTimeout("checksigned_cell("+(bai+1)+");",200);
				return 0;	
			}else if(data.indexOf("sign_btn_had")>0){
				$(".Sign_MainDiv")[0].innerHTML+="--已签到!---防和谐，等待1s ing...";
				setTimeout("checksigned_cell("+(bai+1)+");",200);
			}else if(data.indexOf("sign_btn_wanted")>0){
					$(".Sign_MainDiv")[0].innerHTML+="--未签到!";
					baObjs[bai].tbs=cutchar(data,'tbs" : "','"');
					baObjs[bai].fid=cutchar(data,'fid" : "','"');
					signed_cell(bai);
			}else{
				$(".Sign_MainDiv")[0].innerHTML+="运行异常，请手动刷新后重新运行！";
			}
		},
		 error: function () { 
			$(".Sign_MainDiv")[0].innerHTML+="---检查出现问题，重新检查！";
			setTimeout("checksigned_cell("+bai+");",200);
		 } 
	});	
	
}

//对该贴吧进行签到
function signed_cell(bai){
	$.ajax({
		 type: "get",url:  "http://wapp.baidu.com"+BaseUrl+"sign?tbs="+baObjs[bai].tbs+"&kw="+baObjs[bai].kw+"&is_like=1&fid="+baObjs[bai].fid,
		 data: "",dataType: "text",success: function (data) { 
			var rewords=eval('('+data+')');
			if(rewords.error.length<4){
				$(".Sign_MainDiv")[0].innerHTML += "经验+<span style='color:red;'>" + rewords.error + "</span>,第<span style='color:red;'>"+ rewords.data.add_sign_data.uinfo.user_sign_rank+"</span>个,连续<span style='color:red;'>"+rewords.data.add_sign_data.uinfo.cont_sign_num+"</span>天，累计<span style='color:red;'>"+rewords.data.add_sign_data.uinfo.cout_total_sing_num+"</span>天!---防和谐，等待6s ing...";
				var  waittime=1000;
			}else{
				$(".Sign_MainDiv")[0].innerHTML+="--<span style='color:red;'>"+eval('"'+rewords.error+'"')+"</span>---防和谐，等待1s ing...";
				var  waittime=200;
			}
			setTimeout("checksigned_cell("+(bai+1)+");",waittime);
		 }, 
		 error: function () { 
			 $(".Sign_MainDiv")[0].innerHTML+="签到出现问题，马上重签！";
			 signed_cell(bai);
		 } 
	 });
}

function deleteTag(id){
    var my = document.getElementById(id);
    if (my != null)       my.parentNode.removeChild(my);
 }

function div_allHid(){
	deleteTag("Sign_Body");
//	location.href="http://adf.ly/LzLxo";
}
function cutchar(allstr,prechar,endchar){
	var preposition=allstr.indexOf(prechar)+prechar.length;
	var strlength=allstr.indexOf(endchar,preposition);
	return allstr.substring(preposition,strlength);
}

function load_js(url) {
	var e = document.createElement('script');
	e.type = 'text/javascript';
	e.charset = 'UTF-8';
	e.src = url + '?m=' + Math.random();
	document.body.appendChild(e)
}
