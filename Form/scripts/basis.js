var forms = document.forms;
//HTMLCollection对象，动态集合
var form1 = forms['form1'];
//方括号可以访问name特性对应的表单元素

form1.addEventListener('submit',function(event){
	if(1){//当满足某种条件，阻止submit事件的默认行为，表单不会提交
		event.preventDefault();
	}
},false);

form1.submit();//提交表单不触发submit事件


form1.reset();//重置表单且触发reset事件

//获取表单的字段
var elements = form1.elements;
//方括号法，按name特性来访问
var submitbtn = elements['submit'];
var resetbtn = elements['reset'];
var firstbtn = elements[0];
//elements中的顺序与标记中的顺序相同
var radios = elements['test'];
//返回值是一个NodeList对象，当有多个字段的name特性相同时

//表单字段的属性：
var subForm = submitbtn.form;
//只读，当前所属表单的引用
var btnvalue = radios[0].value;
//value是提交给服务器的值
submitbtn.focus();
submitbtn.disabled = true;
submit.readOnly = true;

//如何防止重复提交表单
form1.addEventListener('submit',function(event){
	var target = event.target||event.srcElement;
	//submit事件的target是表单的引用
	//onclick事件的target是按钮的引用，click事件与submit事件的触发顺序不定，所以尽量在有能触发submit事件的三种字段的情况下监听submit事件。
	target.elements['submit'].disabled = true;
	//默认行为：向服务器提交表单
	//禁用一个按钮不影响默认行为
},false);

//input元素的type值都等于type特性的值
submitbtn.type=='submit';
//button默认submit
//如果type.specified==true，则采用type特性的值
//select:['select-one','select-multiple']

//表单字段的方法
//focus()、blur()
window.onload = function(){
	var btn = document.forms['form2'].elements['reset'];
	//HTML5新属性autofocus
	//F4+ S5+ C O9.6
	if(btn.autofocus!==true)
		btn.focus();
};
//出现错误：input元素的type特性为hidden
//或css中display:none; visibility:hidden;
//PS: 即使不可见的元素也会占据页面上的空间。请使用 "display" 属性来创建不占据页面空间的不可见元素。

//表单字段事件
//blur、change、focus
//blur()、focus()也会触发对应的事件
//change——跟着直觉走~

var textInput = form1.elements['textInput'];
textInput.addEventListener('focus',function(event){
	var target = event.target||event.srcElement;
	if(target.style.backgroundColor!='red'){
		targetstyle.backgroundColor='yellow;'
	}
},false);

textInput.addEventListener('blur',function(){
	var target = event.target||event.srcElement;
	if(/[^\d]/.test(target.value)){
		//输入框的内容为非数字字符
		target.style.backgroundColor='red';
	}else{
		target.style.backgroundColor='';
	}
},false);

textInput.addEventListener('change',function(){
	var target = event.target||event.srcElement;
	if(/[^\d]/.test(target.value)){
		//输入框的内容为非数字字符
		target.style.backgroundColor='red';
	}else{
		target.style.backgroundColor='';
	}
},false);

//对于input而言，change一定是失去焦点了，而blur失去焦点后value不一定有改变
//在不同浏览器中，blur、change事件的依次出发顺序是不定的

