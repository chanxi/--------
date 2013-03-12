//一件转贴
//S_rePrint("蝉曦")
S_rePrint(prompt("输入要转到的贴吧"));
var S_ccObjs="";
var S_newUrl="";
function S_rePrint(S_forumName){
  $("body").append('<iframe style="width:1000px;height:500px;z-index:99999;position:absolute;top:30px;right:5px;" id="Reprint"></iframe>');
	$("#Reprint")[0].src="http://tieba.baidu.com";
	$("#Reprint").one("load", function(){
		$("#Reprint").contents().find(".tb_header_search_input")[0].value=S_forumName;
		$("#Reprint").contents().find("#search_submit").trigger("click");//转到置顶贴吧
		$("#Reprint").one("load", function(){
			$("#Reprint").contents().find("#title1")[0].value=PageData.thread.title;//主题名
			$("#Reprint").contents().find(".tb-editor-editarea:last")[0].innerHTML="转自:"+PageData.forum_name+"吧<br>原帖名:"+PageData.thread.title+"<br>原作者:@"+PageData.thread.author+"  <br>原地址:http://tieba.baidu.com/p/"+PageData.thread.id+"<br>以下为原帖内容,机器转帖,未做任何修改:";//一楼著名来源信息
			$("#Reprint").contents().find("input:submit:last").trigger("click");//发帖
			S_findNew();
		});
	});
}

function S_findNew(){
		$("#Reprint").one("load", function(){
			if($("#Reprint").contents().find("a:contains('"+PageData.thread.title+"')").length>0){
				S_newUrl=$("#Reprint").contents().find("a:contains('"+PageData.thread.title+"')")[0].href;
				$(".l_post").remove();
				S_getAllPage(1);
			}else{
				$("#Reprint")[0].src=$("#Reprint")[0].src;
				S_findNew();
			}
		});
}


function S_getAllPage(current){
	if(current>PageData.all_page_num){
		S_ccObjs=$("cc .d_post_content");
		$("#Reprint")[0].src=S_newUrl;
		$("#Reprint").one("load", function(){
			setTimeout(function(){S_doRePrint(0);},4000+Math.random()*10000);
		});
		//S_rePrint("蝉曦");
	}else{
		$("#Reprint")[0].src="http://tieba.baidu.com/p/"+PageData.thread.id+"?see_lz=1&pn="+current;
		$("#Reprint").one("load", function(){
			$(".p_postlist").append($("#Reprint").contents().find(".l_post"))
			S_getAllPage(current+1);
		});
	}
}

function S_doRePrint(current){
	if(current>=S_ccObjs.length){
		$("#Reprint").contents().find(".tb-editor-editarea:last")[0].innerHTML="【转帖毕】";
		$("#Reprint").contents().find("input:submit:last").trigger("click");
		alert("转帖完毕")
	}else{
		if(S_ccObjs[current].innerHTML.length<1){
			S_doRePrint(current+1);
		}else{
			$("#Reprint").contents().find(".tb-editor-editarea:last")[0].innerHTML=S_ccObjs[current].innerHTML;
			$("#Reprint").contents().find("input:submit:last").trigger("click");
			$("#Reprint").one("load", function(){
				setTimeout(function(){S_doRePrint(current+1);},6000+Math.random()*10000);
			});
		}
	}
}
