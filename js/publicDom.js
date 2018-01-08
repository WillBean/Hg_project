var publicDom = {

	//配置项
	config:{
		rootUrl: "http://115.29.137.247:8080",
		url: "http://115.29.137.247:8080/wxCrowd", // 请求接口的url
	},

	getData: function(type, url, param, f, isAsync, err) {
		
		var ajaxParam  = {
			type: type,
			url: url,
			data: param,		
			async: isAsync !== false,
			contentType: false,  
		    processData: false,  
			success: function(data) {				
				var jsonData;
				try{
					jsonData = $.parseJSON(data);
				}catch(e) { // 返回值不是json格式
					if(typeof f !== 'function') { // 如果没有回调函数,抛出异常。
						throw new Error('请求数据之后，没有回调函数!');
					}
					f(data);
					return;
				}
				if(jsonData.code === 302){
					window.location.href = jsonData.msg||"/html/login_store.html";
					
				} else if(jsonData.code===-1){
					//超时或者存在
					window.localStorage.removeItem(publicDom.config.userType);
					window.localStorage.removeItem(publicDom.config.storageName);
					window.location.href = jsonData.msg||"/html/login_store.html";
				}
				else {

					if(typeof f !== 'function') { // 如果没有回调函数,抛出异常。

						throw new Error('请求数据之后，没有回调函数!');
					}
					f(jsonData);
				}
			},
			error: function(xhr,textStatus) {
				
			}
		};
		$.ajax(ajaxParam);
	},
	

	//退出登录
};