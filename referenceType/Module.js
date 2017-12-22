var module1 = {
	_count:0,
	m1:function(){

	},
	m2:function(){

	}
};
module1.m1();
module1._count=5;

function StrtingBuilder(){
	var buffer = [];
	this.add = function(str){
		buffer.push(str);
	};
	this.toString = function(){
		return buffer.join('');
	};
}
//以上方法构造函数和实例对象没有分离
//因为私有变量在构造函数中

function StringBuilder(){
	this._buffer = [];
}
StringBuilder.prototype = {
	constructor:StringBuilder,
	add:function(str){
		this._buffer.push(str);
	},
	toString:function(){
		return this._buffer.join("");
	}
};

var module1 = (function(){
	var _count=0;
	var m1 = function(){

	};
	var m2 = function(){

	};
	return {
		m1:m1,
		m2:m2
	};
})();3
console.log(module1._count);


var module1 =(function(mod){
	mod.m3 = function(){

	};
	return mod;
})(mod);

var module2 = (function(mod){
	mod.m3 = function(){}

	};
	return mod;
)(window.module1||{});//无法获知那个模块先被加载

var module1 = (function($,yahoo){

})(jQuery,Yahoo);





