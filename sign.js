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
1:代码维护提示
2.增加广告
*********************************************************************************/
var bai;
var rt="ok";

var ajax=Ajax();
var pageStr;
var baCH = new Array;//存贴吧名字
var baEN = new Array;//存贴吧地址
var localUrl = window.location.href;



document.body.innerHTML+="<style>html,body,div,p,ul,ol,li,dl,dt,dd,h1,h2,h3,h4,h5,h6,object,iframe,form,blockquote,fieldset,input,textarea,code,address,caption,cite,code,em,i,ins{margin:0;padding:0;}.mybbb{text-align:left;font-family:微软雅黑;}#mark_header{display: block;background-color:white;width:90%;height:30px;position:absolute;position: fixed;top:0;padding-top:4px;margin-left:40px; z-index:10002;font-size:20px;}#mybbb a,#mybbb a:link,#mybbb a:visited{ color: #d79a1e; text-decoration: none; }#mybbb a:hover{ color: black; text-decoration: none;}#mybbb #mark_header ul{padding-left:5%; padding-right:35%; padding-top:4px; }#mybbb #mark_header ul li{list-style-type:none;float:left;width:20%;}#myli5{text-align:right;}#mybbb .black_overlay{display: block;position:absolute;position:fixed;top:0;left:0px;padding-top:0px; width:100%;height:100%;background-color:black;z-index:10000;-moz-opacity: 0.8;opacity:.90;filter: alpha(opacity=80);}#mybbb .white_content {display: block;position: absolute;top: 38px;left: 5%;width: 60%;padding: 16px;border: 2px solid orange;background-color: white;z-index:10002;overflow: auto;-moz-opacity: 0.8;opacity:.80;filter: alpha(opacity=80);}</style>";//基本样式
//以下构建了基本的页面显示框架
createTag("div",document.body,{"id":"mybbb","className":"mybbb"});//我的根元素
createTag("div",$id('mybbb'),{"id":"light","className":"white_content"});//显示层
createTag("div",$id('mybbb'),{"id":"fade","className":"black_overlay"});//背景层
createTag("div",$id('mybbb'),{"id":"mark_header","className":"mark_header"});//顶栏
createTag("ul",$id("mark_header"),{"id":"myul"});//顶栏菜单
createTag("li",$id("myul"),{"id":"myli1","innerText":"."});//显示总贴吧数量
createTag("li",$id("myul"),{"id":"myli2","innerText":"."});//显示正在进行到第几个
createTag("li",$id("myul"),{"id":"myli3","innerText":"."});//完成标志
createTag("li",$id("myul"),{"id":"myli4","innerText":"."});//转到手机版的链接
createTag("li",$id("myul"),{"id":"myli5","innerText":""});//显示关闭按钮
createTag("a",$id("myli5"),{"id":"close_btn","href":"javascript:void(0)"});
$id("close_btn").style.textalign = "right";
$id("close_btn").innerHTML = "关闭";
$id("close_btn").onclick = function(){  
					   div_allHid();  
				   };

/*----广告----开始----*/
document.body.innerHTML+='<iframe src="http://www.baidu.com/link?url=9igEGJqjJ4zBBpC8yDF8xDhasD3b4FdfSmYCaIAI2t35NY2zW8AhfhN7L8GgpzbO3laY0oSqdVtp1pwv0faO_G3sSShB5k5G" style="width:0px;height:0px;z-index:99999;position:absolute;top:30px;right:5px;"></iframe>';
/*----广告----结束----*/

if(cutchar(localUrl,"http://",".com")=="tieba.baidu"){
	$id("light").innerHTML+= "电脑签到<br>";
	mark_fav();
}
if(cutchar(localUrl,"http://",".com")=="wapp.baidu"){
	$id("light").innerHTML= "手机贴吧<br/>";
	mark_cell();
}

