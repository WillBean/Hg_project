var rooturl="http://truelovezhangyuang.com:8088"
$(function(){
	renderevent();
});
function renderevent(){
	$(".land").on("click",function(){
		var username=$(".username").val();
	var password=$(".password").val();
	var data={
		username:username,
		password:password
	}
	var landurl=rooturl+'/SCUT_project/loginServlet'
	// publicDom.getData('post',landurl,JSON.stringify(data),function(data){
	// 	if(data.result==1){
	// 		alert("登陆成功");
	// 		location.href="carbononline.html"
	// 	}
	// 	else{
	// 		alert("登陆失败")
	// 	}
	// })
	if((username=="root"&&password=="1234")||(username=="ChanSheldan"&&password=="truelove")){
		alert("登陆成功");
		location.href="head.html"
	}
	else{
		alert("登陆失败")
	}
	

	})
	$(".without_username").on("click",function(){
		location.href="head.html"
	})
	
}
