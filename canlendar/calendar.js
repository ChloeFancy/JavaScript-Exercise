function addLoadEvent(func){
	var old = window.onload;
	if(typeof old!='function'){
		window.onload = func;
	}else{
		window.onload = function(){
			old();
			func();
		}
	}
}


function prepareCalendar() {
	var inputs = document.getElementsByTagName('input');
	var now = new Date();
	inputs[0].defaultValue = now.getFullYear();
	inputs[1].defaultValue = now.getUTCMonth()+1;
}
addLoadEvent(prepareCalendar);

Days = [31,29,31,30,31,30,31,31,30,31,30,31];
function setDays(){
	var inputs = document.getElementsByTagName('input');
	y = inputs[0].value;
	m = inputs[1].value;

	var str = y + '-' + m + '-1' ;
	var first = new Date(str);
	var whatDay = first.getUTCDay()+1;
	var mL = (whatDay%7)*300*0.14;
	var firstDay = document.getElementById('firstDay');
	firstDay.style.marginLeft = mL + 'px';

	var days = document.getElementById('days');
	var daydivs = days.getElementsByTagName('div');
	if(y%4==0&&y%100!=0 || y%400==0){
		Days[1] = 29;
	}else Days[1]=28;
	for(var i = 28 ;i<31;i++){
		if(i>Days[m-1]-1){
			daydivs[i].style.display = "none";
		}
		if(i<=Days[m-1]-1){
			daydivs[i].style.display = "block";
		}
	}
}
addLoadEvent(setDays);

function onChange(){
	var inputs = document.getElementsByTagName('input');
	inputs[0].onblur = function(){
		setDays.call(this);
	}

	inputs[1].onblur = function(){
		setDays.call(this);
	}
}
addLoadEvent(onChange);

function upDown(){
	var changes = document.getElementsByTagName('a');
	var inputs = document.getElementsByTagName('input');
	changes[0].onclick=function(){
		var old = parseInt(inputs[1].value);
		old = (((--old)+12)%12!=0) ? (old+12)%12 : 12 ;
		if(old==12){
			inputs[0].value--;
		}
		inputs[1].value = old;
		setDays.call(this);
	}
	changes[1].onclick=function(){
		var old = parseInt(inputs[1].value);
		old = (((++old)+12)%12!=0) ? (old+12)%12 : 12 ;
		if(old==12){
			inputs[0].value++;
		}
		inputs[1].value = old;
		setDays.call(this);
	}
}
addLoadEvent(upDown);