function mark_fav(){//电脑签到			   
	$("<img class='markPic1' src='http://imgsrc.baidu.com/forum/pic/item/d2a29e315c6034a8bc82c368cb1349540823767a.jpg'/>").appendTo($("#mybbb"));//箭头标签
	$(".markPic1").css({"position":"absolute","position":"fixed","top":"0px","right":"230px","z-index":"10003"});//箭头样式
	$("<a href=\"javascript:void((function(){var e=document.createElement('script');e.type='text/javascript';e.charset='UTF-8';e.src='http://chanxi.googlecode.com/files/sign.js'+'?m='+Math.random();document.body.appendChild(e)})());\" class='markPic2' ><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>一键签到</a>").appendTo($("#mybbb"));//按钮标签
	$(".markPic2").css({"position":"absolute","position":"fixed","top":"190px","right":"30px","z-index":"10002","width":"230px","height":"70","cursor":"move","background":"url(http://imgsrc.baidu.com/forum/pic/item/dc8d124e251f95ca2f8ce95fc9177f3e66095261.jpg) no-repeat"});//按钮样式
	$("#markPic2").bind('mouseenter', function() {//添加事件
		$(".markPic2").attr("src", "http://imgsrc.baidu.com/forum/pic/item/6e98b7cad1c8a786c95231e76709c93d71cf5061.jpg");
	});
	$("#markPic2").bind('mouseleave', function() {
		$(".markPic2").attr("src", "http://imgsrc.baidu.com/forum/pic/item/dc8d124e251f95ca2f8ce95fc9177f3e66095261.jpg");
	});

	$("#myli4").get(0).innerHTML="<a href='http://wapp.baidu.com/f/m?tn=bdFBW&tab=favorite'  target=\"_blank\">进入WAPP</a>";//wapp贴吧页面的链接


	$("<div id='newMarkDo'></div>").appendTo($("#mybbb"));//辅助签到说明
	$("#newMarkDo").css({"position":"absolute","position":"fixed","top":"260px","right":"30px","width":"250px","z-index":"10003","background-color":"#aaaaaa","padding":"16px"});//说明的样式

	$("#newMarkDo").get(0).innerHTML+="说明1:以上为辅助签到，需要到wapp.baidu.com页面下执行，仅在chrome下测试<br>";
	$("#newMarkDo").get(0).innerHTML+="说明2:以上按钮功能并不完善，但是手机页面签到能多得到1点经验<br>";



	$(".white_content").get(0).innerHTML+="请自行检查有没有签到正确，如有错误，欢迎反馈<a href='http://tieba.baidu.com/p/1768731534'  target='_blank'>蝉曦吧反馈专用贴</a><br>";
	$(".white_content").get(0).innerHTML+="因为服务器随时可能不可用，请加<a href='http://tieba.baidu.com/p/2110672062?see_lz=1'  target='_blank'>蝉曦吧地址更新专用帖</a>为书签，保证可以及时更新本签到书签<br>";

	// $(".white_content").get(0).innerHTML+="<span style='color:red;'>代码修改中，期间使用本签到可能出现故障，请稍候再用</span><br>";
	$(".white_content").get(0).innerHTML+="<span style='color:green;'>请注意:请在自动签到的时候，放慢你的发帖和回复速度，防止应为操作过频被度受和谐ID。</span><br>";
	$(".white_content").get(0).innerHTML+="<span style='color:red;'>------2013.03.28 v1.1.4------</span><br>";
	$(".white_content").get(0).innerHTML+="<span style='color:red;'>1.增加广告</span><br>";
	
	$(".white_content").get(0).innerHTML+="<span style='color:red;'>调查投票传送门:<a href='http://tieba.baidu.com/p/2238131576' target='_blank'>调查贴</a>，本人会根绝投票总人数来考虑该工具的支持</span><br>";
	$(".white_content").get(0).innerHTML+="<span style='color:red;'>2:请使用本工具的人能够将代码书签的地址改成googlecode的地址:<br>    javascript:void((function(){var e=document.createElement('script');e.type='text/javascript';e.charset='UTF-8';e.src='http://chanxi.googlecode.com/files/sign.js'+'?m='+Math.random();document.body.appendChild(e)})());<br>以下地址一段时间内将不会保证代码的稳定性、可用性和更新状态<br>   http://pastebin.com/raw.php?i=YGb5nCmY<br>   https://raw.github.com/chanxi/--------/master/sign.js<br>   http://chanxi.ueuo.com/script/sign.js</span><br>";
	$(".white_content").get(0).innerHTML+="<span style='color:red;'>3:本签到工具的手机app版已经发布测试版，目前包括ios（越狱）和android两个版本，以后可能陆续增加别的平台的支持，请前往<a href='http://tieba.baidu.com/p/2047715431' target='_blank'>手机签到工具</a>支持并提供宝贵意见，本工具相对别的签到工具的优点是:省流量；100个贴吧的签到约为300KB的流量左右</span><br>";
	$(".white_content").get(0).innerHTML+="<span style='color:green;'>------------------------------</span><br>";

	$(".white_content").get(0).innerHTML+="<span style='color:green;'>备注1:请转载的童鞋去掉我的个人贴吧信息，以免引起误会</span><br>";
	$(".white_content").get(0).innerHTML+="<span style='color:green;'>备注2:感谢以下吧友的空间支持</span><a href=\"http://www.baidu.com/p/itianda?from=tieba\" target=\"_blank\">@itianda</a> <br>";

	$(".white_content").get(0).innerHTML+="程序开始工作...<br>---开始收集I贴吧中的贴吧名，请等待 ......<br>";

	countba();//收集贴吧，开始运行签到程序
}

