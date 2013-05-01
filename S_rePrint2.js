var S_ccObjs="";
var S_newUrl=prompt("输入要转到的贴帖子地址");
$("body").append('<iframe style="width:1000px;height:500px;z-index:99999;position:absolute;top:30px;right:5px;" id="Reprint"></iframe>');
$(".l_post").remove();
S_getAllPage(1);

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
