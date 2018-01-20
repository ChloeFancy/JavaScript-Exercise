(function(){
	var selectBox = document.getElementById("oneSelect");
	var text = selectBox.options[0].text;
	var value = selectBox.options[0].value;
	/*在访问文本和值时，尽量不使用DOM方法，因为他们作为节点时，交互的实际方式在不同浏览器中不一样*/

	var selectedIndex = selectBox.selectedIndex;
	//唯一选中的那一个或者是多选的第一个
	var selectedOption = selectBox.options[selectedIndex];
	var btn1 = document.getElementById('first');
	var btn2 = document.getElementById('last');
	btn1.addEventListener('click',function(event){
		selectBox.selectedIndex = 0;
	},true);
	btn2.addEventListener('click',function(event){
		selectBox.options[selectBox.options.length-1].selected=true;
	},false);


	var form2 = document.forms[1];
	var selectBox2 = document.getElementById('multipleSelect');
	var btn3 = document.getElementById('firstChosen');
	var btn4 = document.getElementById('lastChosen');
	btn3.addEventListener('click',function(event){
		selectBox2.selectedIndex = 0;
		//使用了selectedIndex就像只能选择一个选项一样
	},false);
	btn4.addEventListener('click',function(event){
		selectBox2.options[selectBox.options.length-1].selected=true;
	},false);
	//通过设置selecedIndex或者某一个option的selected属性
	var btn5 = document.getElementById('selectedOps');
	btn5.addEventListener('click',function(){
		getSelectedOptions(selectBox2);
	},false);

	function getSelectedOptions(selectBox){
		var options = selectBox.options;
		var selected = [];
		for(var i=0,len=selectBox.length;i<len;i++){
			if(options[i].selected){
				selected.push(options[i].value);
			}
		}
		alert(selected.join("||"));
	}

	var option1 = document.createElement('option');
	option1.value='Shanghai';
	option1.text = 'MoDu';

	var option2 = new Option('tianfu','Chengdu');
	//除IE均可，第一个参数——文本，第二个参数——value

	selectBox2.add(option1,selectBox2.options[0]);
	//插入成为新的第一个选项

	selectBox2.add(option2,undefined);
	//插入到最后一个，兼容性MAX!!!
	var option3 = document.createElement('option');
	option3.text = 'option3Text';
	//option3.value = 'value';
	//可以不用先指定选项的值

	selectBox2.insertBefore(option3,selectBox2.options[1]);
	//使用DOM方法创建option，并且用insertBefore插入到任意位置，兼容性MAX!!!

	var btn6 = document.getElementById('remove');
	btn6.addEventListener('click',function(event){
		for(var i=0,len=selectBox2.options.length;i<len;i++){
			selectBox2.remove(0);
		}
	},false);

	//如果要将选项重新放置到新的位置，
	//则使用DOM方法最好!!!
	var btn7 = document.getElementById('transfer');
	transfer.addEventListener('click',function(event){
		selectBox.appendChild(option3);
	},false);
	//跨selectbox移动选项
	var btn8 = document.getElementById('resort');
	btn8.addEventListener('click',function(event){
		selectBox2.insertBefore(selectBox2.options[0],selectBox2.options[0+2]);
	},false);



})();