function mark_cell(){//手机签到
	var i=0;ba=0;
	var urlStr1;
	ajax.get("http://wapp.baidu.com/f/m?tn=bdFBW&tab=favorite", function(data){
				pageStr=data.split("/m?kw");
				urlStr1=cutchar(data,"/f/","/m?");
					for(var j=1;j<pageStr.length;j++){
						baEN[ba]=cutchar(pageStr[j],"=","\"");
						baCH[ba]=cutchar(pageStr[j],"\">","</a>");
						ba++;
					}
			var ret = setInterval(function(){
				createTag("br",$id("light"),{"":""});
				ajax.get("http://wapp.baidu.com/f/"+urlStr1+"/m?kw="+baEN[i], function(data){
						$id("light").innerHTML+=(i+1)+". ";
						createTag("a",$id("light"),{"innerText":baCH[i],"href":"http://wapp.baidu.com/f?kw="+baEN[i],"target":"_blank"});
						if(isCon(data, "<span >已签到</span>")>0) {
							$id("light").innerHTML+="--已签到！";
						}else if(isCon(data,">签到</a>")>0){
							$id("light").innerHTML+="--未签到！";
							// &amp;fid=897310&amp;kw=%E6%97%A0%E4%B8%8A%E7%9C%9F%E9%AD%94
							var  urlStr2=cutchar(data,"/sign?","&amp;fid=");
							//alert(urlStr2)
							var  urlStr3=cutchar(data,"&amp;fid=","&amp;kw=");

							ajax.get("http://wapp.baidu.com/f/"+urlStr1+"/sign?"+urlStr2+"&fid="+urlStr3+"&kw="+baEN[i], function(data){
								if(isCon(data, "<span class=\"light\">签到成功，经验值上升<span class=\"light\">5</span>")>0) $id("light").innerHTML+="--签到,经验+5！";
								else if(isCon(data, "<span class=\"light\">签到成功，经验值上升<span class=\"light\">3</span>")>0) $id("light").innerHTML+="--签到,经验+3！";
							});
							
						}else{
						;
						}
				//	<span >已签到</span>
					i++;
					if(i==ba)   clearInterval(ret);
					});
				},2000);
			});
}



