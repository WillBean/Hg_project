var j=2;
var rooturl="http://120.27.127.220:8080";//服务器接口根目录
var saveurl=rooturl+"/CalculateSystem/saveParameterServlet";//保存参数接口
var geturl=rooturl+"/CalculateSystem/returnParameterServlet";//获取参数接口
var calculateurl=rooturl+"/CalculateSystem/forecastCarServlet"//计算接口
var a1,b1,c1,ca1,a2,b2,c2,ca2,a3,b3,c3,ca3,a4,b4,c4,ca4,up1,low1,up2,low2,up3,low3,up4,low4,beq;
$(function(){
	rendertime();
	getdata();
	renderevent();
	// importexcel();
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
function getdata(){
	publicDom.getData("post",geturl,JSON.stringify({}),function(data){
		var coal=new Array();
		for(var i=0;i<data.length;i++){
			if(data[i].type=="generator"&&data[i].title=="#1"){
				a1=data[i].a;
				b1=data[i].b;
				c1=data[i].c;
				ca1=data[i].Ca;
				up1=data[i].up;
				low1=data[i].low;
			}
			if(data[i].type=="generator"&&data[i].title=="#2"){
				a2=data[i].a;
				b2=data[i].b;
				c2=data[i].c;
				ca2=data[i].Ca;
				up2=data[i].up;
				low2=data[i].low;
			}
			if(data[i].type=="generator"&&data[i].title=="#3"){
				a3=data[i].a;
				b3=data[i].b;
				c3=data[i].c;
				ca3=data[i].Ca;
				up3=data[i].up;
				low3=data[i].low;
			}
			if(data[i].type=="generator"&&data[i].title=="#4"){
				a4=data[i].a;
				b4=data[i].b;
				c4=data[i].c;
				ca4=data[i].Ca;
				up4=data[i].up;
				low4=data[i].low;
			}
			if(data[i].type=="Coal"){
				coal.push(data[i]);
			}
			if(data[i].type=="beq"){
				beq=data[i].beq
			}
		}
		console.log(coal)
		for(var i=1;i<coal.length;i++){
			
			$("tbody").append('<tr>'+
			    					'<td>'+j+'</td>'+
			    					'<td>'+'<input type="text" class="form-control">'+'</td>'+
			    					'<td>'+'<input type="text" class="form-control">'+'</td>'+
			    					'<td>'+'<input type="text" class="form-control">'+'</td>'+
			    					'<td>'+'<input type="text" class="form-control">'+'</td>'+
			    					'<td>'+'<input type="text" class="form-control">'+'</td>'+
			    					'<td>'+'<input type="text" class="form-control">'+'</td>'+
			    					'<td>'+'<input type="text" class="form-control" readonly="readonly">'+'</td>'+
			    					'<td>'+'<input type="text" class="form-control" readonly="readonly">'+'</td>'+
			    					'<td>'+'<input type="text" class="form-control" readonly="readonly">'+'</td>'
			    				+'</tr>')
			j++;
		}
		var a=0;
		for(var i=1;i<$("tbody tr").length;i++){		        			
		        			if(coal[0].A.Aname!=""){
		        			$("tbody tr:eq(0)").find("td:eq(4)").find("button").text(getCharFromUtf8(coal[0].A.Aname));
		        			$("tbody tr:eq(0)").find("td:eq(5)").find("button").text(getCharFromUtf8(coal[0].V.Vname));
		        			$("tbody tr:eq(0)").find("td:eq(6)").find("button:eq(0)").text(getCharFromUtf8(coal[0].Q.Qname));
		        			$("tbody tr:eq(0)").find("td:eq(6)").find("button:eq(1)").text(getCharFromUtf8(coal[0].Q.position));
		        			}     			
		        			$("tbody tr:eq("+i+")").find("td:eq(1)").find("input[type='text']").val(getCharFromUtf8(coal[a].Coal_name));
		        			$("tbody tr:eq("+i+")").find("td:eq(2)").find("input[type='text']").val(coal[a].Mar);
		        			$("tbody tr:eq("+i+")").find("td:eq(3)").find("input[type='text']").val(coal[a].Mad);
		        			$("tbody tr:eq("+i+")").find("td:eq(4)").find("input[type='text']").val(coal[a].A.val);
		        			$("tbody tr:eq("+i+")").find("td:eq(5)").find("input[type='text']").val(coal[a].V.val);
		        			$("tbody tr:eq("+i+")").find("td:eq(6)").find("input[type='text']").val(coal[a].Q.val);
		        			$("tbody tr:eq("+i+")").find("td:eq(7)").find("input[type='text']").val(coal[a].Car);
		        			$("tbody tr:eq("+i+")").find("td:eq(8)").find("input[type='text']").val(coal[a].Aar);
		        			$("tbody tr:eq("+i+")").find("td:eq(9)").find("input[type='text']").val(coal[a].Qarnet);
		        			a++;
		        		}
		$("#1_a").val(a1);
		$("#1_b").val(b1);
		$("#1_c").val(c1);
		$("#1_ca").val(ca1);
		$("#1_up").val(up1);
		$("#1_low").val(low1)
		$("#2_a").val(a2);
		$("#2_b").val(b2);
		$("#2_c").val(c2);
		$("#2_ca").val(ca2);
		$("#2_up").val(up2);
		$("#2_low").val(low2)
		$("#3_a").val(a3);
		$("#3_b").val(b3);
		$("#3_c").val(c3);
		$("#3_ca").val(ca3);
		$("#3_up").val(up3);
		$("#3_low").val(low3)
		$("#4_a").val(a4);
		$("#4_b").val(b4);
		$("#4_c").val(c4);
		$("#4_ca").val(ca4);
		$("#4_up").val(up4);
		$("#4_low").val(low4);
		$("#beq_value").val(beq)
		

	})
}
function renderevent(){
	
	$(".btn-group ul li").on("click",function(){
		$(this).parent("ul").siblings("button").text($(this).text());
	});
	$("#add").on("click",function(){
		$("tbody").append(			'<tr><td>'+j+'</td>'+
			    					'<td>'+'<input type="text" class="form-control">'+'</td>'+
			    					'<td>'+'<input type="text" class="form-control">'+'</td>'+
			    					'<td>'+'<input type="text" class="form-control">'+'</td>'+
			    					'<td>'+'<input type="text" class="form-control">'+'</td>'+
			    					'<td>'+'<input type="text" class="form-control">'+'</td>'+
			    					'<td>'+'<input type="text" class="form-control">'+'</td>'+
			    					'<td>'+'<input type="text" class="form-control" readonly="readonly">'+
			    					'<td>'+'<input type="text" class="form-control" readonly="readonly">'+'</td>'+
			    					'<td>'+'<input type="text" class="form-control" readonly="readonly">'+'</td>'+'</td></tr>')
		j++;
	});
	$("#delete").on("click",function(){
		$("tbody").find("tr:last").remove();
		j--;
	});
	$("#save_beq").on("click",function(){
		var type="beq";
		var beq=$("#beq_value").val();
		var data={
			type:type,
			beq:beq
		};
		var data=JSON.stringify(data)
		publicDom.getData("post",saveurl,data,function(data){
			if(data.result==1){
					alert("保存成功")
				}
				else{
					alert("保存失败")
				}
		})
	})
	$("#save_1").on("click",function(){
		var type="generator";
		var title="#1";
		var a=$("#1_a").val();
		var b=$("#1_b").val();
		var c=$("#1_c").val();
		var Ca=$("#1_ca").val();
		var up=$("#1_up").val();
		var low=$("#1_low").val();
		var data={
			type:type,
			title:title,
			a:a,
			b:b,
			c:c,
			Ca:Ca,
			up:up,
			low:low
		}
		var message=new Array();
		message.push(data)
		var message=JSON.stringify(message)
		console.log(message);
		
		publicDom.getData("post",saveurl,message,function(data){
				if(data.result==1){
					alert("保存成功")
				}
				else{
					alert("保存失败")
				}
		})
	});
	$("#save_2").on("click",function(){
		var type="generator";
		var title="#2";
		var a=$("#2_a").val();
		var b=$("#2_b").val();
		var c=$("#2_c").val();
		var Ca=$("#2_ca").val();
		var up=$("#2_up").val();
		var low=$("#2_low").val();
		var data={
			type:type,
			title:title,
			a:a,
			b:b,
			c:c,
			Ca:Ca,
			up:up,
			low:low
		}
	
		var message=new Array();
		message.push(data)
		var message=JSON.stringify(message)
		console.log(message);
		
		publicDom.getData("post",saveurl,message,function(data){
				if(data.result==1){
					alert("保存成功")
				}
				else{
					alert("保存失败")
				}
		})
	});
	$("#save_3").on("click",function(){
		var type="generator";
		var title="#3";
		var a=$("#3_a").val();
		var b=$("#3_b").val();
		var c=$("#3_c").val();
		var Ca=$("#3_ca").val();
		var up=$("#3_up").val();
		var low=$("#3_low").val();
		var data={
			type:type,
			title:title,
			a:a,
			b:b,
			c:c,
			Ca:Ca,
			up:up,
			low:low
		}
		var message=new Array();
		message.push(data)
		var message=JSON.stringify(message)
		console.log(message);
		
		publicDom.getData("post",saveurl,message,function(data){
				if(data.result==1){
					alert("保存成功")
				}
				else{
					alert("保存失败")
				}
		})
	});
	$("#save_4").on("click",function(){
		var type="generator";
		var title="#4";
		var a=$("#4_a").val();
		var b=$("#4_b").val();
		var c=$("#4_c").val();
		var Ca=$("#4_ca").val();
		var up=$("#4_up").val();
		var low=$("#4_low").val();
		var data={
			type:type,
			title:title,
			a:a,
			b:b,
			c:c,
			Ca:Ca,
			up:up,
			low:low
		}
		var message=new Array();
		message.push(data)
		var message=JSON.stringify(message)
		console.log(message);
		
		publicDom.getData("post",saveurl,message,function(data){
				if(data.result==1){
					alert("保存成功")
				}
				else{
					alert("保存失败")
				}
		})
	});
	$("#calculate").on("click",function(){
		//加载层
			var index = layer.load(0, {shade: false});
			var data=new Array();
		for(var i=1;i<$("tbody tr").length;i++){
			var Coal_name=$("tbody").children('tr').eq(i).children('td').eq(1).find("input[type='text']").val();
			var Mar=$("tbody").children('tr').eq(i).children('td').eq(2).find("input[type='text']").val();
			var Mad=$("tbody").children('tr').eq(i).children('td').eq(3).find("input[type='text']").val();
			var Car=$("tbody").children('tr').eq(i).children('td').eq(7).find("input[type='text']").val();
			var A=$("tbody").children('tr').eq(i).children('td').eq(4).find("input[type='text']").val();
			var A_name=$("#A_name").text();
			var V=$("tbody").children('tr').eq(i).children('td').eq(5).find("input[type='text']").val();
			var V_name=$("#V_name").text();
			var Q=$("tbody").children('tr').eq(i).children('td').eq(6).find("input[type='text']").val();
			var Q_name=$("#Q_name").text();
			var Q_position=$("#Q_position").text();				
			var message={
				Coal_name:Coal_name,	
				Mar:Mar,
				Mad:Mad,
				Car:Car,
				A:{
					Aname:A_name,
					val:A
				},
				V:{
					Vname:V_name,
					val:V
				},
				Q:{
					Qname:Q_name,
					position:Q_position,
					val:Q
				},			

		}
		data.push(message)
	}
	var data=JSON.stringify(data)
	console.log(data)
	publicDom.getData("post",calculateurl,data,function(data){
		if(data!=""){
			alert("预测成功")
			layer.closeAll();

			for(i=1;i<=data.length;i++){
			$("tbody tr:eq("+i+")").find("td:eq(7)").find("input[type='text']").val(data[i-1].Car)
			$("tbody tr:eq("+i+")").find("td:eq(8)").find("input[type='text']").val(data[i-1].Aar)
			$("tbody tr:eq("+i+")").find("td:eq(9)").find("input[type='text']").val(data[i-1].Qarnet)
		}
		}
		
	})
})
	$("#Save_coal").on("click",function(){
		var data=new Array();
		for(var i=1;i<$("tbody tr").length;i++){
			var type="Coal";
			var Coal_name=$("tbody").children('tr').eq(i).children('td').eq(1).find("input[type='text']").val();
			var Mar=$("tbody").children('tr').eq(i).children('td').eq(2).find("input[type='text']").val();
			var Mad=$("tbody").children('tr').eq(i).children('td').eq(3).find("input[type='text']").val();
			var Car=$("tbody").children('tr').eq(i).children('td').eq(7).find("input[type='text']").val();
			var A=$("tbody").children('tr').eq(i).children('td').eq(4).find("input[type='text']").val();
			var A_name=$("#A_name").text();
			var V=$("tbody").children('tr').eq(i).children('td').eq(5).find("input[type='text']").val();
			var V_name=$("#V_name").text();
			var Q=$("tbody").children('tr').eq(i).children('td').eq(6).find("input[type='text']").val();
			var Q_name=$("#Q_name").text();
			var Q_position=$("#Q_position").text();	
			var Aar=$("tbody").children('tr').eq(i).children('td').eq(8).find("input[type='text']").val();
			var Qarnet=$("tbody").children('tr').eq(i).children('td').eq(9).find("input[type='text']").val();	
			var message={
				type:type,
				Coal_name:Coal_name,
				Mar:Mar,
				Mad:Mad,
				Car:Car,				
				Qarnet:Qarnet,
				Aar:Aar,
				A:{
					Aname:A_name,
					val:A
				},
				V:{
					Vname:V_name,
					val:V
				},
				Q:{
					Qname:Q_name,
					position:Q_position,
					val:Q
				},			

		}
		data.push(message)
	}
	var data=JSON.stringify(data)
	console.log(data)
	publicDom.getData("post",saveurl,data,function(data){
		if(data.result==1){
			alert("保存成功")
		}
		else{
			alert("保存失败")
		}
	})

});
}	