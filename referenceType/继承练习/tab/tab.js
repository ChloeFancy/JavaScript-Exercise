function Tab(obj){

	this.oList = obj.getElementsByTagName('ul')[0];

	this.aIn = this.oList.getElementsByTagName('li');
	this.oConList = obj.getElementsByTagName('nav')[0];
	this.aCon = this.oConList.getElementsByTagName('a');

	this.count = this.aIn.length;
	this.cur = 0;
	var _this = this;
	for(var i=0;i<this.count;i++){
		this.aCon[i].index = i;
		this.aCon[i].onclick = function(){
			_this.cur = this.index;
			_this.switch();
		}
	}
}

Tab.prototype.switch = function(){
	for(var i=0;i<this.count;i++){
		this.aIn[i].className = 'in';
		this.aCon[i].className = 'con';
	}
	this.aIn[this.cur].className = 'in_active';
	this.aCon[this.cur].className = 'con_active';
};
window.onload = function(){
	var oBox = document.getElementById('box');
	var tab1 = new Tab(oBox);
};
//window.onload 在DOM树加载完后开始发生
//或者直接把script放到<body>中


