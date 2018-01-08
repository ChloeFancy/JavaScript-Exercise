//1.nodeName
//元素节点——标签名
//属性借点——属性名
//文本、注释、文档、文档片段——#加英文
//2.nodeType
//Node.ELEMENT_NODE-1
//Node.ATTRIBUTE_NODE-2
//Node.TEXT_NODE-3
//3.nodeValue
//只有text、comment、CDATA节点有返回结果
//其余返回null
document.getElementById('div').textContent
//返回当前节点所有后代节点的文本内容
//可读可写
document.getElementById('foo').textContent = "<p>123</p>"
//不会当做标签处理
//会对标签转义

document.baseURI
window.location
//以上两个得出的值都是当前网站的网址
//<base>标签设置的值会成为baseURI属性的返回值
//<base>标签——设置所有链接的默认URL和默认目标
//
//属性————
//ownerDocument
//nextSibling
//previouSibling
//parentNode
//parentElement *
//childNodes 包括所有子节点，NodeList是一个动态集合
//firstNode、lastChild--如果没有则返回null
//
//
//方法————
//appendChild
//hasChildNodes
function DOMComb(parent,callback){
	if(parent.hasChildNodes()){
		for(var node = parent.firstChild;node;
			node=node.nextSibling){
			DOMComb(node,callback);
		}
	}
	callback.call(parent);
}
//遍历parent的所有后代子节点及其本身
function printContent(){
	if(this.nodeValue){
		console.log(this.nodeValue);
	}
}
DOMComb(document.body,printContent);
//cloneNode
//一个bool值作为参数
//表示是否克隆子节点
//会丧失事件处理程序
//insertBefore
parent.insertBefore(s1,s2.nextSibling);
//可实现insertAfter(s1,s2)
//remoceChild——会返回被替换的节点
//replaceChild——会返回被替换的节点
//子节点只是不在DOM树中了
//依然存在于内存之中


//contains(someNode)
//与hasChildNodes()不同，不要记错了

//compareDocumentPosition(someNode)
//0-位置相同
//1——不在同一个文档
//2-参数节点在前，4-参数节点在后
//返回一个7位的2进制数值

div.compareDocumentPosition(input);
//由于div包含input,且有先后顺序
//所以包含010000|000100（后）=010100（20）
input.compareDocumentPosition(div)；
//001000|00010=001010（10）

var head = document.head;
var body = document.body;
if(head.compareDocumentPosition(body)&4){
	console.log('文档结构正确');//参数节点在后，返回值是4
}else{
	console.log('body在head前面');
}

Node.prototype.before = function(arg){
	return !!(this.compareDocumentPosition(arg)&2);
}
//arg在node前面

//isEqualNode
//节点类型、属性、子节点相同（属性节点不是子节点）
//node.normalise
//textNode.splitText()


//NodeList/HTMLCollection对象
//两者都是构造函数
document.childNodes instanceof NodeList
//和数组不同
myArray-->myArray.prototype-->Object.prototype->null
myNodList-->NodeList.prototype-->Object.prototype
//但是由于NodeList实例对象有length属性
//因此可以转化为数组
myarray=Array.prototype.slice.call(myNodeList,0);
//但是就变成了静态集合
var forEach = Array.prototype.forEach;
forEach.call(element.childNodes,function(item){
	item.parentNode.style.clor='#0f0';
})
//for循环遍历也可以
//不要用for in
var p=document.getElementById('p');
var result=[];
for(var i in p.childNodes){
	result.push(i);
}
//result
//(7) ["0", "length", "item",
//"entries", "forEach", "keys", "values"]
//不保证各个成员的遍历

//for of 方法 *ES 6*
var p=document.getElementById('par');
var result=[];
for(var i of p.childNodes){
	console.log(i.innerHTML);
}

var list = document.querySelectorAll('input[type=checkbox]');
for(var p of list){
	p.checked=true;
}

//item方法
//nl.item(2)
//不合法或找不到则返回null
//也可以用方括号
nl[2];

//HTMLCollection
//成员全是Element
//可以用数字、id来引用节点元素
nl.item(2);
nl.namedItem('c2');

var ele = document.forms.namedItem('form1');
var ele = document.forms['form1'];
//node.children
//document.links
//.forms .images

//Parent
//ELEMENT_NODE
//DOCUMENT_NODE
//DOCUMENTfRAGMENT_NODE
ele.children;
ele.firstElementChild;
ele.lastElementChild;
ele.childElementCount;

//Child
//ELEMENT_NODE DOCUMENTTYPE_NODE
ele.remove();//移除节点本身
ele.before(another);//在前面插入
ele.after(another);
ele.replaceWith(another);