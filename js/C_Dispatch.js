var rooturl="http://120.27.127.220:8080";
var url=rooturl+"/CalculateSystem/lowCarbonServlet";
var caluteurl=rooturl+"/CalculateSystem/currentCarbonServlet";
var geturl=rooturl+"/CalculateSystem/returnParameterServlet";
var current_1,current_2,current_3,current_4;
var time;
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
		// var current_1 = "121";
		// var current_2 = "131.99";
		// var current_3 = "691";
		// var current_4 = "578";
		//模拟数值
		// current_1 = $('.getTableContent').children('tbody').children('tr:eq(0)').children('td:eq(3)').find("input[type='text']").val();
		// current_2 = $('.getTableContent').children('tbody').children('tr:eq(1)').children('td:eq(3)').find("input[type='text']").val();
		// current_3 = $('.getTableContent').children('tbody').children('tr:eq(2)').children('td:eq(3)').find("input[type='text']").val();
		// current_4 = $('.getTableContent').children('tbody').children('tr:eq(3)').children('td:eq(3)').find("input[type='text']").val();
		//current 读取当前机组功率
		var Zhf = $('.left').find("input[type='text']").val();
		var Up_1 = $('.getTableContent').children('tbody').children('tr:eq(0)').children('td:eq(1)').find("input[type='text']").val();
		var Up_2 = $('.getTableContent').children('tbody').children('tr:eq(1)').children('td:eq(1)').find("input[type='text']").val();
		var Up_3 = $('.getTableContent').children('tbody').children('tr:eq(2)').children('td:eq(1)').find("input[type='text']").val();
		var Up_4 = $('.getTableContent').children('tbody').children('tr:eq(3)').children('td:eq(1)').find("input[type='text']").val();
		var Low_1 = $('.getTableContent').children('tbody').children('tr:eq(0)').children('td:eq(2)').find("input[type='text']").val();
		var Low_2 = $('.getTableContent').children('tbody').children('tr:eq(1)').children('td:eq(2)').find("input[type='text']").val();
		var Low_3 = $('.getTableContent').children('tbody').children('tr:eq(2)').children('td:eq(2)').find("input[type='text']").val();
		var Low_4 = $('.getTableContent').children('tbody').children('tr:eq(3)').children('td:eq(2)').find("input[type='text']").val();
	//从参数设置获取参数	
			var index = layer.load(0, {shade: false});
			publicDom.getData("post",geturl,JSON.stringify({}),function(data){	
				if(data){
					layer.closeAll();
					// layer.closeAll();
					console.log(data);
					for(var i=0;i<data.length;i++){
						if(data[i].type=="generator"&&data[i].title=="#1"){
							Up_1=data[i].up;
							Low_1=data[i].low;
						}
						if(data[i].type=="generator"&&data[i].title=="#2"){
							Up_2=data[i].up;
							Low_2=data[i].low;
						}
						if(data[i].type=="generator"&&data[i].title=="#3"){
							Up_3=data[i].up;
							Low_3=data[i].low;
						}
						if(data[i].type=="generator"&&data[i].title=="#4"){
							Up_4=data[i].up;
							Low_4=data[i].low;
						}
						if(data[i].type=="beq"){
							Zhf=data[i].beq;
						}
					}

				}
				else
					alert("获取失败");

				$('.left').find("input[type='text']").val(Zhf);
				$('.getTableContent').children('tbody').children('tr:eq(0)').children('td:eq(1)').find("input[type='text']").val(Up_1);
				$('.getTableContent').children('tbody').children('tr:eq(1)').children('td:eq(1)').find("input[type='text']").val(Up_2);
				$('.getTableContent').children('tbody').children('tr:eq(2)').children('td:eq(1)').find("input[type='text']").val(Up_3);
				$('.getTableContent').children('tbody').children('tr:eq(3)').children('td:eq(1)').find("input[type='text']").val(Up_4);
				$('.getTableContent').children('tbody').children('tr:eq(0)').children('td:eq(2)').find("input[type='text']").val(Low_1);
				$('.getTableContent').children('tbody').children('tr:eq(1)').children('td:eq(2)').find("input[type='text']").val(Low_2);
				$('.getTableContent').children('tbody').children('tr:eq(2)').children('td:eq(2)').find("input[type='text']").val(Low_3);
				$('.getTableContent').children('tbody').children('tr:eq(3)').children('td:eq(2)').find("input[type='text']").val(Low_4);
				// 显示当前机组功率读取值
				if(Zhf==""||Up_1==""||Up_2==""||Up_3==""||Up_4==""||Low_1==""||Low_2==""||Low_3==""||Low_4=="")
					{
								alert("参数不完整！");
								
					}
				else{
				$(".dispatch").on("click",function(){			
	// var index = layer.load(0, {shade: false});
				var update_1= $('.getTableContent').children('tbody').children('tr:eq(0)').children('td:eq(4)').find("input[type='text']").val();
				var update_2= $('.getTableContent').children('tbody').children('tr:eq(1)').children('td:eq(4)').find("input[type='text']").val();
				var update_3= $('.getTableContent').children('tbody').children('tr:eq(2)').children('td:eq(4)').find("input[type='text']").val();
				var update_4= $('.getTableContent').children('tbody').children('tr:eq(3)').children('td:eq(4)').find("input[type='text']").val();
				var CO2_emission = $('.calucate_result').find('.current').val();
				var update_emission = $('.calucate_result').find('.youhua').val();
				//transform data
						var message = {
							"Zhf":Zhf,
							A:{
								"Up_1":Up_1,
								"Low_1":Low_1,
							},
							B:{
								"Up_2":Up_2,
								"Low_2":Low_2,
								
							},
							C:{
								"Up_3":Up_3,
								"Low_3":Low_3,
								
							},
							D:{
								"Up_4":Up_4,
								"Low_4":Low_4,
								
							}
						}
						
						var data=JSON.stringify(message);
						console.log(data);
						
							publicDom.getData("post",url,data,function(data){	
						
							var result2 = data.update_emission;	
									if (result2==undefined) {
										alert(data);
										// layer.closeAll();
									}
									else{
										
										// layer.closeAll();
										$('.getTableContent').children('tbody').children('tr:eq(0)').children('td:eq(4)').find("input[type='text']").val(data.A.update_1);
										$('.getTableContent').children('tbody').children('tr:eq(1)').children('td:eq(4)').find("input[type='text']").val(data.B.update_2);
										$('.getTableContent').children('tbody').children('tr:eq(2)').children('td:eq(4)').find("input[type='text']").val(data.C.update_3);
										$('.getTableContent').children('tbody').children('tr:eq(3)').children('td:eq(4)').find("input[type='text']").val(data.D.update_4);
										// $('.calucate_result').find('.current').find("input[type='text']").val(result1);
										$('.calucate_result').find('.youhua').find("input[type='text']").val(result2);

									}
								})
	//模拟功率实时变化计算
						clearInterval(time);
						 time=setInterval(function(){
				current_1=Math.ceil(Math.random()*1000);	
				current_2=Math.ceil(Math.random()*1000);
				current_3=Math.ceil(Math.random()*1000);
				current_4=Math.ceil(Math.random()*1000);	
				$('.getTableContent').children('tbody').children('tr:eq(0)').children('td:eq(3)').find("input[type='text']").val(current_1);
				$('.getTableContent').children('tbody').children('tr:eq(1)').children('td:eq(3)').find("input[type='text']").val(current_2);
				$('.getTableContent').children('tbody').children('tr:eq(2)').children('td:eq(3)').find("input[type='text']").val(current_3);
				$('.getTableContent').children('tbody').children('tr:eq(3)').children('td:eq(3)').find("input[type='text']").val(current_4);
				var message = {
					"Zhf":Zhf,
					A:{
						
						"current_1":current_1,
						"update_1":update_1,
					},
					B:{
						
						"current_2":current_2,
						"update_2":update_2,
					},
					C:{
						
						"current_3":current_3,
						"update_3":update_3,
					},
					D:{
						
						"current_4":current_4,
						"update_4":update_4,
					}
					
				}
				
				var data=JSON.stringify(message);
				console.log(data);		
				publicDom.getData("post",caluteurl,data,function(data){												

						$('.calucate_result').find('.current').find("input[type='text']").val(data.CO2_emission);
	
								})

						},1000)
									
					
})	
}
				
})
		

		

	}