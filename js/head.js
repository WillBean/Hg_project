$(function(){
	rendertime();
	renderevent();

});
function rendertime(){
	var date=new Date();
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	var day=date.getDate();
	console.log(year,month,day)
	$(".year").text(year);
	$(".month").text(month);
	$(".day").text(day);
}
function renderevent(){
	$(".charac").on("click",function(){
		location.href="CrewCharacter.html"
	})
	$(".Car").on("click",function(){
		location.href="CarPrediction.html"
	})
	$(".list").on("click",function(){
		location.href="EmissionReport.html"
	})
	$(".set").on("click",function(){
		location.href="SetParameters.html"
	})
	$(".Dispatch").on("click",function(){
		location.href="C_Dispatch.html"
	})
	$(".out").on("click",function(){
		location.href="index.html"
	})
}