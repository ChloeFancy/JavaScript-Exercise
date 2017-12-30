//将NodeList转换为数组
//方法1：与arguments相同
var nodeArr = Array.prototype.slice.call(someNode.childNodes,0);
//IE8- nvalid
//
//方法2：
function convertToArray(nodelist){
	var array = null;
	try{
		array = Array.prototype.slice.call(nodelist,0);
	}catch(ex){
		array = new Array();
		for(var i=0;i<nodelist.length;i++){
			array.push(nodelist[i]);
		}
	}
	return array;
}

if(someNode.nextSibling===null){
	console.log(someNode.parentNode.lastChild===someNode);
}else if(someNode.previousSibling===null){
	console.log(someNode.parentNode.firstChild===someNode);
}

var returnedNode = someNode.appendChild(newNode);
alert(returnedNode==someNode.lastChild);

//任何节点不能同时出现在DOM文档树饿多个位置
//DOM树可以看作是一系列指针连起来的
var returnedNode = someNode.appendChild(someNode.firstChild);
alert(returnedNode==someNode.lastChild);//true
alert(returnedNode==someNode.firstChild);//false


returnedNode = someNode.insertBefore(newNode,null);
alert(returnedNode==someNode.lastChild);//true

returnedNode = someNode.insertBefore(newNode,someNode.firstChild);
alert(returnedNode==someNode.firstChild);

var returnedNode = someNode.replaceChild(newNode,someNode.firstChild);
//指针指向了新节点
//操作子节点都与parentNode的方法挂钩

var myList = document.getElementById('myList');
var deep = myList.cloneNode(true);//7
alert(deep.childNodes.length);
var shallow = myList.cloneNode(false);//0
alert(shallow.childNodes.length);
//深复制会复制节点的整个文档树

var html = document.documentElement;
alert(html===document.firstChild);//false
//文档元素不一定是第一个子节点，还可能是文档类型元素
alert(document.doctype==document.firstChild);//true
alert(html.getElementsByTagName('body')[0]===document.body);//true
alert(document.firstChild.nodeName);//html(这是因为第一个子节点是文档类型节点，文档类型节点的name属性是文档类型)

console.log(document.title);
console.log(document.URL);

var liArr = document.getElementsByTagName('li');
console.log(liArr.length);//3
console.log(liArr[0].childNodes[0].nodeValue);//1
console.log(liArr['first'].nodeValue);
//方括号法可以访问name属性

var first = document.getElementsByName('first');
console.log(first.length);//1

document.forms;
document.links;

document.write('<strong>2017</strong>')
document.write("<script type=\"text/javascript\" src=\"file.js\">"+"<\/script>");
//外部链接脚本，必须加转义\
//VM317:1 GET file:///C:/Program%20Files%20(x86)/Sublime%20Text3/JavaScript-Exercise/DOM/file.js net::ERR_FILE_NOT_FOUND
//说明已经解析为HTML代码

//Element类型
var div = document.getElementById('myList');
console.log(div.tagName.toLowerCase());
console.log(div.nodeName);

if(div.tagName.toLowerCase()=='div'){
	//防止标签名的大小写不同
}
div.id = 'ML';
div.className = 'list';//区分属性className

console.log(div.getAttribute('class'));//特性class

div.diy = 'true';
console.log(div.getAttribute('diy'));//null
//通过属性添加的，不会变成特性

console.log(div.getAttribute('onclick'));//返回代码
div.onclick();//返回函数

div.setAttribute('style','color:red');//字体变红了，点也变红了
console.log(div.getAttribute('style'));
//color:red
div.removeAttribute('style');
//变回了黑色


function ouputAttribute(ele){
	var pairs = new Array(),
		attrName,
		attrValue,
		i,
		len;
	for(var i=0,len = ele.attributes.length;i<len;i++){
		attrName = ele.attributes[i].nodeName;
		attrValue = ele.attributes[i].nodeValue;
		if(ele.attributes[i].specified){
			pairs.push(attrName+"=\""+attrValue+"\"");
		}
	}
	return pairs.join(" ");
}
ouputAttribute(div);

var div = document.createElement("div");
div.id = "myNewDiv";
div.className = 'box';
document.body.insertBefore(div,document.body.firstChild);

var div = document.createElement("<div id = \"myNewDIv\" class = \"box\" ></div>");
//有助于IE7-避免动态创建元素的某些问题

if(client.browser.ie && client.browser.ie<=7){
	var iframe = document.createElement("<iframe name = \"maFrame\"></iframe>");
	var input = document.createElement("<input type=\"checkbox\">");

}

for(var i=0;len=ele.childNodes;i<len;i++){
	if(ele.childNodes[i].type==1){

	}
}

var ele = document.getElementsByTagName('div')[0];
var txt = ele.firstChild;
console.log(txt.nodeValue);//1234567
console.log(txt.data);//1234567
console.log(txt);//"1234567"
ele.firstChild.nodeValue = "some <strong>11111</strong> some";

var txtNode = document.createTextNode("some <strong>11111</strong> some");
ele.appendChild(txtNode);
console.log(ele.childNodes.length); //2
ele.normalize();
console.log(1===ele.childNodes.length);//1
//IE6可能会因为normalize崩溃

txt.splitText(2);
console.log(ele.childNodes[0]);
console.log(ele.childNodes[1]);

var docT = document.doctype;
console.log(docT);//<!DOCTYPE html>
console.log(docT.nodeName);//html
console.log(docT.nodeValue);//null
console.log(docT.parentNode);//#document

console.log(docT.name);//html
//IE不支持DocumentType类型，document.doctype==null
//IE9——document.doctype可用，但是DT类型仍然不能使用
//

var fragment = document.createDocumentFragment();
var ul = document.getElementsByTagName('ul')[0];
var ul1 = document.getElementsByTagName('ul')[1];
var li=null;
for(var i=0;i<ul.childNodes.length;i++){
	li = document.createElement("li");
	li.appendChild(document.createTextNode('abc'));
	fragment.appendChild(li);
}
ul1.appendChild(fragment);
//文档片段中的子节点被删除，移到ul的子节点中
//
//Atte类型

var attr = document.createAttribute('align');
attr.value = 'right';
ul1.setAttributeNode(attr);

console.log(ul1.getAttribute('align'));//rihgt
console.log(ul1.attributes[0]);//align="right"
console.log(ul1.getAttributeNode("align"));//align="right"
console.log(ul1.attributes["align"]===ul1.getAttributeNode("align"));//true
//不建议直接访问节点
//attr节点不是元素的子节点
//通过attributes集合访问或getAttributeNode