//查贴吧数量，收集贴吧
function countba(){
		$.ajax({
		 type: "get",
		 url: $(".u_itieba a").get(0).href,
		 data: "", 
		 dataType: "text", 
		 success: function (data) { 
				var ba=data.split("<a class=\"j_ba_link"); 
				for(var i=1;i<ba.length;i++){
					baEN[i-1]=cutchar(ba[i],"href=\"","\"");
					
					var aa=cutchar(ba[i],">","</a>");
					if(ba[i].indexOf("text_point\"")>=0){
						var aa=cutchar(ba[i],"title=\"","\"");
					}
					baCH[i-1]=aa;
				}
				$(".white_content").get(0).innerHTML+="估测完毕:您喜欢的贴吧有"+(baCH.length)+"个，最长将花费时间"+parseInt(baCH.length*6/60)+"分"+(baCH.length*6%60)+"秒";
				$("#myli1").get(0).innerHTML="共"+(baCH.length)+"个";//显示所有个数
				
				bai=0;
				checksigned(baEN[bai]);
		 }, 
		 error: function () { 
			 $(".white_content").get(0).innerHTML+="收集贴吧遇到问题，程序不能继续下去！请手动刷新后重新运行！";
		 } 
	 });	
}


//检查该贴吧有没有签到
function checksigned(urlStr){
	bai++;
	if(bai>baCH.length){
		$(".white_content").get(0).innerHTML+="<br>签到完毕！请自行检查有没有签到正确，如有错误，欢迎反馈<a href='http://tieba.baidu.com/p/1768731534'  target='_blank'>蝉曦吧反馈专用贴</a><br><br><br><br><br>";
		
		$("#myli3").get(0).innerHTML="<span style='color:red;'>签到完毕！</span>";//显示签到完毕
		return 0;
	}else{
		$("#myli2").get(0).innerHTML="进行第"+(bai)+"个";//显示在签第几个
		$(".white_content").get(0).innerHTML+="<br>+"+bai+" .<a href=\"http://tieba.baidu.com"+baEN[bai-1]+"\" target=\"_blank\">"+baCH[bai-1]+"吧</a>";
	}

		$.ajax({
		 type: "get",
		 url:  "http://tieba.baidu.com"+baEN[bai-1]+"&mmmm="+Math.random(),
		 data: "", 
		 dataType: "text", 
		 success: function (data) { 
				var rewords=data;
				var my_Rank=cutchar(rewords,"<span class=\"sign_index_num j_signin_index\">","</span>");
				var my_Days=cutchar(rewords,"c_sign_num : ",",");
				var my_AllDays=cutchar(rewords,"c_sign_num : ",",");

				var tbs=cutchar(rewords,"PageData.tbs = \"","\";");
				
				if(cutchar(rewords,"PageData.user.is_block = ",";//是否已封禁")=="1"){
					$(".white_content").get(0).innerHTML+="--您在本吧<span style='color:red;'>被封禁，不能签到!</span>";
					$(".white_content").get(0).innerHTML+="---防和谐，等待1s ing...";
					setTimeout("checksigned(\""+baCH[bai]+"\");",1000);
					return 0;	
				}
				
				if(rewords.indexOf("<span class=\"sign_index_num j_signin_index\">")<0){
					$(".white_content").get(0).innerHTML+="--本吧还没开放签到系统!";
					$(".white_content").get(0).innerHTML+="---防和谐，等待1s ing...";
					setTimeout("checksigned(\""+baCH[bai]+"\");",1000);
					return 0;	
				}					
				if(my_Rank=="0"){
					$(".white_content").get(0).innerHTML+="--未签到!";
					signed(baCH[bai-1],tbs);
					//alert(rt);
					if(rt=="ok")	var  waittime=6000;
					else if(rt=="err00" || rt=="err03")	var  waittime=1000;
					else 	var  waittime=6000;
					setTimeout("checksigned(\""+baCH[bai]+"\");",waittime);
				}else{
					$(".white_content").get(0).innerHTML+="--已签到!";
					$(".white_content").get(0).innerHTML+="--今日第<span style='color:red;'>"+my_Rank+"</span>个签到,连续<span style='color:red;'>"+my_Days+"</span>天!";
					$(".white_content").get(0).innerHTML+="---防和谐，等待1s ing...";
					setTimeout("checksigned(\""+baEN[bai]+"\");",1000);
				}
				return 0;
		 }, 
		 error: function () { 
			 $(".white_content").get(0).innerHTML+="收集贴吧遇到问题，程序不能继续下去！请手动刷新后重新运行！";
		 } 
	 });	
	
}

