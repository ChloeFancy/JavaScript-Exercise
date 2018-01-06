if(document.body.isSupported('HTML','2.0')){
	//
}

var div1 = document.createElement('div');
div1.setAttribute('class','box');

var div2 = document.createElement('div');
div2.setAttribute('class','box');

alert(div1.isSameNode(div1));//true
alert(div1.isEqualNode(div2));//true
alert(div1.isSameNode(div2));//false
//same--同一个对象
//equal--特性、属性相同
//

//样式
var supportsDom2CSS = document.implementation.hasFeature('CSS','2.0');
var supportDOM2CSS2 = document.implementation.hasFeature('CSS2','2.0');

//以下，元素节点的style特性的属性和方法
//标准模式下，所有度量值都必须有单位
//混杂模式下，浏览器会设置自动的单位

//cssText--访问style特性中的代码
//写入的属性都存在于元素的特性HTML代码中
//getPropertyCSSValue--返回包含值的CSSValue代码
//setProperty(name,value,priorty)
//length--返回共有多少CSS属性
var prop,value,i,len;
for(i=0,len=myDiv.style.length;i<len;i++){
	prop = myDiv.style[i];
	value = myDiv.style.getPropertyValue(prop);
	//得到的是一个属性值得字符串
	//与getPropertyCSSValue不同
	//value = myDiv.style.getPropertyCSSValue(prop).cssText;
	//cssText属性的值与getPropertyValue返回值相同
	alert(prop+": "+value);
}
myDiv.style.removeProperty(prop||'border');
//以上方法得到了IE9+、FSO9+C的支持


//以下，元素计算后的样式

var computedStyle = document.defaultView.getComputedStyle(myDiv,null);
//第二个参数是伪元素的信息，':after'

alert(computedStyle.border);//不会再所有浏览器中都有返回值，因为是综合属性
//不同浏览器返回的颜色的表示方式不同，FS使用RGB
//
//IE中不支持computedStyle()方法，因此使用currentStyle属性

//操作样式表(CSSStyleSheet)
var sheet=null;
for(var i=0,len=document.styleSheets.length;i<len;i++){
	sheet = document.styleSheets[i];
	alert(sheet.href);
}
//可以输出无论是link还是style元素中的样式表
function getStyleSheet(ele){
	return ele.sheet||ele.styleSheet;
}
var link = document.getElementsByTagName('link')[0];
var sheet = link.sheet||link.styleSheet;
//获得样式表对象
//与styleSheets中获得的相同
//获得CSS规则
var rules = sheet.rules||sheet.cssRules;
var rule = rules[0];//一个选择器对应一条rule
rule.selectorText;//返回选择器名称
rule.style.cssText;//返回CSS代码
rule.style.color;//返回style特性中的属性


//DOM
//最后一个参数是插入位置
sheet.insertRule("body{background-color:white;}",0);
//IE
sheet.addRule('body','body{background-color:white',0);

function insertRule(sheet,selectorText,cssText,pos){
	if(sheet.insertRule){
		sheet.insertRule(selectorText+cssText,pos);
	}else if(sheet.addRule){
		sheet.addRule(selectorText,cssText,pos);
	}
}
//DOM
sheet.deleteRule(0);//删除在第0位的规则
//IE
sheet.removeRule(0);

function deleteRule(sheet,pos){
	if(sheet.deleteRule){
		sheet.deleteRule(pos);
	}else if(sheet.removeRule){
		sheet.removeRule(pos);
	}
}


//元素大小
//1.client
//包括元素内容区、内边距，元素内部空间的大小
function getViewPort(){
	if(document.compatMode=='BackCompat'){
		//检查是否在混杂模式
		return {
			width:document.body.clientWidth,
			height:document.body.clientHeight
		};
	}else {
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		};
	}
}


//2.offset
//包括边框 内边距 滚动条
//获得元素距离文档元素左边的距离
function getElementLeft(element){
	var actualLeft = element.offseLeft;
	var current = element.offsetParent;

	while(current!=null){
		actualLeft+=current.offsetLeft;
		current = curren.offsetParent;
	}
	return actualLeft;
}
function getElementTop(element){
	var actualTop = element.offsetTop;
	var current = element.offsetParent;
	while(current!=null){
		actualTop+=current.offsetTop;
		current=curren.offsetParent;
	}
}
//offsetParent是元素的有具体宽高的父级元素
//避免重复访问偏移量属性，每次访问它们需要重新计算

