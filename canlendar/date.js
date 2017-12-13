function prepareDate(){
	var selectSheets = document.getElementsByTagName('select');

	for(var i=1980;i<=2030;i++){
		var ele = document.createElement('option');
		ele.setAttribute('value',i);
		ele.innerHTML = i;
		year.appendChild(ele);//select下拉菜单的ID属性值可以直接拿来用
	}

	for(var i=1;i<=12;i++){
		var ele = document.createElement('option');
		ele.setAttribute('value',i);
		ele.innerHTML = i;
		month.appendChild(ele);//select下拉菜单的ID属性值可以直接拿来用
	}
	month.options[1].selected="selected";
	for(var i=1;i<=31;i++){
		var ele = document.createElement('option');
		ele.setAttribute('value',i);
		ele.innerHTML = i;
		day.appendChild(ele);//select下拉菜单的ID属性值可以直接拿来用
	}
}
addLoadEvent(prepareDate);

function changeDay(){
	var monthSelect = document.getElementById('month');

	calcDays.call(window);
}
//addLoadEvent(changeDay);
Days = [31,29,31,30,31,30,31,31,30,31,30,31];
function calcDays(){

	var days = Days[month.selectedIndex];
	var curdays = day.options.length;

	if(curdays>days){//31->29
		console.log(curdays);
		for(var i=curdays;i>days;i--){
			day.remove(i-1);
		}
	}

	if(curdays<days){//29->31
		for(var i=curdays;i<days;i++){
			var op = document.createElement('option');
			op.value = i+1;
			op.innerHTML = i+1;
			day.appendChild(op);
		}
	}
}
