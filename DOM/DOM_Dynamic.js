//动态脚本
function loadScript(url){
	var script = document.createElement("script");
	script.type = "text/javascript";
	script.src = url;
	document.body.appendChild(script);
}

var script = document.createElement("script");
script.type = 'text/javascript';
script.appendChild(document.reateTextNode("function(){alert(\"hi\");}"));
document.appendChild(script);
//引号转义加反斜线，尤其是在动态创建功能性文本的时候
//在IE中会导致错误，因为不允许访问script元素的子节点
//但是可以访问属性，因此改为
script.text="function(){alert('hi');}";
script.text="function(){alert(\"hi\");}";

function loadScript(code){
	var script = document.createElement("script");
	script.type = 'text/javascript';
	try{
		script.appendChild(document.createTextNode(code));
	}catch(ex){
		script.text = code;
	}
	document.body.appendChild(script);
}
var code = "function(){alert('hi');}";

//动态样式
var link = document.createElement("link");
link.rel = "stylesheet";
link.type = "text/css";
link.href = "style.css";
var head = document.head;
head.appendChild(link);

//创建嵌入式的css
//
//<style type = "text/css">
//body{
// background:lightblue;
//}
//</style>
var style = document.createElement('style');
style.type="text/css";
style.appendChild(document.createTextNode("body{background:lightblue}"));
docuent.head.appendChild(style);
//IE中报错，style也是一个不能修改其子节点的元素

try{
	style.appendChild(document.createTextNode("body{background:lightblue}"));
}catch(ex){
	style.styleSheet.cssText = body{background:lightblue};
}
//访问元素的styleSheet属性的cssText属性
document.head.appendChild(style);

//操作表格——一些table、td、tr的方法的使用
var table = document.createElement("table");
var tbody = document.createElement("tbody");
table.appendChild(tbody);
var row1 = document.createElement('tr');
table.appendChild(row1);
for(var i=0;i<3;i++){
	var td = document.createElement('td');
	td.appendChild(document.createTextNode('item '+i));
	row1.appendChild(td);
}
document.body.appendChild(table);
table.border = 1;

tbody.insertRow(0);
tbody.rows[0].insertCell(0);
tbody.rows[0].cells[0].appendChild(document.createTextNode("item 1"));