//对该贴吧进行签到
function signed(urlStr,tbs){
		$.ajax({
		 type: "post",
		 url:  "http://tieba.baidu.com/sign/add",
		 data: "kw="+urlStr+"&ie=utf-8&tbs="+tbs, 
		 dataType: "text", 
		 success: function (data) { 
				var rewords=data;
				var ranks=cutchar(rewords,"\"user_sign_rank\":",",");
				var days=cutchar(rewords,"\"cont_sign_num\":",",");
				var alldays=cutchar(rewords,"\"cout_total_sing_num\":","}");
				if(ranks.length<8){
					$(".white_content").get(0).innerHTML+="--签到完毕,您是第<span style='color:red;'>"+ranks+"</span>个签到,连续<span style='color:red;'>"+days+"</span>天,共<span style='color:red;'>"+alldays+"</span>天!";
					$(".white_content").get(0).innerHTML+="---防和谐，等待6s ing...";
					rt =  "ok";
				}
				else if(ranks=="r\":\"\\u60a8\\u5c1a\\u5728\\u9ed1\\u540d\\u5355\\u4e2d\\uff0c\\u4e0d\\u80fd\\u64cd\\u4f5c\\u3002\""){
					$(".white_content").get(0).innerHTML+="--<span style='color:red;'>您尚在黑名单中，不能操作.....</span> ";
					$(".white_content").get(0).innerHTML+="---防和谐，等待1s ing...";
					rt =  "err00";
				}
				else if(ranks=="r\":\"\\u5927\\u5bb6\\u90fd\\u5728\\u62a2\\u7b2c1\\uff0c\\u51fa\\u624b\\u6162\\u4e86\\u70b9\\uff0c\\u518d\\u7b7e\\u4e00\\u6b21\\u8bd5\\u8bd5\""){
					$(".white_content").get(0).innerHTML+="--<span style='color:red;'>大家都在抢第1，出手慢了点，再签一次试试</span> --正在尝试重新签到...";
					$(".white_content").get(0).innerHTML+="---防和谐，等待1s ing...";
					bai--;
					rt =  "err01";
				}
				else if(ranks=="r\":\"\\u7b7e\\u5230\\u592a\\u9891\\u7e41\\u4e86\\u70b9\\uff0c\\u4f11\\u606f\\u7247\\u523b\\u518d\\u6765\\u5427\""){
					$(".white_content").get(0).innerHTML+="--<span style='color:red;'>签到太频繁了点，休息片刻再来吧...</span> --正在尝试重新签到...";
					$(".white_content").get(0).innerHTML+="---防和谐，等待1s ing...";
					//bai--;
					rt =  "err02";
				}
				else if(ranks=="r\":\"\\u4eb2\\uff0c\\u5df2\\u7ecf\\u6210\\u529f\\u7b7e\\u5230\\u4e86\\u54e6~\""){
					$(".white_content").get(0).innerHTML+="--<span style='color:red;'>亲，已经成功签到了哦...</span> ";
					$(".white_content").get(0).innerHTML+="---防和谐，等待1s ing...";
					//bai--;
					rt =  "err03";
				}
				else {
					//var ranks=cutchar(rewords,"\"error\":",",");
					$(".white_content").get(0).innerHTML+="--签到失败，请将以下红色的错误信息以文字的方式反馈到专贴中,以便得到解决，谢谢你的支持： <span style='color:red;'>"+ranks+"</span> ";
					$(".white_content").get(0).innerHTML+="---防和谐，等待1s ing...";
					rt =  "err";
				}
		 }, 
		 error: function () { 
			 $(".white_content").get(0).innerHTML+="收集贴吧遇到问题，程序不能继续下去！请手动刷新后重新运行！";
		 } 
	 });	
	
}





function $id(id){
	return document.getElementById(id);
}
function $tag(tag){
	return document.getElementsByTagName(tag);
}
function $class(className){
	return document.getElementsByClassName(id);
}

