(function(){
	var btn = document.getElementById('html_retrieve');
	var btn_1 = document.getElementById('xml_retrieve');
	// btn_1.style.color='blue';

	btn.onclick = function(){
		var xhr = createHTR();
		if(xhr){
			xhr.onreadystatechange = function(){
				if(xhr.readyState==XMLHttpRequest.DONE){//4
					if(xhr.status>=200&&xhr.status<300||xhr.status==304){
						alert(xhr.responseText+" "+xhr.status);
					}else{
						alert('fail');
					}
				}
			};
			xhr.open('GET','src.html');
			xhr.send(null);
			// xhr.send();也可
		}
	};

	btn_1.onclick = function(){
		var xhr = createHTR();
		if(xhr){
			xhr.onreadystatechange = function(){
				if(xhr.readyState==XMLHttpRequest.DONE){
					if(xhr.status>=200&&xhr.status<300||xhr.status==304){
						var xml = xhr.responseXML;
						var root_0 = xml.getElementsByTagName('root').item(0);
						alert(root_0.firstChild.data+" "+xhr.status);
					}
				}
			};
			xhr.open('GET','xml_file.xml');
			xhr.send();
		}
	};

	var btn_2 = document.getElementById('json_retrieve');
	btn_2.onclick = getJSON;
	var display = document.createElement('div');
	document.body.appendChild(display);
	var progressPercent = document.createElement('div');
	document.body.appendChild(progressPercent);
	var page = 0;
	function getJSON(){
		// var xhr = createHTR();
		var xhr = CORS('GET',"https://learnwebcode.github.io/json-example/animals-"+(++page)+".json");
		if(xhr!=null){
			xhr.onreadystatechange = function(){
				if(xhr.readyState==4){
					if(xhr.status>=200&&xhr.status<=300||xhr.status==304){
						var json = xhr.responseText;
						var objs = JSON.parse(json);
						displayObjs(objs);
					}
				}
			};

			xhr.onprogress = function(){
				console.log("progress: "+xhr.readyState);//progress: 3
				// 可以查进度显示！
				// var event = arguments[0];
				// if(event.lengthComputable){
				// 	progressPercent.innerHTML = "loaded: "+event.loaded+" total: "+ event.total+'';
				// }
			}
			//CORS跨域资源
			// xhr.open('GET',"https://learnwebcode.github.io/json-example/animals-"+(++page)+".json",true);


			xhr.onloadstart = function(){
				console.log("load start: "+xhr.readyState);//load start: 1
			};

			xhr.onload = function(){
				console.log("load: "+xhr.readyState);//load: 4
				//只要收到服务器响应，都会出发load事件
				//应该先检查xhr.status，再访问xhr.responseText
			};
			xhr.onloadend = function(){
				console.log("load end: "+xhr.readyState);//load end: 4
				//loadend事件可由load、abort、error
			};

			xhr.timeout = 10000;
			xhr.ontimeout = function(){
				console.log('timeout!');//访问一个不存在的url则会超时
			}

			xhr.send(null);
			if(page==3){
				btn_2.style.display='none';
			}
		}

	}
	function displayObjs(arr){
		var string = "";
		for(let i=0,len=arr.length;i<len;i++){
			string+="<p>name: "+arr[i].name+",species: "+arr[i].species+"</p>";
		}
		display.insertAdjacentHTML('beforeend',string);
	}

	function CORS(method,url){
		var xhr = createHTR();
		//为了避免诸多限制，在访问本地资源时尽量采用相对URL
		if("withCredentials" in xhr){
			//withCredentials——跨域请求是否提供凭据信息(cookie、HTTP认证及客户端SSL证明等)
// 也可以简单的理解为，当前请求为跨域类型时是否在请求中协带cookie。
// 如果在xhr中有此属性，则说明浏览器支持跨域

			// IE11 CHROME FIREFOX
			//诸多限制：不能使用setRequestHeader();getAllRequestHeader()返回""
			//不能发送和接受cookie
			console.log('XMLHttpRequest');
			xhr.open(method,url,true);
		}else if(typeof XDomainRequest != 'undefined'){
			// 兼容IE8
			//取法访问status
			consol.log('XDomainRequest');
			xhr = new XDomainRequest();
			xhr.open(method,url);//只接受两个参数
		}else{
			xhr=null;
		}
		return xhr;
	}
	function createHTR(){
		if(typeof XMLHttpRequest != 'undefined'){
		// if(window.XMLHttpRequest){
			return new XMLHttpRequest();
		}else if(typeof ActiveXObject != 'undefined'){
			 // IE 6 and older
			return new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	function addURLParam(url,key,value){
		url+=( /\?/.test(url)==0 ? '?':'&' )+encodeURIComponent(key)+'='+encodeURIComponent(value);
		return url;
	}
})();