//3.scroll
//scrollWidth,没有滚动条的情况下，元素的总高度（元素的实际大小）
//scrollLeft,被隐藏在内容区域左侧的像素,不是只读的
//区分scrollHeight（Width）、clientHeight（Width）
//O、S、Chrome：前者视口大小、后者文档内容大小
//IE（标准模式）：与C相反
//Firefox，二者相等
//求文档的总高度
var docHeight = Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight);
var docWidth = Math.max(document.documentElement.clientWidth,document.documentElement.scrollWidth);
//将文档滚回顶部
function scrollToTop(element){
	if(element.scrollTop!=0){
		element.scrollTop=0;
	}
}

//确定元素的大小
//getBoundingClientRect
//给出元素在页面中相对于ViewPort的位置
function getBoundingClientRect(element){
	var scrollTop = document.documentElement.scrollTop;
	var scrollLeft = document.documentElement.scrollLeft;
	if(element.getBoundingClientRect){
		if(typeof arguments.callee.offset!='number'){
			var temp = document.createElement('div');
			temp.style.cssText = 'position:absolute;left:0;top:0';
			document.body.appendChild(temp);
			alert(temp.getBoundingClientRect().top);
			//在窗口已经被滚动时，Chrome弹出的数值为一个负数
			arguments.callee.offset = -temp.getBoundingClientRect().top-scrollTop;
			//所以，用负的temp的top减去文档元素的scrollTop（隐藏在当前内容去上方的像素数），就可以得到正确的offset（0或-2）
			temp=null;
		}
		var rect = element.getBoundingClientRect();
		var offset = arguments.callee.offset;
		return {
			left:rect.left+offset;
			right:rect.right+offset;
			top:rect.top+offset;
			bottom:rect.bottom+offset;
		};
		//offset--在IE中-2,F/O中为-0
	}
	else {
		var actualLeft = getElementLeft(element);
		var actualTop = getElementTop(element);
		return {
			left:actualLeft-scrollLeft,
			//该元素对于文档左上角的距离，减去文档的隐藏在当前内容去外的像素数，得到相对于视口的左上角的距离
			right:actualLeft+element.offsetWidth-scrollLeft,
			top:actualTop-scrollTop,
			bottom:actualTop+element.offsetHeight-scrollTop
		};
	}
}
//使用了aruguments.callee，因此不能再严格模式下

//范围
var supprotsRange = document.implementation.hasFeature('Range','2.0');
var alsoSupportsRange = (typeof document.createRange=='function');
var range = document.createRange();

var p1 = document.getElementsByTagName('div')[0];
range.selectNode(p1);//以p1为范围
var range1 = document.createRange();
range1.selectNodeContents(p1);//以p1的内容为范围
console.log(range.startContainer===range.endContainer);
range.commonAncestorContainer;//body
range.startOffset;

var range3 = document.createRange();
//设置比前两种局限于某个节点更具体的范围。
range3.setStartBefore(p1.nextSibling);
range3.setEndAfter(document.getElementsByTagName('div')[0]);

var range4 = document.createRange();
range4.setStart(p1.parentNode,p1Index);
range4.setEnd(p1,parentNode,p1Index+1);
//模拟了selectNode
//start/endContainer都已经设置成为了p1.parentNode
//start/ednOffset也已经设置好
var range5 = document.createRange();
range5.setStart(p1,0);
range5.setend(p1,p1.childNodes.length);
//模拟selectNodeContents

// <p id='testp'>hello <b>world</b></p>
var testp = document.getElementById('testp');
var hello = testp.firstChild;
var world = hello.nextSibling;
var range6 = document.createRange();
range6.setStart(hello,2);
renge6.setEnd(world,3);

var frag = range6.extractContents();
p1.parentNode.appendChild(frag);
var frag2 = range.cloneContents();
frag2.parentNode.appendChild(frag2);
//heldllo wor--运行结果
