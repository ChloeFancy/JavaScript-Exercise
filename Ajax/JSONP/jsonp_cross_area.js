
function handleResponse(res){
	// alert('111');
	alert('一个简单的JSONP跨域——得到ip地址'+res.ip);
}
var ul = document.getElementsByTagName('ul').item(0);
function myCallback(response){
	let string = '',
		items = response.s;
	for(let i=0,len=items.length;i<len;i++){
		string += "<li><a href='https://www.baidu.com/s?wd="+items[i]+"' target='_blank'>"+items[i]+"</a></li>";
	}
	ul.innerHTML=string;
	ul.style.display='block';
}
(function(){
	var script = document.createElement('script');
	script.setAttribute('type','text/javascript');
	script.src = "http://freegeoip.net/json/?callback=handleResponse";
	document.body.appendChild(script);
})();

(function(){
	function loadScript(url){
		var script = document.createElement('script');
		script.src=url;
		script.type='text/javascript';
		document.body.appendChild(script);
	}
	var search = document.getElementById('search');
	search.onkeyup = function(){
		if(this.value){
			let v = this.value;
			var url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+v+"&&cb=myCallback";
			loadScript(url);
		}else{
			ul.style.display='none';
		}
	};
})();