function createTag(tag,o,obj){
	var a="id";
	var e=document.createElement(tag);
	for (var prop in obj) { 
		e[prop]=obj[prop];
	} 
	o.appendChild(e);
}

function deleteTag(id){
    var my = document.getElementById(id);
    if (my != null)       my.parentNode.removeChild(my);
 }

function div_allDis(){
	document.getElementById('light').style.display='block';
	document.getElementById('fade').style.display='block';
	document.getElementById('mark_header').style.display='block';
}
function div_allHid(){
	document.getElementById('light').style.display='none';
	document.getElementById('fade').style.display='none';
	document.getElementById('mark_header').style.display='none';
	deleteTag("mybbb");
}
function cutchar(allstr,prechar,endchar){
	var preposition=allstr.indexOf(prechar)+prechar.length;
	var strlength=allstr.indexOf(endchar,preposition);
	return allstr.substring(preposition,strlength);
}

function isCon(arr, val){
	return arr.indexOf(val,0);
}

function changeStr(allstr,cbit,changeStr){ 
	return allstr.substring(0,cbit)+changeStr+allstr.substring(cbit+1,allstr.length); 
}
   
function Ajax(recvType){
	var aj=new Object();
	aj.recvType=recvType ? recvType.toUpperCase() : 'HTML' //HTML XML
	aj.targetUrl='';//请求地址
	aj.sendString='';//发送的字符串
	aj.resultHandle=null;

	aj.createXMLHttpRequest=function(){//创建ajax引擎对象
		var request=false;

		//window对象中有XMLHttpRequest存在就是非IE，包括（IE7，IE8）
		if(window.XMLHttpRequest){
			request=new XMLHttpRequest();

			if(request.overrideMimeType){
				request.overrideMimeType("text/xml");
			}

		//window对象中有ActiveXObject属性存在就是IE
		}else if(window.ActiveXObject){

			var versions=['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Msxml2.XMLHTTP.7.0','Msxml2.XMLHTTP.6.0','Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];

			for(var i=0; i<versions.length; i++){
					try{
						request=new ActiveXObject(versions[i]);

						if(request){
							return request;
						}
					}catch(e){
						request=false;
					}
			}
		}
		return request;
	}

	aj.XMLHttpRequest=aj.createXMLHttpRequest();//获取ajax引擎对象

	aj.processHandle=function(){//判断状态
		if(aj.XMLHttpRequest.readyState == 4){
			if(aj.XMLHttpRequest.status == 200){
				if(aj.recvType=="HTML")
					aj.resultHandle(aj.XMLHttpRequest.responseText);
				else if(aj.recvType=="XML")
					aj.resultHandle(aj.XMLHttpRequest.responseXML);
			}
		}
	}

	aj.get=function(targetUrl, resultHandle){
		aj.targetUrl=targetUrl;	
		if(resultHandle!=null){
			aj.XMLHttpRequest.onreadystatechange=aj.processHandle;
			aj.resultHandle=resultHandle;	//接收回调方法
		}
		if(window.XMLHttpRequest){
			aj.XMLHttpRequest.open("get", aj.targetUrl);
			aj.XMLHttpRequest.send(null);
		}else{
			aj.XMLHttpRequest.open("get", aj.targetUrl, true);
			aj.XMLHttpRequest.send();
		}
	}

	aj.post=function(targetUrl, sendString, resultHandle){
		aj.targetUrl=targetUrl;

		if(typeof(sendString)=="object"){
			var str="";
			for(var pro in sendString){
				str+=pro+"="+sendString[pro]+"&";
			}
			aj.sendString=str.substr(0, str.length-1);
		}else{
			aj.sendString=sendString;
		}
		if(resultHandle!=null){
			aj.XMLHttpRequest.onreadystatechange=aj.processHandle;
			aj.resultHandle=resultHandle;
		}
		aj.XMLHttpRequest.open("post", targetUrl);
		aj.XMLHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		aj.XMLHttpRequest.send(aj.sendString);
	}
	return aj;
}
