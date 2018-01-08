var rooturl="http://120.27.127.220:8080"//服务器接口根目录
var uploadurl=rooturl+'/CalculateSystem/uploadFileServlet'//上传文件接口
var geturl=rooturl+"/CalculateSystem/returnParameterServlet"//获取煤种接口
var queryurl=rooturl+"/CalculateSystem/yearQueryServlet"//年月查询接口
var dayqueryurl=rooturl+'/CalculateSystem/dayQueryServlet'//日查询接口
//var powerurl=rooturl+''//功率查询接口
var newDay1FileName,Month1FileName,newMonth1FileName,Year1FileName,newYear1FileName,
newDay2FileName,Month2FileName,newMonth2FileName,Year2FileName,newYear2FileName,
newDay3FileName,Month3FileName,newMonth3FileName,Year3FileName,newYear3FileName,
newDay4FileName,Month4FileName,newMonth4FileName,Year4FileName,newYear4FileName,
name1,name2,name3,name4
$(function(){
	init();
	dayoperation();
	monthoperation();
	yearoperation();
	rendertime();
})
//顶部日期处理
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
//格式转换
function getCharFromUtf8(str) {  
    var cstr = "";  
    var nOffset = 0;  
    if (str == "")  
        return "";  
    str = str.toLowerCase();  
    nOffset = str.indexOf("%e");  
    if (nOffset == -1)  
        return str;  
    while (nOffset != -1) {  
        cstr += str.substr(0, nOffset);  
        str = str.substr(nOffset, str.length - nOffset);  
        if (str == "" || str.length < 9)  
            return cstr;  
        cstr += utf8ToChar(str.substr(0, 9));  
        str = str.substr(9, str.length - 9);  
        nOffset = str.indexOf("%e");  
    }  
    return cstr + str;  
} 
//初始化
function init(){

	//获取煤种种类填入选择框
	publicDom.getData("post",geturl,JSON.stringify({}),function(data){
		var coal=new Array();

		for(var i=0;i<data.length;i++){
			if(data[i].type=="GeneratorCharacteristic"&&data[i].generator=="#1"){
               name1=getCharFromUtf8(data[i].Coal_name)
            }
             if(data[i].type=="GeneratorCharacteristic"&&data[i].generator=="#2"){
                name2=getCharFromUtf8(data[i].Coal_name);     
            }
             if(data[i].type=="GeneratorCharacteristic"&&data[i].generator=="#3"){
                name3=getCharFromUtf8(data[i].Coal_name);     
            }
             if(data[i].type=="GeneratorCharacteristic"&&data[i].generator=="#4"){
               name4=getCharFromUtf8(data[i].Coal_name);     
            }
			if(data[i].type=="Coal"){
				coal.push(data[i]);
			}
		}
		$(".Day1Coal").text(name1?name1:"煤种");
		$(".Day2Coal").text(name2?name2:"煤种");
		$(".Day3Coal").text(name3?name3:"煤种");
		$(".Day4Coal").text(name4?name4:"煤种");
        $(".Month1Coal").text(name1?name1:"煤种");
        $(".Month2Coal").text(name2?name2:"煤种");
        $(".Month3Coal").text(name3?name3:"煤种");
        $(".Month4Coal").text(name4?name4:"煤种");
        $(".Year1Coal").text(name1?name1:"煤种");
        $(".Year2Coal").text(name2?name2:"煤种");
        $(".Year3Coal").text(name3?name3:"煤种");
        $(".Year4Coal").text(name4?name4:"煤种");


		for(var i=0;i<coal.length;i++){
             $(".coal_button").siblings("ul").append('<li><a>'+getCharFromUtf8(coal[i].Coal_name)+'</a></li>')
             console.log(getCharFromUtf8(coal[i].Coal_name))
        }
        $(".coal_button").siblings("ul").append('<li><a>'+'全部'+'</a></li>')
        $(".btn-group ul li").on("click",function(){
        	$(this).parent("ul").siblings("button").text($(this).text());
    	});
    })
}
// ------------------------------------------------日操作------------------------------------------------------
function dayoperation(){
	//机组1
	$(".DayQuery1").on('click',function(){
		if($(".DaystartTime1").val()==''||$(".DayendTime1").val()==''){
			alert("请填写日期")
		}else{
			
			var index = layer.load(0, {shade: false});

			//获取功率，待完善
			// var timeparam=JSON.stringify(
			// 		start:$(".Daystart1").val()+$(".DaystartTime1").val(),
			// 		end:$(".Dayend1").val()+$(".DayendTime1").val(),
			//		generator:"#1"
			// 	)
			// publicDom.getData("POST",powerurl,timeparam,function(){

			// })
			//日期处理
			var starttime=$(".DaystartTime1").val()
			var endtime=$(".DayendTime1").val()
			var starttime=starttime.split(":");
			var endtime=endtime.split(":");
			var starthour=parseInt(starttime[0]);
			var startminute=parseInt(starttime[1]);
			var startsecond=parseInt(starttime[2]);
			var endhour=parseInt(endtime[0]);
			var endminute=parseInt(endtime[1]);
			var endsecond=parseInt(endtime[2])
			var t;
			var startday=$(".Daystart1").val();
			startday=(new Date(startday)).getTime(); 
			var endday=$(".Dayend1").val();
			endday=(new Date(endday)).getTime(); 

			if(startday<endday){
				t=86400+endhour*3600+endminute*60+endsecond-starthour*3600-startminute*60-startsecond;
			}else{

			    t=endhour*3600+endminute*60+endsecond-starthour*3600-startminute*60-startsecond;
			}
			var hour=starthour;
			var minute=startminute;
			var second=startsecond;
				
			var date=new Array();
			
			for(var i=0;i<t+1;i++){
				
				if(second/10<1){
					second="0"+second
				}
				if(minute/10<1){
					minute="0"+minute;
				}
				if(hour/10<1){
					hour="0"+hour
				}
				var time=hour+":"+minute+":"+second;
				console.log(time)
				date[i]={
					startday:$(".Daystart1").val(),
					endday:$(".Dayend1").val(),
					t:time,
					CoalName:$(".Day1Coal").text(),
					p:Math.ceil(Math.random()*500),
					generator:"#1",
				}
				second++;
				minute++;
				minute--;
				hour++;
				hour--;
				if(second==60){
					second=0;
					minute++;
					if(minute==60){
						minute=0;
						hour++;
					}
					if(hour==24){
						hour=0;
					}
				}

			}

			var date=JSON.stringify(date)
			//查询
			publicDom.getData("post",dayqueryurl,date, function(data){
					$(".Day1jinquekwh").text(data.TotalG)
					$(".Day1IPCCkwh").text(data.TotalG)
					$(".Day1jinquet").text(data.TotalB)
					$(".Day1IPCCt").text(data.TotalB)
					$(".Day1start").text($(".DaystartTime1").val())
					$(".Day1end").text($(".DayendTime1").val())
					$(".Day1jinqueco2").text(data.Eco2)
					$(".Day1IPCCco2").text((data.TotalB*2.53).toFixed(3))
					newDay1FileName=data.NewFileName

					layer.closeAll();
					//导出文件
					var outurl=rooturl+"/CalculateSystem/downloadFileServlet?NewFileName="+newDay1FileName
					$(".Day1Out").unbind().on('click',function(){			
						var mywin=window.open(outurl,"_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400")
					})

			})
		}
	})
	//机组2
	$(".DayQuery2").on('click',function(){
		if($(".DaystartTime2").val()==''||$(".DayendTime2").val()==''){
			alert("请填写日期")
		}else{
			//日期处理
			var index = layer.load(0, {shade: false});
			//获取 功率
			// var timeparam=JSON.stringify(
			// 		start:$(".Daystart2").val()+$(".DaystartTime2").val(),
			// 		end:$(".Dayend2").val()+$(".DayendTime2").val(),
			//		generator:"#2"
			// 	)
			// publicDom.getData("POST",powerurl,timeparam,function(){

			// })
			var starttime=$(".DaystartTime2").val()
			var endtime=$(".DayendTime2").val()
			var starttime=starttime.split(":");
			var endtime=endtime.split(":");
			var starthour=parseInt(starttime[0]);
			var startminute=parseInt(starttime[1]);
			var startsecond=parseInt(starttime[2]);
			var endhour=parseInt(endtime[0]);
			var endminute=parseInt(endtime[1]);
			var endsecond=parseInt(endtime[2]);
			var t;
			var startday=$(".Daystart2").val();
			startday=(new Date(startday)).getTime(); 
			var endday=$(".Dayend2").val();
			endday=(new Date(endday)).getTime(); 

			if(startday<endday){
				t=86400+endhour*3600+endminute*60+endsecond-starthour*3600-startminute*60-startsecond;
			}else{

			    t=endhour*3600+endminute*60+endsecond-starthour*3600-startminute*60-startsecond;
			}
			var hour=starthour;
			var minute=startminute;
			var second=startsecond;
				
			var date=new Array();
			
			for(var i=0;i<t+1;i++){
				
				if(second/10<1){
					second="0"+second
				}
				if(minute/10<1){
					minute="0"+minute;
				}
				if(hour/10<1){
					hour="0"+hour
				}
				var time=hour+":"+minute+":"+second;
				console.log(time)
				date[i]={
					startday:$(".Daystart2").val(),
					endday:$(".Dayend2").val(),
					t:time,
					CoalName:$(".Day2Coal").text(),
					p:Math.ceil(Math.random()*500),
					generator:"#2",
				}
				second++;
				minute++;
				minute--;
				hour++;
				hour--;
				if(second==60){
					second=0;
					minute++;
					if(minute==60){
						minute=0;
						hour++;
					}
					if(hour==24){
						hour=0;
					}
				}

			}

			
			var date=JSON.stringify(date)

			publicDom.getData("post",dayqueryurl,date, function(data){
					$(".Day2jinquekwh").text(data.TotalG)
					$(".Day2IPCCkwh").text(data.TotalG)
					$(".Day2jinquet").text(data.TotalB)
					$(".Day2IPCCt").text(data.TotalB)
					$(".Day2start").text($(".DaystartTime2").val())
					$(".Day2end").text($(".DayendTime2").val())
					$(".Day2jinqueco2").text(data.Eco2)
					$(".Day2IPCCco2").text((data.TotalB*2.53).toFixed(3))
					newDay2FileName=data.NewFileName

					layer.closeAll();

					var outurl=rooturl+"/CalculateSystem/downloadFileServlet?NewFileName="+newDay2FileName
					$(".Day2Out").unbind().on('click',function(){			
						var mywin=window.open(outurl,"_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400")
					})
			})
		}
	})
	//机组3
	$(".DayQuery3").on('click',function(){
		if($(".DaystartTime3").val()==''||$(".DayendTime3").val()==''){
			alert("请填写日期")
		}else{
			//日期处理
			var index = layer.load(0, {shade: false});
			//获取 功率
			// var timeparam=JSON.stringify(
			// 		start:$(".Daystart3").val()+$(".DaystartTime3").val(),
			// 		end:$(".Dayend3").val()+$(".DayendTime3").val(),
			//		generator:"#3"
			// 	)
			// publicDom.getData("POST",powerurl,timeparam,function(){

			// })
			var starttime=$(".DaystartTime3").val()
			var endtime=$(".DayendTime3").val()
			var starttime=starttime.split(":");
			var endtime=endtime.split(":");
			var starthour=parseInt(starttime[0]);
			var startminute=parseInt(starttime[1]);
			var startsecond=parseInt(starttime[2]);
			var endhour=parseInt(endtime[0]);
			var endminute=parseInt(endtime[1]);
			var endsecond=parseInt(endtime[2]);
			var t;
			var startday=$(".Daystart3").val();
			startday=(new Date(startday)).getTime(); 
			var endday=$(".Dayend3").val();
			endday=(new Date(endday)).getTime(); 

			if(startday<endday){
				t=86400+endhour*3600+endminute*60+endsecond-starthour*3600-startminute*60-startsecond;
			}else{

			    t=endhour*3600+endminute*60+endsecond-starthour*3600-startminute*60-startsecond;
			}
			var hour=starthour;
			var minute=startminute;
			var second=startsecond;
				
			var date=new Array();
			
			for(var i=0;i<t+1;i++){
				
				if(second/10<1){
					second="0"+second
				}
				if(minute/10<1){
					minute="0"+minute;
				}
				if(hour/10<1){
					hour="0"+hour
				}
				var time=hour+":"+minute+":"+second;
				console.log(time)
				date[i]={
					startday:$(".Daystart3").val(),
					endday:$(".Dayend3").val(),
					t:time,
					CoalName:$(".Day3Coal").text(),
					p:Math.ceil(Math.random()*500),
					generator:"#3",
				}
				second++;
				minute++;
				minute--;
				hour++;
				hour--;
				if(second==60){
					second=0;
					minute++;
					if(minute==60){
						minute=0;
						hour++;
					}
					if(hour==24){
						hour=0;
					}
				}

			}

			var date=JSON.stringify(date)

			publicDom.getData("post",dayqueryurl,date, function(data){
					$(".Day3jinquekwh").text(data.TotalG)
					$(".Day3IPCCkwh").text(data.TotalG)
					$(".Day3jinquet").text(data.TotalB)
					$(".Day3IPCCt").text(data.TotalB)
					$(".Day3start").text($(".DaystartTime3").val())
					$(".Day3end").text($(".DayendTime3").val())
					$(".Day3jinqueco2").text(data.Eco2)
					$(".Day3IPCCco2").text((data.TotalB*2.53).toFixed(3))
					newDay3FileName=data.NewFileName

					layer.closeAll();

					var outurl=rooturl+"/CalculateSystem/downloadFileServlet?NewFileName="+newDay3FileName
					$(".Day3Out").unbind().on('click',function(){			
						var mywin=window.open(outurl,"_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400")
					})

			})
		}
	})
	//机组4
	$(".DayQuery4").on('click',function(){
		if($(".DaystartTime4").val()==''||$(".DayendTime4").val()==''){
			alert("请填写日期")
		}else{
			//日期处理
			var index = layer.load(0, {shade: false});
			//获取 功率
			// var timeparam=JSON.stringify(
			// 		start:$(".Daystart4").val()+$(".DaystartTime4").val(),
			// 		end:$(".Dayend4").val()+$(".DayendTime4").val(),
			//		generator:"#4"
			// 	)
			// publicDom.getData("POST",powerurl,timeparam,function(){

			// })
			var starttime=$(".DaystartTime4").val()
			var endtime=$(".DayendTime4").val()
			var starttime=starttime.split(":");
			var endtime=endtime.split(":");
			var starthour=parseInt(starttime[0]);
			var startminute=parseInt(starttime[1]);
			var startsecond=parseInt(starttime[2]);
			var endhour=parseInt(endtime[0]);
			var endminute=parseInt(endtime[1]);
			var endsecond=parseInt(endtime[2]);
			var t;
			var startday=$(".Daystart4").val();
			startday=(new Date(startday)).getTime(); 
			var endday=$(".Dayend4").val();
			endday=(new Date(endday)).getTime(); 

			if(startday<endday){
				t=86400+endhour*3600+endminute*60+endsecond-starthour*3600-startminute*60-startsecond;
			}else{

			    t=endhour*3600+endminute*60+endsecond-starthour*3600-startminute*60-startsecond;
			}
			var hour=starthour;
			var minute=startminute;
			var second=startsecond;
				
			var date=new Array();
			
			for(var i=0;i<t+1;i++){
				
				if(second/10<1){
					second="0"+second
				}
				if(minute/10<1){
					minute="0"+minute;
				}
				if(hour/10<1){
					hour="0"+hour
				}
				var time=hour+":"+minute+":"+second;
				console.log(time)
				date[i]={
					startday:$(".Daystart4").val(),
					endday:$(".Dayend4").val(),
					t:time,
					CoalName:$(".Day4Coal").text(),
					p:Math.ceil(Math.random()*500),
					generator:"#4",
				}
				second++;
				minute++;
				minute--;
				hour++;
				hour--;
				if(second==60){
					second=0;
					minute++;
					if(minute==60){
						minute=0;
						hour++;
					}
					if(hour==24){
						hour=0;
					}
				}

			}

			var date=JSON.stringify(date)

			publicDom.getData("post",dayqueryurl,date, function(data){
					$(".Day4jinquekwh").text(data.TotalG)
					$(".Day4IPCCkwh").text(data.TotalG)
					$(".Day4jinquet").text(data.TotalB)
					$(".Day4IPCCt").text(data.TotalB)
					$(".Day4start").text($(".DaystartTime4").val())
					$(".Day4end").text($(".DayendTime4").val())
					$(".Day4jinqueco2").text(data.Eco2)
					$(".Day4IPCCco2").text((data.TotalB*2.53).toFixed(3))
					newDay4FileName=data.NewFileName

					layer.closeAll();

					var outurl=rooturl+"/CalculateSystem/downloadFileServlet?NewFileName="+newDay4FileName
					$(".Day4Out").unbind().on('click',function(){			
						var mywin=window.open(outurl,"_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400")
					})

			})
		}
	})
}
// ------------------------------------------------月操作------------------------------------------------------
function monthoperation(){
	// 机组1

	//导入文件
	$("#UploadMonth1").on("click",function(){
		$('#file1').val('')
	 	$("#file1").click();
	 });
	$("#file1").unbind().change(function(){

	    var formData = new FormData($("#myform1")[0]);  
		console.log(formData)
		$.ajax({  
		      url:uploadurl,  
		      type: 'POST',  
		      data: formData,
		      async: false,  
		      cache: false,  
		      contentType: false,  
		      processData: false,  
		      success: function (data) {  
		      	var data=JSON.parse(data)
		      	if(data.FileName!=''){
		        	alert("导入成功")
		        	Month1FileName=data.FileName;
		        	console.log(Month1FileName)

		        }
		        else{
	        		alert("导入失败")
	  	        	}
	          },  
		      error: function (data) { 
		   			alert("error")
		      }  
		});  
	})




	//查询
	$(".Month1Query").on('click',function(){
		if($(".Month1Start").val()==""||$(".Month1End").val()==""||Month1FileName==undefined){
			alert("参数不完整或未导入excel")
		}else{
			var index = layer.load(0, {shade: false});
			publicDom.getData(
				"post",
				queryurl,
				JSON.stringify({generator:"#1",
				StartDate:$(".Month1Start").val(),
				EndDate:$(".Month1End").val(),
				type:"month",
				FileName:Month1FileName,
				CoalName:$(".Month1Coal").text()}),
				function(data){
					$(".Month1jinquekwh").text(data.TotalG)
					$(".Month1IPCCkwh").text(data.TotalG)
					$(".Month1jinquet").text(data.TotalB)
					$(".Month1IPCCt").text(data.TotalB)
					$(".Month1start").text($(".Month1Start").val())
					$(".Month1end").text($(".Month1End").val())
					$(".Month1jinqueco2").text(data.Eco2)
					$(".Month1ipccco2").text((data.TotalB*2.53).toFixed(3))
					newMonth1FileName=data.NewFileName
					console.log(newMonth1FileName)
					layer.closeAll();
					//导出文件
					var outurl=rooturl+"/CalculateSystem/downloadFileServlet?NewFileName="+newMonth1FileName
					$(".Month1Out").unbind().on('click',function(){
						var mywin=window.open(outurl,"_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400")

					})

				}
			)
		}
	})


	// 机组2

	//导入
	$("#UploadMonth2").on("click",function(){
		$('#file2').val('')
	 	$("#file2").click();
	 });
	$("#file2").change(function(){
	    var formData = new FormData($("#myform2")[0]);  
		console.log(formData)
		$.ajax({  
		      url:uploadurl,  
		      type: 'POST',  
		      data: formData,
		      async: false,  
		      cache: false,  
		      contentType: false,  
		      processData: false,  
		      success: function (data) {  
		      	var data=JSON.parse(data)
		      	if(data.FileName!=''){
		        	alert("导入成功")
		        	Month2FileName=data.FileName;
		        	console.log(Month2FileName)
		        }
		        else{
	        		alert("导入失败")
	  	        	}
	          },  
		      error: function (data) { 
		   			alert("error")
		      }  
		});  
	})
	//查询
	$(".Month2Query").on('click',function(){
		if($(".Month2Start").val()==""||$(".Month2End").val()==""||Month2FileName==undefined){
			alert("参数不完整或未导入excel")
		}else{
			var index = layer.load(0, {shade: false});
			publicDom.getData(
				"post",
				queryurl,
				JSON.stringify({generator:"#2",
				StartDate:$(".Month2Start").val(),
				EndDate:$(".Month2End").val(),
				type:"month",
				FileName:Month2FileName,
				CoalName:$(".Month2Coal").text()}),
				function(data){
					$(".Month2jinquekwh").text(data.TotalG)
					$(".Month2IPCCkwh").text(data.TotalG)
					$(".Month2jinquet").text(data.TotalB)
					$(".Month2IPCCt").text(data.TotalB)
					$(".Month2start").text($(".Month2Start").val())
					$(".Month2end").text($(".Month2End").val())
					$(".Month2jinqueco2").text(data.Eco2)
					$(".Month2ipccco2").text((data.TotalB*2.53).toFixed(3))
					newMonth2FileName=data.NewFileName
					console.log(newMonth2FileName)
					layer.closeAll();
					//导出文件
					var outurl=rooturl+"/CalculateSystem/downloadFileServlet?NewFileName="+newMonth2FileName
					$(".Month2Out").unbind().on('click',function(){
						var mywin=window.open(outurl,"_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400")

					})
			})

		}
	})
	// 机组3

	//导入
	$("#UploadMonth3").on("click",function(){
		$('#file3').val('')
	 	$("#file3").click();
	 });
	$("#file3").change(function(){
	    var formData = new FormData($("#myform3")[0]);  
		console.log(formData)
		$.ajax({  
		      url:uploadurl,  
		      type: 'POST',  
		      data: formData,
		      async: false,  
		      cache: false,  
		      contentType: false,  
		      processData: false,  
		      success: function (data) {  
		      	var data=JSON.parse(data)
		      	if(data.FileName!=''){
		        	alert("导入成功")
		        	Month3FileName=data.FileName;
		        	console.log(Month3FileName)
		        }
		        else{
	        		alert("导入失败")
	  	        	}
	          },  
		      error: function (data) { 
		   			alert("error")
		      }  
		});  
	})
	//查询
	$(".Month3Query").on('click',function(){
		if($(".Month3Start").val()==""||$(".Month3End").val()==""||Month3FileName==undefined){
			alert("参数不完整或未导入excel")
		}else{
			var index = layer.load(0, {shade: false});
			publicDom.getData(
				"post",
				queryurl,
				JSON.stringify({generator:"#3",
				StartDate:$(".Month3Start").val(),
				EndDate:$(".Month3End").val(),
				type:"month",
				FileName:Month3FileName,
				CoalName:$(".Month3Coal").text()}),
				function(data){
					$(".Month3jinquekwh").text(data.TotalG)
					$(".Month3IPCCkwh").text(data.TotalG)
					$(".Month3jinquet").text(data.TotalB)
					$(".Month3IPCCt").text(data.TotalB)
					$(".Month3start").text($(".Month3Start").val())
					$(".Month3end").text($(".Month3End").val())
					$(".Month3jinqueco2").text(data.Eco2)
					$(".Month3ipccco2").text((data.TotalB*2.53).toFixed(3))
					newMonth3FileName=data.NewFileName
					console.log(newMonth3FileName)
					layer.closeAll();
					//导出文件
					var outurl=rooturl+"/CalculateSystem/downloadFileServlet?NewFileName="+newMonth3FileName
					$(".Month3Out").unbind().on('click',function(){
						var mywin=window.open(outurl,"_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400")

					})
			})

		}
	})
	// 机组4
	
	//导入
	$("#UploadMonth4").on("click",function(){
		$('#file4').val('')
	 	$("#file4").click();
	 });
	$("#file4").change(function(){
	    var formData = new FormData($("#myform4")[0]);  
		console.log(formData)
		$.ajax({  
		      url:uploadurl,  
		      type: 'POST',  
		      data: formData,
		      async: false,  
		      cache: false,  
		      contentType: false,  
		      processData: false,  
		      success: function (data) {  
		      	var data=JSON.parse(data)
		      	if(data.FileName!=''){
		        	alert("导入成功")
		        	Month4FileName=data.FileName;
		        	console.log(Month4FileName)
		        }
		        else{
	        		alert("导入失败")
	  	        	}
	          },  
		      error: function (data) { 
		   			alert("error")
		      }  
		});  
	})
	//查询
		$(".Month4Query").on('click',function(){
		if($(".Month4Start").val()==""||$(".Month4End").val()==""||Month4FileName==undefined){
			alert("参数不完整或未导入excel")
		}else{
			var index = layer.load(0, {shade: false});
			publicDom.getData(
				"post",
				queryurl,
				JSON.stringify({generator:"#4",
				StartDate:$(".Month4Start").val(),
				EndDate:$(".Month4End").val(),
				type:"month",
				FileName:Month4FileName,
				CoalName:$(".Month4Coal").text()}),
				function(data){
					$(".Month4jinquekwh").text(data.TotalG)
					$(".Month4IPCCkwh").text(data.TotalG)
					$(".Month4jinquet").text(data.TotalB)
					$(".Month4IPCCt").text(data.TotalB)
					$(".Month4start").text($(".Month4Start").val())
					$(".Month4end").text($(".Month4End").val())
					$(".Month4jinqueco2").text(data.Eco2)
					$(".Month4ipccco2").text((data.TotalB*2.53).toFixed(3))
					newMonth4FileName=data.NewFileName
					console.log(newMonth4FileName)
					layer.closeAll();
					//导出文件
					var outurl=rooturl+"/CalculateSystem/downloadFileServlet?NewFileName="+newMonth4FileName
					$(".Month4Out").unbind().on('click',function(){
						var mywin=window.open(outurl,"_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400")

					})
			})

		}
	})
}	
// ------------------------------------------------年操作------------------------------------------------------
function yearoperation(){
	// 机组1

	//导入
	$("#UploadYear1").on("click",function(){
		$('#file11').val('')
	 	$("#file11").click();
	 });
	$("#file11").change(function(){
	    var formData = new FormData($("#myform11")[0]);  
		console.log(formData)
		$.ajax({  
		      url:uploadurl,  
		      type: 'POST',  
		      data: formData,
		      async: false,  
		      cache: false,  
		      contentType: false,  
		      processData: false,  
		      success: function (data) {  
		      	var data=JSON.parse(data)
		      	if(data.FileName!=''){
		        	alert("导入成功")
		        	Year1FileName=data.FileName;
		        	console.log(Year1FileName)
		        }
		        else{
	        		alert("导入失败")
	  	        	}
	          },  
		      error: function (data) { 
		   			alert("error")
		      }  
		});  
	})

	//查询
	$(".Year1Query").on('click',function(){
		if($(".Year1Start").val()==""||$(".Year1End").val()==""||Year1FileName==undefined){
			alert("参数不完整或未导入excel")
		}else{
			var index = layer.load(0, {shade: false});
			publicDom.getData(
				"post",
				queryurl,
				JSON.stringify({generator:"#1",
				StartDate:$(".Year1Start").val(),
				EndDate:$(".Year1End").val(),
				type:"year",
				FileName:Year1FileName,
				CoalName:$(".Year1Coal").text()}),
				function(data){
					$(".Year1jinquekwh").text(data.TotalG)
					$(".Year1IPCCkwh").text(data.TotalG)
					$(".Year1jinquet").text(data.TotalB)
					$(".Year1IPCCt").text(data.TotalB)
					$(".Year1start").text($(".Year1Start").val())
					$(".Year1end").text($(".Year1End").val())
					$(".Year1jinqueco2").text(data.Eco2)
					$(".Year1ipccco2").text((data.TotalB*2.53).toFixed(3))
					newYear1FileName=data.NewFileName
					console.log("newYear1FileName="+newYear1FileName)
					layer.closeAll();
					//导出文件
					var outurl=rooturl+"/CalculateSystem/downloadFileServlet?NewFileName="+newYear1FileName
					console.log("outurl="+outurl)
					$(".Year1Out").unbind().on('click',function(){
						var mywin=window.open(outurl,"_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400")

					})
			})
		}
	})
	// 机组2
	
	//导入
	$("#UploadYear2").on("click",function(){
		$('#file22').val('')
	 	$("#file22").click();
	 });
	$("#file22").change(function(){
	    var formData = new FormData($("#myform22")[0]);  
		console.log(formData)
		$.ajax({  
		      url:uploadurl,  
		      type: 'POST',  
		      data: formData,
		      async: false,  
		      cache: false,  
		      contentType: false,  
		      processData: false,  
		      success: function (data) {  
		      	var data=JSON.parse(data)
		      	if(data.FileName!=''){
		        	alert("导入成功")
		        	Year2FileName=data.FileName;
		        	console.log(Year2FileName)
		        }
		        else{
	        		alert("导入失败")
	  	        	}
	          },  
		      error: function (data) { 
		   			alert("error")
		      }  
		});  
	})

	//查询//查询
	$(".Year2Query").on('click',function(){
		if($(".Year2Start").val()==""||$(".Year2End").val()==""||Year2FileName==undefined){
			alert("参数不完整或未导入excel")
		}else{
			var index = layer.load(0, {shade: false});
			publicDom.getData(
				"post",
				queryurl,
				JSON.stringify({generator:"#2",
				StartDate:$(".Year2Start").val(),
				EndDate:$(".Year2End").val(),
				type:"year",
				FileName:Year2FileName,
				CoalName:$(".Year2Coal").text()}),
				function(data){
					$(".Year2jinquekwh").text(data.TotalG)
					$(".Year2IPCCkwh").text(data.TotalG)
					$(".Year2jinquet").text(data.TotalB)
					$(".Year2IPCCt").text(data.TotalB)
					$(".Year2start").text($(".Year2Start").val())
					$(".Year2end").text($(".Year2End").val())
					$(".Year2jinqueco2").text(data.Eco2)
					$(".Year2ipccco2").text((data.TotalB*2.53).toFixed(3))
					newYear2FileName=data.NewFileName
					console.log(newYear2FileName)
					layer.closeAll();
					//导出文件
					var outurl=rooturl+"/CalculateSystem/downloadFileServlet?NewFileName="+newYear2FileName
					$(".Year2Out").unbind().on('click',function(){
						var mywin=window.open(outurl,"_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400")

					})
			})
		}
	})
	// 机组3
	//导入
	$("#UploadYear3").on("click",function(){
		$('#file33').val('')
	 	$("#file33").click();
	 });
	$("#file33").change(function(){
	    var formData = new FormData($("#myform33")[0]);  
		console.log(formData)
		$.ajax({  
		      url:uploadurl,  
		      type: 'POST',  
		      data: formData,
		      async: false,  
		      cache: false,  
		      contentType: false,  
		      processData: false,  
		      success: function (data) {  
		      	var data=JSON.parse(data)
		      	if(data.FileName!=''){
		        	alert("导入成功")
		        	Year3FileName=data.FileName;
		        	console.log(Year3FileName)
		        }
		        else{
	        		alert("导入失败")
	  	        	}
	          },  
		      error: function (data) { 
		   			alert("error")
		      }  
		});  
	})

	//查询
	$(".Year3Query").on('click',function(){
		if($(".Year3Start").val()==""||$(".Year3End").val()==""||Year3FileName==undefined){
			alert("参数不完整或未导入excel")
		}else{
			var index = layer.load(0, {shade: false});
			publicDom.getData(
				"post",
				queryurl,
				JSON.stringify({generator:"#3",
				StartDate:$(".Year3Start").val(),
				EndDate:$(".Year3End").val(),
				type:"year",
				FileName:Year3FileName,
				CoalName:$(".Year3Coal").text()}),
				function(data){
					$(".Year3jinquekwh").text(data.TotalG)
					$(".Year3IPCCkwh").text(data.TotalG)
					$(".Year3jinquet").text(data.TotalB)
					$(".Year3IPCCt").text(data.TotalB)
					$(".Year3start").text($(".Year3Start").val())
					$(".Year3end").text($(".Year3End").val())
					$(".Year3jinqueco2").text(data.Eco2)
					$(".Year3ipccco2").text((data.TotalB*2.53).toFixed(3))
					newYear3FileName=data.NewFileName
					console.log(newYear3FileName)
					layer.closeAll();
					//导出文件
					var outurl=rooturl+"/CalculateSystem/downloadFileServlet?NewFileName="+newYear3FileName
					$(".Year3Out").unbind().on('click',function(){
						var mywin=window.open(outurl,"_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400")

					})
			})
		}
	})
	// 机组4
	//导入
	$("#UploadYear4").on("click",function(){
		$('#file44').val('')
	 	$("#file44").click();
	 });
	$("#file44").change(function(){
	    var formData = new FormData($("#myform44")[0]);  
		console.log(formData)
		$.ajax({  
		      url:uploadurl,  
		      type: 'POST',  
		      data: formData,
		      async: false,  
		      cache: false,  
		      contentType: false,  
		      processData: false,  
		      success: function (data) {  
		      	var data=JSON.parse(data)
		      	if(data.FileName!=''){
		        	alert("导入成功")
		        	Year4FileName=data.FileName;
		        	console.log(Year4FileName)
		        }
		        else{
	        		alert("导入失败")
	  	        	}
	          },  
		      error: function (data) { 
		   			alert("error")
		      }  
		});  
	})

	//查询
	$(".Year4Query").on('click',function(){
		if($(".Year4Start").val()==""||$(".Year4End").val()==""||Year4FileName==undefined){
			alert("参数不完整或未导入excel")
		}else{
			var index = layer.load(0, {shade: false});
			publicDom.getData(
				"post",
				queryurl,
				JSON.stringify({generator:"#4",
				StartDate:$(".Year4Start").val(),
				EndDate:$(".Year4End").val(),
				type:"year",
				FileName:Year4FileName,
				CoalName:$(".Year4Coal").text()}),
				function(data){
					$(".Year4jinquekwh").text(data.TotalG)
					$(".Year4IPCCkwh").text(data.TotalG)
					$(".Year4jinquet").text(data.TotalB)
					$(".Year4IPCCt").text(data.TotalB)
					$(".Year4start").text($(".Year4Start").val())
					$(".Year4end").text($(".Year4End").val())
					$(".Year4jinqueco2").text(data.Eco2)
					$(".Year4ipccco2").text((data.TotalB*2.53).toFixed(3))
					newYear4FileName=data.NewFileName
					console.log(newYear4FileName)
					layer.closeAll();
					//导出文件
					var outurl=rooturl+"/CalculateSystem/downloadFileServlet?NewFileName="+newYear4FileName
					$(".Year4Out").unbind().on('click',function(){
						var mywin=window.open(outurl,"_blank","toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=400, height=400")

					})
			})
		}
	})
}