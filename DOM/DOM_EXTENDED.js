//接受一个CSS选择符
var body = document.querySelector("body");
//返回与该模式匹配的第一个元素
var myDiv = document.querySelector("#myDiv");
var img = document.querySelector("img.button");

var img = document.querySelectorAll("img");
//返回所有的img
var strongs = document.querySelectorAll("p strong");
//返回带有属性和方法的NodeList
for(var i=0;i<strongs.length;i++){
	strong = strongs[i]||strongs.item(i);
	strong.className = "important";//添加类名
}
console.log(strong.matchesSelector("p strong"));//true


//遍历
var i,len,child = element.firstElementChild;
while(child!= element.lastElementChild){
	processChild(child);
	child = child.nextElementSibling;
}

var allCurrentUsernames = document.getElementsByClassName("username current");

//删除某个类名
var classNames = div.className.split(/\s+/);
for(var i=0,len=classNames.length;i<len;i++){
	if(classNames[i]=='user'){
		pos = i;
		break;
	}
}
classNames.splice(i,1);//删除位置，删除的个数
div.className = classNames.join(" ");

div.classList.remove("user");
if(div.classList.remove("user")){
	console.log();
}
div.classList.add("user");
div.classList.toggle("user");

var button = document.getElementById('myButton');
button.focus();
alert(document.activeElement===button);
alert(document.hasFocus());

alert(document.readyState=='complete');
//'loading'
//
var head = document.head||document.getElementsByTagName('head')[0];
if(document.compatMode=='CSS1Compat'){

}else if(document.compatMode=='BackCompat'){

}

alert(document.charset);
document.charset = 'UTF-8';
if(document.charset==document.defaultCharset)

var div = document.getElementById('myDiv');
var appId = div.dataset.myName;
div.dataset.myName = "Chloee";
if(div.dataset.myName){//不区分大小写
	console.log(div.dataset.myName);
}

div.innerHTML = '66666666';
document.getElementById('myList').outerHTML = '<p>6666666666666666666</p>';
document.getElementById('myList').outerHTML = '<p>666661236</p>';
//VM56:1 Uncaught TypeError: Cannot set property 'outerHTML' of null
//替换掉了myList，因此找不到符合的元素，报错
//替换掉了元素节点
//相当于replaceChild
var list = document.getElementById('myList');
list.parentNode.replaceChild(document.createElement('p').appendChild(document.createTextNode('6666666')),list);


document.getElementById('myList').insertAdjacentHTML('beforebegin','beforebegin');//同辈元素
document.getElementById('myList').insertAdjacentHTML('afterbegin','afterbegin');//作为第一个子元素
document.getElementById('myList').insertAdjacentHTML('afterend','afterend');//同辈元素
document.getElementById('myList').insertAdjacentHTML('beforeend','beforeend');//作为最后一个子元素

var values=['item1','item2','item3','item4'];
var itemsHTML = "";
for(var i=0,len=values.length;i<len;i++){
	itemsHTML+="<li>"+values[i]+"</li>";
}
document.getElementById('myList').innerHTML=itemsHTML;
//尽量少操作innerHTML、outerHTML
//销毁和创建HTML解析器的代价很大

document.fors[0].scrollIntoView();

alert(document.getElementById('myList').children.length);
//HTMLCollection的实例，只包含元素子节点
//IE8-返回的包含注释节点

alert(document.documentElement.contains(document.getElementById('myList')));

var div = document.getElementById('myDiv');
div.outerText = 'lyx';
//文本借点替代了元素节点
div.innerText = 'Chloee';
//文本节点替代了文本节点

function getInnerText(element){
	return (typeof element.textContent=='string')?element.textContent:element.innerText;
}
function setInnerText(element,text){
	if(typeof element.textContent=='string'){
		element.textContent=text;
	}else{
		element.innerText = text;
	}
}