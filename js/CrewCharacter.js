
var rooturl="http://120.27.127.220:8080";//服务器接口根目录
var getPurl=rooturl+'';//获取功率接口
var geturl=rooturl+"/CalculateSystem/returnParameterServlet";//获取参数设置的接口
var calculateurl=rooturl+"/CalculateSystem/accurateCalculateServlet";//计算的接口
var saveCoalurl=rooturl+"/CalculateSystem/saveGeneratorParameterServlet";//保存参数的接口
var a1,b1,c1,ca1,a2,b2,c2,ca2,a3,b3,c3,ca3,a4,b4,c4,ca4;
var Car1,Aar1,Qar1, Car2,Aar2,Qar2, Car3,Aar3,Qar3, Car4,Aar4,Qar4;
var p1,bs1;
var name1,name2,name3,name4;
var time1,time2,time3,time4;
$(function(){

	renderdata();
	rendertime();
	renderevent();
	renderResultContainer();
	setInterval(
	function(){
	getdata();	
	},
	1000
	)
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
function renderdata(){
	console.log(1)
	publicDom.getData("post",geturl,JSON.stringify({}),function(data){
		var coal=new Array();

		for(var i=0;i<data.length;i++){
			if(data[i].type=="generator"&&data[i].title=="#1"){
				a1=parseFloat(data[i].a);
				b1=parseFloat(data[i].b);
				c1=parseFloat(data[i].c);
				ca1=parseFloat(data[i].Ca);
			}
			if(data[i].type=="generator"&&data[i].title=="#2"){
				a2=parseFloat(data[i].a);
				b2=parseFloat(data[i].b);
				c2=parseFloat(data[i].c);
				ca2=parseFloat(data[i].Ca);
			}
			if(data[i].type=="generator"&&data[i].title=="#3"){
				a3=parseFloat(data[i].a);
				b3=parseFloat(data[i].b);
				c3=parseFloat(data[i].c);
				ca3=parseFloat(data[i].Ca);
			}
			if(data[i].type=="generator"&&data[i].title=="#4"){
				a4=parseFloat(data[i].a);
				b4=parseFloat(data[i].b);
				c4=parseFloat(data[i].c);
				ca4=parseFloat(data[i].Ca);
			}
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
        $("#Coal1_value").text(name1?name1:"煤种");
        $("#Coal2_value").text(name2?name2:"煤种");
        $("#Coal3_value").text(name3?name3:"煤种");
        $("#Coal4_value").text(name4?name4:"煤种");
         for(var i=0;i<coal.length;i++){
                if(name1==getCharFromUtf8(coal[i].Coal_name)){
                    Car1=coal[i].Car;
                    Aar1=coal[i].Aar;
                    Qar1=coal[i].Qarnet;
                }
                 if(name2==getCharFromUtf8(coal[i].Coal_name)){
                    Car2=coal[i].Car;
                    Aar2=coal[i].Aar;
                    Qar2=coal[i].Qarnet;
                }
                 if(name2==getCharFromUtf8(coal[i].Coal_name)){
                    Car3=coal[i].Car;
                    Aar3=coal[i].Aar;
                    Qar3=coal[i].Qarnet;
                }
                 if(name1==getCharFromUtf8(coal[i].Coal_name)){
                    Car4=coal[i].Car;
                    Aar4=coal[i].Aar;
                    Qar4=coal[i].Qarnet;
                }
        }
        $("#Car1_value").val(Car1?Car1:"");
        $("#Aar1_value").val(Aar1?Aar1:"");
        $("#Qar1_value").val(Qar1?Qar1:"");
        $("#Car2_value").val(Car2?Car2:"");
        $("#Aar2_value").val(Aar2?Aar2:"");
        $("#Qar2_value").val(Qar2?Qar2:"");
        $("#Car3_value").val(Car3?Car3:"");
        $("#Aar3_value").val(Aar3?Aar3:"");
        $("#Qar3_value").val(Qar3?Qar3:"");
        $("#Car4_value").val(Car4?Car4:"");
        $("#Aar4_value").val(Aar4?Aar4:"");
        $("#Qar4_value").val(Qar4?Qar4:"");
          for(var i=0;i<coal.length;i++){
             $(".coal_button").siblings("ul").append('<li><a>'+getCharFromUtf8(coal[i].Coal_name)+'</a></li>')
        }
        $(".btn-group ul li").on("click",function(){
        $(this).parent("ul").siblings("button").text($(this).text());
     });

        $(".coal li").on("click",function(){
            var name=$(this).text();
            var Car,Aar,Qarnet;
            for(var i=0;i<coal.length;i++){
                if(name==getCharFromUtf8(coal[i].Coal_name)){
                    Car=coal[i].Car;
                    Aar=coal[i].Aar;
                    Qarnet=coal[i].Qarnet;
                }
            }
            $(this).parent("ul").parent("div").parent("td").parent("tr").children("td:eq(1)").find("input[type='text']").val(Car);
            $(this).parent("ul").parent("div").parent("td").parent("tr").children("td:eq(2)").find("input[type='text']").val(Aar)
            $(this).parent("ul").parent("div").parent("td").parent("tr").children("td:eq(4)").find("input[type='text']").val(Qarnet)
        })
		$("#Ca1_value").val(ca1);
        $("#Ca2_value").val(ca2);
        $("#Ca3_value").val(ca3);
        $("#Ca4_value").val(ca4);
		console.log(coal)
		console.log(b1)
		renderContainer();
		
})

	
}
function getdata(){
    // publicDom.getData('get',getPurl,function(data){
    //     p1=data.p1
    // })//获取实时功率的方法
	p1=Math.ceil(Math.random()*1000);
	bs1=a1*p1*p1+b1*p1+c1;
	p2=Math.ceil(Math.random()*1000);
	bs2=a1*p1*p1+b1*p1+c1;
	p3=Math.ceil(Math.random()*1000);
	bs3=a1*p1*p1+b1*p1+c1;
	p4=Math.ceil(Math.random()*1000);
	bs4=a1*p1*p1+b1*p1+c1;
	$("#p1").val(p1);
	$("#bs1").val(bs1);
	$("#p2").val(p2);
	$("#bs2").val(bs2);
	$("#p3").val(p3);
	$("#bs3").val(bs3);
	$("#p4").val(p4);
	$("#bs4").val(bs4);
}
function renderevent(){
	$(".add").on("click",function(){
        location.href="SetParameters.html"
    })
}
function renderContainer(){
	
	var firstbs=new Array();
	var secondbs=new Array();
	var thirdbs=new Array();
	var fourthbs=new Array();
	for(var i=0;i<11;i++){
		firstbs[i]=a1*(100*i)*(100*i)+(b1*100*i)+c1;
		secondbs[i]=a2*(100*i)*(100*i)+(b2*100*i)+c2;
		thirdbs[i]=a3*(100*i)*(100*i)+(b3*100*i)+c3;
		fourthbs[i]=a4*(100*i)*(100*i)+(b4*100*i)+c4;
	}
	
	$('#container').highcharts({
        title: {
            text: '煤耗—负荷曲线',
            x: -20 //center
        },
        
        xAxis: {
            categories: ['0', '100', '200', '300', '400', '500',
                         '600', '700', '800', '900', '1000']
        },
        yAxis: {
            title: {
                text: 'bs(g/KWh)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'g/KWh'
        },
         credits: {
            enabled: false
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'bs',
            data: firstbs,
        }]
    });//#1
    	$('#container2').highcharts({
        title: {
            text: '煤耗—负荷曲线',
            x: -20 //center
        },
      
        xAxis: {
            categories: ['0', '100', '200', '300', '400', '500',
                         '600', '700', '800', '900', '1000']
        },
        yAxis: {
            title: {
                text: 'bs(g/KWh)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'g/KWh'
        },
         credits: {
            enabled: false
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'bs',
            data: secondbs,
        }]
    });//#2
    	$('#container3').highcharts({
        title: {
            text: '煤耗—负荷曲线',
            x: -20 //center
        },
      
        xAxis: {
            categories: ['0', '100', '200', '300', '400', '500',
                         '600', '700', '800', '900', '1000']
        },
        yAxis: {
            title: {
                text: 'bs(g/KWh)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'g/KWh'
        },
         credits: {
            enabled: false
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'bs',
            data: thirdbs,
        }]
    });//#3
    	$('#container4').highcharts({
        title: {
            text: '煤耗—负荷曲线',
            x: -20 //center
        },
      
        xAxis: {
            categories: ['0', '100', '200', '300', '400', '500',
                         '600', '700', '800', '900', '1000']
        },
        yAxis: {
            title: {
                text: 'bs(g/KWh)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'g/KWh'
        },
         credits: {
            enabled: false
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'bs',
            data: fourthbs,
        }]
    });//#4
}
function renderResultContainer(){
	
	 $(".calculate1").unbind("click").on("click",function(){  
        var data2=new Array();
        var Car=$("#Car1_value").val();
        var Aar=$("#Aar1_value").val();
        var Ca=$("#Ca1_value").val();
        var Qarnet=$("#Qar1_value").val();
         var Coal_name=$("#Coal1_value").text();
         var message2={
            type:"GeneratorCharacteristic",
            generator:"#1",
            Coal_name:Coal_name,
            Car:Car,
            Ca:Ca,
            Aar:Aar,
            Qarnet:Qarnet
        }
         data2.push(message2)
        var data2=JSON.stringify(data2);
           publicDom.getData("post",saveCoalurl,data2,function(data){

        })
  
    clearInterval(time1);     
    time1=setInterval(
     function(){
     var data=new Array();
   
     var mco2=new Array();
       
        var message={
            p:p1,
            bs:bs1,
            Car:Car,
            Ca:Ca,
            Aar:Aar,
            Qarnet:Qarnet
        }
       
        data.push(message);  
        var data=JSON.stringify(data);
        var ipcc=parseFloat((bs1*p1/3600*29703*2.53/Qarnet).toFixed(3));
        publicDom.getData("post",calculateurl,data,function(data){
        mco2[0]=parseFloat(data[0].Mco2);
    $("#mco21_value").val(data[0].Mco2)
    $("#ipcc1_value").val(ipcc)
    
 
     $("#resultcontainer").highcharts({
        chart: {
            type: 'column',
            animation: false
        },

        title: {
            text: 'CO2排放计算结果'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: [
                '精确计算',
                'Ipcc',
               
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'kg/s'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} kg/s</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            },
            series: {
                animation: false
            }
        },
        series: [{
            name: '精确计算',
            data:mco2
        }, {
            name: 'ipcc',
            data: [ipcc]
        }, ]
    });
       
        })
    
    },
    1000
    )
       
    })
     $(".calculate2").on("click",function(){
          var data2=new Array();
        var Car=$("#Car2_value").val();
        var Aar=$("#Aar2_value").val();
        var Ca=$("#Ca2_value").val();
        var Qarnet=$("#Qar2_value").val();
         var Coal_name=$("#Coal2_value").text();
         var message2={
            type:"GeneratorCharacteristic",
            generator:"#2",
            Coal_name:Coal_name,
            Car:Car,
            Ca:Ca,
            Aar:Aar,
            Qarnet:Qarnet
        }

         data2.push(message2)
        var data2=JSON.stringify(data2);
           publicDom.getData("post",saveCoalurl,data2,function(data){

        })
    clearInterval(time2);   
    time2=setInterval(
     function(){
     var data=new Array();
 
     var mco2=new Array();
   
     
        var message={
            p:p2,
            bs:bs2,
            Car:Car,
            Ca:Ca,
            Aar:Aar,
            Qarnet:Qarnet
        }
        
        data.push(message);
    
        var data=JSON.stringify(data);
        
        var ipcc=parseFloat((bs2*p2/3600*29703*2.53/Qarnet).toFixed(3));
        publicDom.getData("post",calculateurl,data,function(data){
           mco2[0]=parseFloat(data[0].Mco2);
            $("#mco22_value").val(data[0].Mco2)
            $("#ipcc2_value").val(ipcc)
        $('#resultcontainer2').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'CO2排放计算结果'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: [
                '精确计算',
                'Ipcc',
               
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'kg/s'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} kg/s</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            },
              series: {
                animation: false
            }
        },
        series: [{
            name: '精确计算',
            data:mco2
        }, {
            name: 'ipcc',
            data: [ipcc]
        }, ]
    });
        })
    
    },
    1000
    )
       
    })
    $(".calculate3").on("click",function(){
          var data2=new Array();
            var Car=$("#Car3_value").val();
        var Aar=$("#Aar3_value").val();
        var Ca=$("#Ca3_value").val();
        var Qarnet=$("#Qar3_value").val();
         var Coal_name=$("#Coal3_value").text();
         var message2={
            type:"GeneratorCharacteristic",
            generator:"#3",
            Coal_name:Coal_name,
            Car:Car,
            Ca:Ca,
            Aar:Aar,
            Qarnet:Qarnet
        }
         data2.push(message2)
        var data2=JSON.stringify(data2);
           publicDom.getData("post",saveCoalurl,data2,function(data){

        })
    clearInterval(time3);   
   time3=setInterval(
     function(){
     var data=new Array();
     var mco2=new Array();    
        var message={
            p:p3,
            bs:bs3,
            Car:Car,
            Ca:Ca,
            Aar:Aar,
            Qarnet:Qarnet
        }
     
        data.push(message);
      
        var data=JSON.stringify(data);
        var data2=JSON.stringify(data2);
       var ipcc=parseFloat((bs3*p3/3600*29703*2.53/Qarnet).toFixed(3));
      
        publicDom.getData("post",calculateurl,data,function(data){
           mco2[0]=parseFloat(data[0].Mco2);
            $("#mco23_value").val(data[0].Mco2)
            $("#ipcc3_value").val(ipcc)
         $('#resultcontainer3').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'CO2排放计算结果'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: [
                '精确计算',
                'Ipcc',
               
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'kg/s'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} kg/s</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            },
              series: {
                animation: false
            }
        },
        series: [{
            name: '精确计算',
            data:mco2
        }, {
            name: 'ipcc',
            data: [ipcc]
        }, ]
    });
        })
    
    },
    1000
    )
       
    })
 $(".calculate4").on("click",function(){
      var data2=new Array();
         var Coal_name=$("#Coal4_value").text();

        var Car=$("#Car4_value").val();
        var Aar=$("#Aar4_value").val();
        var Ca=$("#Ca4_value").val();
        var Qarnet=$("#Qar4_value").val();
         var message2={
            type:"GeneratorCharacteristic",
            generator:"#4",
            Coal_name:Coal_name,
            Car:Car,
            Ca:Ca,
            Aar:Aar,
            Qarnet:Qarnet
        }
         data2.push(message2)
        var data2=JSON.stringify(data2);
           publicDom.getData("post",saveCoalurl,data2,function(data){

        })
    clearInterval(time4);   
    time4=setInterval(
     function(){
     var data=new Array();
     var mco2=new Array();
  
        var message={
            p:p4,
            bs:bs4,
            Car:Car,
            Ca:Ca,
            Aar:Aar,
            Qarnet:Qarnet
        }
          
        data.push(message);
      
        var data=JSON.stringify(data);
        var data2=JSON.stringify(data2);
         var ipcc=parseFloat((bs4*p4/3600*29703*2.53/Qarnet).toFixed(3));
        publicDom.getData("post",calculateurl,data,function(data){
           mco2[0]=parseFloat(data[0].Mco2);
            $("#mco24_value").val(data[0].Mco2)
            $("#ipcc4_value").val(ipcc)
                $('#resultcontainer4').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'CO2排放计算结果'
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: [
                '精确计算',
                'Ipcc',
               
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'kg/s'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} kg/s</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            },
              series: {
                animation: false
            }
        },
        series: [{
            name: '精确计算',
            data:mco2
        }, {
            name: 'ipcc',
            data: [ipcc]
        }, ]
    });
        })
    
    },
    1000
    )
       
    })
 



}
  