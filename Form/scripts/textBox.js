var form = document.forms[0];
var textBox = form.elements['textBox'];
textBox.value = '默认初始值';
//避免使用DOM中setAttibute方法

textBox.select();
//选中文本框中的所有文本
textBox.addEventListener('focus',function(event){
	var target = event.target||event.srcElement;
	target.select();
	//便于删除文本框中的值
},false);
//对应的select方法和鼠标操作会触发select事件

//获得选中的文本
function getSelectedText(textBox){
	if(typeof textBox.selectionStart=='number'){
		return textBox.value.substring(textBox.selectionStart,textBox.selectionEnd);
		//HTML5为文本框提供的两个属性
	}else if(document.selection){
		return document.selection.createRange().text;
		//document.selection对象保存着在整个文档范围内饿选择的文本信息
	}
}
textBox.addEventListener('select',function(event){
	alert(getSelectedText(event.target));
	//在select事件处理程序中，可以确保document.selection一定是target文本框中的value（的子集
},false);

//select()选择了全部文本
//选择部分文本——setSelectionRange(start,end)
textBox.setSelectionRange(0,textBox.value.length);
//等效于textBox.select()
//在IE8-中
//使用IE范围来选中
textBox.value="hello world";
var range = textBox.createTextRange();
//createTextRange()方法返回的范围仅限于再调用的对象中使用
range.collapse(true);
//首先必须把范围折叠到起点，下面两个方法的偏移量才有意义（以第一个字符为起点）
range.moveStart('character',0);
range.moveEnd('character',textBox.value.length);
//moveStart、moveEnd接受两个参数，单位（character、word、sentence）和移动数量
range.select();//这是范围的select方法

function selectText(textBox,start,end){
	if(textBox.setSelectionRange){
		textBox.setSelectionRange(start,end);
	}else if(textBox.createTextRange){
		var range = textBox.createTextRange();
		range.collapse(true);
		range.moveStart(start);
		range.moveEnd(end);
		range.select();
	}
	textBox.focus();
	//选择范围之后立即将焦点设置到当前文本框
}

//响应向文本框内插入字符操作的是keyPress事件
//event.preventDefault();可以屏蔽输入的这个字符
textBox.addEventListener('keypress',function(event){
		var target = event.target||event.srcElement;
		var character = event.charCode;
		if(!/[^\d]/.test(String.fromCharCode(character))&&charCode>9&&!event.ctrlKey){
			event.preventDefault();
		}
	},false);
//只能按下非数字键才有效
//且屏蔽了功能键,默许了ctrl键，就允许了正常的复制粘贴功能

//剪贴板事件
//(before)copy/cut/paste
//window.clipboardData||event.clipboardData
//保证兼容性：只在发生以上六个事件时才使用这个对象

function getClipboardText(event){
	var clipboardData = event.clipboardData||window.clipboardData;
	return clipboardData.getData('text');
	//参数：要取得数据的格式（text/URL）
}

function setClipboardData(event,value){
	if(event.clipboardData){
		return event.clipboardData.setData('text/plain',value);
	}else if(window.clipboardData){
		return window.clipboardData.setData('text',value);
	}
	//返回值是boolean
}

//反缩进：shift+tab
var textBox = document.forms[0].elements['textbox1'];
textBox.addEventListener('keypress',function(event){
	var target = event.target||event.srcElement;
	var character = event.charCode;
	if(!/[^\d]/.test(String.fromCharCode(character))&&character>9&&!event.ctrlKey){
		event.preventDefault();
	}
},false);
//只在"可编辑区域"内输入"实际字符(可以自动排除退格键等)"时才会触发
//DOM3方法
textBox.addEventListener('textInput',function(event){
	var target = event.target||event.srcElement;
	var character = event.charCode;
	if(!/[^\d]/.test(String.fromCharCode(character))&&character>9&&!event.ctrlKey){
		event.preventDefault();
	}
},false);


textBox.addEventListener('copy',function(event){
	/*var text = getClipboardText(event);
	alert('text'+text);
	不能通过getData获取到clipboardData的值
	会返回一个空字符串
	*/
	setClipboardData(event,'123');
	event.preventDefault();
	//必须阻止默认行为，否则就复制选取内容到剪贴板
	//取消了默认行为，才能把clipboardData的值复制到剪贴板
},false);

textBox.addEventListener('paste',function(event){
	var text = getClipboardText(event);
	//Firefox Safari Chrome只允许在onpaste事件中访问getData()
	if(!/^\d*$/.test(text)){
		alert('不能粘贴非数字！');
		event.preventDefault();
	}

	//在paste事件中，不能使用setData方法
	//setClipboardData(event,'123');
},false);


//焦点自动转移
var infoForm = document.forms['info'];
//相应事件应该是keyup事件，而不应该是focus
//focus是焦点聚集，会导致每一次点击到已经填好的字段时，自动跳到下一个字段，导致不能修改已经填好的
infoForm.elements[0].addEventListener('keyup',
	function(event){
			var target = event.target||event.srcElement;
			//访问maxlength特性的值，通过maxLength属性
			if(target.value.length==target.maxLength){
				if(target.nextElementSibling)
					//label在focus后会将光标转移到对应的输入字段
					//如果要判断节点的元素类型
					//访问了nodeName属性后要加toLowerCase();
					//alert(target.nextElementSibling.nodeName.toLowerCase());
					target.nextElementSibling.focus();
			}
		},false);


if (document.forms[0].elements[0].checkValidity()) {
	//检测标签中H5新特性中的有效性
}
if(document.forms[0].checkValidity()){
	//检查整个表单中所有字段的有效性
}
