var rooturl="http://120.27.127.220:8080";
$(function(){
	Event_function();
	getDateTime();
})
function getDateTime(){
	var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    console.log(year,month,day)
    $(".year").text(year);
    $(".month").text(month);
    $(".day").text(day);
}
function Event_function(){
	$('.bs li').on('click', function() {
		$(this).parent('ul').siblings('button').text($(this).text());//高低位
	});


	$('.caculate').on('click', function(){ 											//获取Input内输入内容//获取button内选择内容
				var index = layer.load(0, {shade: false});								
				var V = $('.row:eq(1)').find('.col-md-6:eq(1)').find("input[type='text']").val();
				var Q = $('.row:eq(3)').find('.col-md-6:eq(1)').find("input[type='text']").val();
				var A = $('.row:eq(2)').find('.col-md-6:eq(1)').find("input[type='text']").val();
				var Mar = $('.row:eq(1)').find("input[type='text']").val();
				var Mad = $('.row:eq(2)').find("input[type='text']").val();
				var V_jizhun = $('.row:eq(1)').find('.col-md-6:eq(1)').find("button").text();
				var Q_jizhun = $('.row:eq(3)').find('.col-md-6:eq(1)').find("button:eq(1)").text();
				var Q_bit = $('.row:eq(3)').find('.col-md-6:eq(1)').find("button:eq(0)").text();
				var A_jizhun = $('.row:eq(2)').find('.col-md-6:eq(1)').find("button").text();
				var Coal_name ="1";
				var Car = $('.row:eq(4)').find('.col-md-6:eq(1)').find("input[type='text']").val();

		if(V==""||Q==""||A==""||Mar==""||Mad==""){
			alert("提示: 参数未填写完整! 请检查！");
			layer.closeAll();
		}
		else if (isNaN(V)||isNaN(A)||isNaN(Q)||isNaN(Mad)||isNaN(Mar)){
			alert("提示：您所输入的数值含非法字符！");
			layer.closeAll();
		}
		else{
		console.log(Q_bit);
		var message = {
			Coal_name:Coal_name,
				Mar:Mar,
				Mad:Mad,
				Car:Car,
				A:{
					Aname:A_jizhun,
					val:A
				},
				V:{
					Vname:V_jizhun,
					val:V
				},
				Q:{
					Qname:Q_jizhun,
					position:Q_bit,
					val:Q
				}
			}
		var data =new Array();
		data.push(message);
		var data=JSON.stringify(data);
		console.log(data);
		var url=rooturl+"/CalculateSystem/forecastCarServlet";

		publicDom.getData("post",url,data,function(data){
        	if(data[0].Car!=""){
        		alert("预测成功！");
        		layer.closeAll();
        		console.log(data);
        			val_car = data[0].Car
					$(".result").find("input[type='text']").val(val_car);}
        	else{
        		alert("预测失败！");
        		layer.closeAll();
        	}
       
      })
	}
	});

}